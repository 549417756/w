<template>
  <div class="bg">
    <!-- 图片上传组件辅助-->

    <quill-editor class="editor"
                  v-model="doc"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)">
    </quill-editor>
    <el-upload class="avatar-uploader"
               :action="serverUrl"
               :headers="header"
               :show-file-list="false"
               :on-success="uploadSuccess"
               :on-error="uploadError"
               :before-upload="beforeUpload">
    </el-upload>
  </div>
</template>

<script>

import options from './default-options'
import { quillEditor, Quill } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";


export default {
  components: {
    quillEditor,
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      doc: '',
      editorOption: {
        placeholder: '开始编辑....',
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: options,
            handlers: {
              image: function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              },

            }
          },

        },

      },
      serverUrl: "/api/upload/news", // 这里写你要上传的图片服务器地址
      imageUrl: '',
      images: null,
      header: {
        token: sessionStorage.token
      } // 有的图片服务器要求请求头需要有token
    };
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
    // onEditorChange (event) {
    //   this.$emit('update:content', this.doc)
    // },
    onEditorBlur () {
      //失去焦点事件
    },
    onEditorFocus () {
      //获得焦点事件
    },
    onEditorChange () {
      //内容改变事件

      this.$emit('update:content', this.doc)
    },
    // 富文本图片上传前
    beforeUpload (file) {
      console.log("1." + file)
      this.quillUpdateImg = true;
    },

    uploadSuccess (res, file) {
      console.log("2." + file)
      this.imageUrl = file.response
      this.images = (this.images == null ? "" : (this.images + "#")) + this.imageUrl
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;

      let length = quill.getSelection().index;
      // 插入图片  res.url为服务器返回的图片地址
      quill.insertEmbed(length, "image", this.imageUrl);
      // 调整光标到最后
      quill.setSelection(length + 1);
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError () {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片上传失败");
    }
  },
  created () {

  }
};
</script>

<style>
.quill-editor {
  padding: 0;
}
.ql-container {
  height: 400px;
}
.bg {
  width: 100%;
  margin: 0 auto;
}

.editor {
  line-height: normal !important;
}
.ql-snow .ql-tooltip[data-mode='link']::before {
  content: '请输入链接地址:';
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
  content: '请输入视频地址:';
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
  content: '等宽字体';
}
</style>
