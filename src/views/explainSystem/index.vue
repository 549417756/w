<template>
  <div class="Welcome">
    欢迎来到云课堂管理系统

    <!-- Form -->
    <el-button type="text"
               @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

    <el-dialog title="收货地址"
               :visible.sync="dialogFormVisible"
               append-to-body
               top="0"
               width="40%">
      <el-form :model="form">
        <el-form-item label="活动名称"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域"
                      :label-width="formLabelWidth">
          <el-select v-model="form.region"
                     placeholder="请选择活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {

      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    };
  }
};
</script>
<style scoped>
.Welcome {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
}
</style>
