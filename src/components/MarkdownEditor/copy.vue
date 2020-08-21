<template>
  <div>
    <quill-editor ref="quillEditor"
                  v-model="doc"
                  class="ql-editor"
                  :options="editorOption"
                  @change="onEditorChange($event)"></quill-editor>
    <el-upload v-show="false"
               class="uploader"
               action="http://www.jingbanyun.com/index.php?m=Admin&c=Jbresources&a=upload_file&watermark_status=1"
               accept="image/*"
               :show-file-list="false"
               :http-request="handleUpload" />
  </div>
</template>

<script>
import options from './default-options'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import MixinPublicOss from '@/tablemixin/public-oss'
export default {
  components: { quillEditor },
  mixins: [MixinPublicOss],
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      doc: '',
      url: '',
      editorOption: {
        theme: 'snow',
        placeholder: '开始编辑....',
        modules: {
          toolbar: {
            container: options, // 工具栏
            handlers: {
              'image': function (value) {
                document.querySelector('.uploader input').click()
              }
            }
          }
        }
      }
    }
  },
  watch: {
    content: {
      handler () {
        this.doc = this.content
      },
      immediate: true
    }
  },
  methods: {
    onEditorChange (event) {
      this.$emit('update:content', this.doc)
    },
    async handleUpload (param) {
      const file = param.file
      const name = file.name
      const url = await this.uploadFile(file, name, '内容素材图上传成功')
      console.log(url)
      const quill = this.$refs.quillEditor.quill
      const length = quill.getSelection().index // 获取光标所在位置
      quill.insertEmbed(length, 'image', url) // 插入图片  res.url为服务器返回的图片地址
      console.log(res.url)
      quill.setSelection(length + 1) // 调整光标到最后
    }
  }
}
</script>

<style>
.quill-editor {
  padding: 0;
}
.ql-container {
  height: 400px;
}

</style>
