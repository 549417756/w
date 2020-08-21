<template>
  <div class="app-container">

    <div class="mb10">
      直播名称：睡眠综合征临床研究
    </div>

    <el-tabs v-model="activeName2"
             type="card">
      <el-tab-pane label="试题"
                   name="first">
        <div class="mb10">
          <el-button type="primary"
                     @click="onSubmit">导入试题</el-button>
          <el-button type="primary"
                     @click="onSubmit">
            <a :href="`${publicPath}question.xls`"
               download="试题模板">下载导入模板</a>
          </el-button>
          <el-button type="primary"
                     @click="onSubmit">清空试题
          </el-button>
        </div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">

          <el-form-item label="单选题">
            <el-input v-model="formInline.user"
                      placeholder="s"><i slot="suffix"
                 style="font-style:normal;margin-right: 10px;">分/题</i></el-input>
          </el-form-item>

          <el-form-item label="多选题">
            <el-input v-model="formInline.user"
                      placeholder=""><i slot="suffix"
                 style="font-style:normal;margin-right: 10px;">分/题</i></el-input>
          </el-form-item>
          <el-form-item label="判断题">
            <el-input v-model="formInline.user"
                      placeholder=""><i slot="suffix"
                 style="font-style:normal;margin-right: 10px;">分/题</i></el-input>
          </el-form-item>
          <el-form-item label="合格分数">
            <el-input v-model="formInline.user"
                      placeholder=""><i slot="suffix"
                 style="font-style:normal;margin-right: 10px;">分以上</i></el-input>
          </el-form-item>

        </el-form>
        <div class="text-center">
          <el-button type="primary"
                     @click="onSubmit">确定</el-button>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="问卷"
                   name="two">
      </el-tab-pane> -->
    </el-tabs>

  </div>
</template>
<script>
export default {
  data () {
    return {
      publicPath: process.env.BASE_URL,
      formInline: {
        user: ''
      },
      activeName2: 'first'
    }
  },
  methods: {
    onSubmit () {

    }


  }
};
</script>
<style lang="scss">
</style>