import OSS from 'ali-oss'
import { region, accessKeyId, accessKeySecret, privateBucket } from '@/config'

export default {
  data() {
    return {
      privateStore: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 私有仓储 资料 文件
      this.privateStore = new OSS({
        region,
        accessKeyId,
        accessKeySecret,
        bucket: privateBucket
      })
    },
    async uploadFile(param, message) {
      this.showProgress = true
      const file = param.file
      // 调用上传方法
      const _this = this
      try {
        // 此方法适合大文件上传
        const { res } = await this.privateStore
          .multipartUpload(file.name, file, {
            partSize: 102400,
            progress: async function(percentage) {
              _this.percentage = Math.ceil(percentage * 100)
            }
          })
        this.showProgress = false
        this.$message({
          message: message,
          type: 'success'
        })
        return res.requestUrls[0]
      } catch (e) {
        this.$message({
          message: e,
          type: 'error'
        })
      }
    }
  }
}
