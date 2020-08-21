<template>
  <div class="header-container">
    logo 云课堂
    <div class="header-information">
      <!-- <span v-if="user_info.staff"
            class="user-name">{{ user_info.staff.position.name }} {{ user_info.staff.name }}</span>
      <span v-else
            class="user-name">{{ user_info.username }}</span> -->
      <span class="headerimg">
        <img src="https://d1icd6shlvmxi6.cloudfront.net/gsc/CHH3G8/cb/3d/d1/cb3dd1bdab6748e0bbad158f4cccdaf9/images/用户管理/u136.svg?token=df5227d9624d164a103af499a621b23ab8ed6026e2a1c8e823545dcdf087e7b3"
             alt=""><i class="el-icon-caret-bottom"></i>
        <div class="selectbox">
          <p>
            <span type="text"
                  style="cursor: pointer;"
                  @click="gome">
              <svg-icon icon-class="zhanghu"
                        class="exit fl" />
              账户设置
            </span>
          </p>
          <p>
            <span type="text"
                  style="cursor: pointer;"
                  @click="logout">
              <svg-icon icon-class="switch-button"
                        class="exit fl" />
              安全退出
            </span>
          </p>
        </div>
      </span>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  name: 'Header',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['user_info']),
    type () {
      return getToken('type')
    }
  },
  methods: {
    logout () {
      this.$confirm('确定退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store.dispatch('user/logout')
          this.$store.commit('tagsView/EMPTY_VIEW')
          this.$router.push('/login')
        })
        .catch(() => { })
    },
    gome () {
      this.$router.push('/me')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.header-container {
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  height: 56px;
  line-height: 56px;
  background: $violet;
  z-index: 4;
  box-shadow: 0px 2px 5px rgba(64, 158, 255, 0.5);
}
.header-information {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 160px;
  font-size: 14px;
  cursor: pointer;
  span {
    margin: 0 6px;
  }
}
.exit,
.money {
  position: relative;
  top: 3px;
}
.headerimg {
  position: relative;
}
.selectbox {
  display: none;
  position: absolute;
  color: #333;
  width: 130px;
  right: 0;
  line-height: 30px;
  -moz-box-shadow: 0px 2px 7px #333333;
  -webkit-box-shadow: 0px 2px 7px #333333;
  box-shadow: 0px 2px 7px #333333;
  z-index: 2;
  background: #fff;
}
.header-information:hover .selectbox {
  display: block;
}
.selectbox p:hover {
  background: #409eff;
  color: #fff;
}
</style>

