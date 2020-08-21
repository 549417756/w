<template>
  <div>
    <div class="sidebar-logo-container">

 
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  name: 'SidebarLogo',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['user_info']),
    type() {
      return getToken('type')
    }
  },
  methods: {
    // logoutSchool() {
    //   this.$confirm('确定退出该学校, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$router.push('/')
    //     this.$http.exitSchool().then(response => {
    //       setToken('Token', response.data.access_token)
    //       removeToken('type')
    //       location.reload()
    //     })
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>
