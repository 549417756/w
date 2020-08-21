import OSS from 'ali-oss'
import { region, accessKeyId, accessKeySecret, publicBucket, publicPath } from '@/config'

export default {
  data() {
    return {
      publicStore: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 公共仓储 文章的图片
      this.publicStore = new OSS({
        region,
        accessKeyId,
        accessKeySecret,
        bucket: publicBucket
      })
    },
    async uploadFile(file, name, message) {
      try {
        const { res } = await this.publicStore.put(publicPath + name, file)
        if (res.status === 200 && res.requestUrls.length !== 0) {
          this.$message({
            message: message || '上传成功',
            type: 'success'
          })
          return res.requestUrls[0]
        }
      } catch (e) {
        this.$message({
          message: e,
          type: 'error'
        })
      }
    }
  }
}
