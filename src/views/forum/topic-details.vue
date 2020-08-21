<template>
  <div class="app-container">
    <div class="bbs-container">
      <div class="bbs-left">
        <div class="bbs-avatar">
          <el-avatar :size="80" :src="details.account.head_img">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
          <p>{{ details.account.name }}</p>
        </div>
        <div class="bbs-info">
          <p>标题：{{ details.title }}</p>
          <p v-if="details.category">分类：{{ details.category.name }}</p>
          <p>日期：{{ details.update_time }}</p>
          <p>姓名：{{ details.account.name }}</p>
        </div>
      </div>
      <div class="bbs-right">
        <p class="bbs-count title-bar">
          <span>收藏 {{ details.fav_num }}</span>
          <span>浏览 {{ details.view_num }}</span>
          <span>评论 {{ details.reply_num }}</span>
        </p>
        <div class="bbs-content" v-html="details.content"></div>
        <div class="image-preview">
          <el-image
            v-for="(pic, index) in srcList"
            :key="index"
            class="image-item"
            :src="pic"
            :preview-src-list="srcList"
          >
          </el-image>
        </div>
        <p class="title-bar">回复话题</p>
        <div class="bbs-replay">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
            <el-form-item label="用户名：">
              <el-input :value="account" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="回复内容：" prop="content">
              <el-input v-model="ruleForm.content" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">确定</el-button>
              <span style="margin-left: 10px;">注意：管理员回复内容会置顶显示</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="bbs-comments">
          <p class="title-bar">全部评论</p>
          <div v-for="item in replyList" :key="item.id" class="comment-item">
            <div class="user-photo">
              <el-avatar :size="50" :src="item.account.head_img">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
            </div>
            <div class="comment-detail">
              <p>{{ item.account.name }}</p>
              <p>回复：{{ item.content }}</p>
              <p>{{ item.create_time }}<span class="comment-delete" @click="handleDelete(item.id)">删除</span></p>
            </div>
          </div>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.size"
            @pagination="fetchReplyList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      details: {},
      ruleForm: {
        content: ''
      },
      rules: {
        content: [{ required: true, message: '请填写回复内容：', trigger: 'blur' }]
      },
      replyList: [],
      id: this.$route.params && this.$route.params.id,
      account: this.$store.state.user.user_info.nickname,
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      srcList: []
    }
  },
  created() {
    this.$http.fetchTopicDetails({ id: this.id }).then(({ data }) => {
      this.details = data
      data.images.forEach(item => {
        this.srcList.push(item.url)
      })
    })
    this.fetchReplyList()
  },
  methods: {
    fetchReplyList() {
      this.$http.fetchTopicReply({ id: this.id }).then(({ data: { lists, total }}) => {
        this.replyList = lists
        this.total = total
      })
    },
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const data = { id: this.id, content: this.ruleForm.content }
          this.$http.createTopicReply(data).then(({ data }) => {
            if (data) {
              this.ruleForm.content = ''
              this.fetchReplyList()
            }
          })
        }
      })
    },
    handleDelete(id) {
      this.$http.deleteReply({ id }).then(({ data }) => {
        if (data) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.fetchReplyList()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.bbs-container {
  display: flex;
  margin: 0 auto;
  color: #999;
  width: 1300px;
  background: #fff;
  border: 1px solid #ccc;
  .bbs-left {
    flex: 0 0 300px;
    .bbs-avatar {
      text-align: center;
      margin: 100px 0;
    }
    .bbs-info {
      margin: 0 auto;
      width: 200px;
      text-align: left;
      font-weight: 550;
    }
  }
  .bbs-right {
    flex: 1;
    padding: 30px 50px 50px 50px;
    border-left: 1px solid #ccc;
    .title-bar {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
    }
    .bbs-count {
      > span {
        margin-right: 20px;
      }
    }
    .bbs-content {
      margin-top: 20px;
      min-height: 550px;
    }
    .image-preview {
      width: 900px;
      height: 180px;
      white-space: nowrap;
      overflow-x: scroll;
      .image-item {
        width: 150px;
        height: 150px;
        margin-right: 20px;
        &:last-child {
          margin: 0
        }
      }
    }
    .bbs-replay {
      padding: 30px 0;
    }
    .bbs-comments {
      margin-top: 45px;
      .comment-item {
        display: flex;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid #ccc;
        .user-photo {
          flex: 0 0 100px;
          text-align: center;
        }
        .comment-detail {
          flex: 1;
          .comment-delete {
            cursor: pointer;
            padding: 0 15px;
            color: #0079FE;
          }
        }
      }
      .pagination-container {
        border: none;
      }
    }
  }
}
</style>
