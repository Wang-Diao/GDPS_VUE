  <template>

    <div style="text-align: center;height: 838px;" :style="note">

      <el-form :rules="rule" v-loading="loading" ref="form" :model="form" label-width="80px" inline=false  class="loginContainer">
        <h3 class="loginTitle">用户注册</h3>
        <el-row  style="height: 10px"></el-row>
        <el-row >
        <el-form-item label="用户名"  prop="username">
          <el-input v-model="form.username" style="width: 300px"   ></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" vertical-align="middle" style="width: 300px" ></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" style="width: 300px"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="form.sex" style="width: 300px"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" style="width: 300px"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" style="width: 300px"></el-input>
        </el-form-item>
        </el-row>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="form.idcard" style="width: 300px"></el-input>
        </el-form-item>
        <el-row>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="form.telephone" @keypress.enter.native="regist"  style="width: 300px"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item>
          <el-button type="primary"  @click="regist" :disabled=forbidLogin v-loading.fullscreen.lock="fullscreenLoading">注册</el-button>
          <el-button @click="gotolink" class="btn btn-success">取消</el-button>
        </el-form-item>
        </el-row>
      </el-form>


    </div>

  </template>

  <script>
  export default {
  name: "register",
    data() {
      return {
        loading: false,
        forbidLogin: true,
        fullscreenLoading: false,
        form: {
          username:'',
          password:'',
          name: '',
          sex: '',
          age: '',
          email: '',
          idcard:'',
          telephone:'',

        },
        rule: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          sex: [{required: true, message: '请输入性别', trigger: 'blur'}],
          age: [{required: true, message: '请输入年龄', trigger: 'blur'}],
          email: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
          idcard: [{required: true, message: '请输入身份证号', trigger: 'blur'}],
          telephone: [{required: true, message: '请输入手机号', trigger: 'blur'}],

        },
        note: {
          backgroundImage: "url(" + require("../assets/2.jpg") + ")",
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
      'form.username': function (val, oldValue) {
        this.forbidLogin = !this.checkData();
      },
      'form.password': function (val, oldValue) {
        this.forbidLogin = !this.checkData();
      },
      'form.name': function (val, oldValue) {
        this.forbidLogin = !this.checkData();
      },
      'form.sex': function (val, oldValue) {
        this.forbidLogin = !this.checkData();
      },
      'form.age': function (val, oldValue) {
        this.forbidLogin = !this.checkData();
      },
      'form.email': function (val, oldValue) {
        this.forbidLogin = !this.checkData();
      },
      'form.idcard': function (val, oldValue) {
        this.forbidLogin = !this.checkData();
      },
      'form.telephone': function (val, oldValue) {
        this.forbidLogin = !this.checkData();
      },
    },
    methods: {
      checkData() {
        return this.form.username !== '' && this.form.password !== '' && this.form.name !== ''
            && this.form.sex !== '' && this.form.age !== '' && this.form.email !== ''
            && this.form.idcard !== '' && this.form.telephone !== '';
      },
      regist() {
        this.postRequest('/web/register', this.form).then(resp => {
          if (resp.data.object === true) {
            this.$message.success("注册成功!");
            this.$router.push('/');
          } else {
            this.$message.warning("用户名已存在!");
          }
        })
      },
      gotolink(){
        this.$router.replace('/')
      },
    }
  }
  </script>

  <style >
  .loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    width: 400px;
    margin: 100px auto;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  }
  </style>