<template>
  <div :style="note">
    <el-form
        :rules="rules"
        ref="loginForm"
        v-loading="loading"
        element-loading-text="正在登录..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :model="loginForm"
        class="loginContainer">
      <h3 class="loginTitle">地质灾害预报系统</h3>
      <el-divider><span style="font-size: 14px;color: #8c8c8c">统一认证中心</span></el-divider>
      <h5 style="text-align: center">登录到 <span style="color: #1890ff">【地质灾害预报系统平台】</span></h5>
      <el-form-item prop="username">
        <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off"
                  placeholder="用户名" clearable prefix-icon="el-icon-user" ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="normal" type="password" v-model="loginForm.password" @keypress.enter.native="onSubmit" auto-complete="off"
                  placeholder="密码" clearable prefix-icon="el-icon-lock" ></el-input>
      </el-form-item>
      <el-form-item style="margin: 0">
        <a style="width: 60%; text-align: right; display: inline-block;  color: steelblue" href="/register">还没账号？去注册</a>
      </el-form-item>
      <el-form-item style="margin: 0">
        <el-checkbox size="normal" class="loginRemember" v-model="loginForm.rememberMe">一周内免登录</el-checkbox>
      </el-form-item>
      <el-button size="normal" type="primary" style="width: 100%;" @click="onSubmit" :disabled=forbidLogin v-loading.fullscreen.lock="fullscreenLoading">登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      codeURL: '',
      loginUrl: 'login',
      loading: false,
      forbidLogin: true,
      loginForm: {
        username: '',
        password: '',
        rememberMe: true
      },
      fullscreenLoading: false,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
      note: {
        backgroundImage: "url(" + require("../../assets/user_login_bg.jpg") + ")",
        backgroundColor: "#f9f9f9",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
        backgroundSize: "100% 100%",
      }
    }
  },
  watch: {
    'loginForm.username': function (val, oldValue) {
      this.forbidLogin = !this.checkData();
    },
    'loginForm.password': function (val, oldValue) {
      this.forbidLogin = !this.checkData();
    },
  },
  methods: {
    checkData() {
      return this.loginForm.username !== '' && this.loginForm.password !== '';
    },
    onSubmit() {
      this.postRequest('/web/login', this.loginForm).then(resp => {
        if (resp.data.object === true) {
          this.$router.push('/HomePage');
        } else {
          this.$message.warning("用户名或者密码错误!");
        }
      })
    },
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid && !this.forbidLogin) {
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = false;
            let user = {
              id: '123',
              username: 'WangDiao'
            }
            this.$store.commit('INIT_USER', JSON.stringify(user));
            this.$router.push('/home');
            //TODO 将用户的username存储为全局数据，每一个用户名作为该用户的文件夹前缀
            this.$store.commit('INIT_USERNAME', this.loginForm.username);
            this.$store.commit('INIT_USERID', user.userId);
          }, 2000);
          /*this.loading = true;
          this.postKeyValueRequest('/web/doLogin', this.loginForm).then(resp => {
                this.loading = false;
                if (resp) {
                  let user = resp.data.user;
                  console.log(user);
                  /!*if (user.avatar === '') {
                    user.avatar = require('../../assets/user_pic_middle.gif');
                  }*!/
                  this.$store.commit('INIT_USER', JSON.stringify(user));
                  this.$store.commit('INIT_USERNAME', this.loginForm.username);
                  this.$store.commit('INIT_USERID', user.userId);
                  this.$router.push('/');
                }
              }
          );*/

        } else {
          this.$message.error("请输入所有的字段!");
          return false;
        }
      });
    },
  }
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  margin: 100px auto;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}

.loginRemember {
  text-align: left;
  margin: 0 0 15px 0;
}
</style>