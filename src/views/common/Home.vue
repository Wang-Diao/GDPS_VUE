<template>
  <div>
    <el-container>
      <el-aside width="250px">
        <div class="sidebar">
          <el-menu
              background-color="#282828"
              text-color="#ffffff"
              :default-active="$route.path"
              active-text-color="#ffffff"
              router
              class="el-menu-vertical-demo"
              style="width: 250px;">
            <div class="top_info_block" @click="clickTopInfo">
              <img :src="require('../../assets/net_disc_icon.png')" alt=""/>
              <span style="font-size: 28px;color: #ffffff;margin-left: 5px;">地质灾害预报系统</span>
            </div>
            <el-submenu index="1-1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/UserRightsManagement">用户权限管理</el-menu-item>
                <el-menu-item index="/UserInformationManagement">用户信息管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="DataManagement">
              <i class="el-icon-s-data"></i>
              <span slot="title">数据管理</span>
            </el-menu-item>

            <el-menu-item index="/WarnInformationManagement">
              <i class="el-icon-s-comment"></i>
              <span slot="title">预警信息管理</span>
            </el-menu-item>

            <el-menu-item index="/ModelManagement">
              <i class="el-icon-s-grid"></i>
              <span slot="title">模型管理</span>
            </el-menu-item>

            <el-menu-item index="PersonalCenter">
              <i class="el-icon-s-custom"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>

          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header class="home-header">
          <el-row :gutter="20" class="header-row">
            <el-col :span="18" :offset="6" >
              <div class="user-info">
                <i class="el-icon-bell message-bell" @click="showDrawer"></i>
                <el-drawer
                    title="消息通知"
                    :visible.sync="drawer"
                    :show-close="true"
                    :close-on-press-escape="true"
                    :modal="true"
                    :with-header="true">
                  <span>消息框</span>
                </el-drawer>
                <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link" >
                <span v-text="this.user.name" style="cursor: default; font-size: 18px;"/>
                <i class="el-icon-arrow-down el-icon--right"/>
                <el-avatar :src=this.user.avatar alt=""/>
              </span>
                  <el-dropdown-menu>
                    <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      imgUrl:require("../../assets/user_login_bg.jpg"),
      keywords: '',
      user: {
        name: '王雕',
        role: 'admin, user',
        avatar: require('../../assets/user_avatar.png')
      },
      countInfoColors: [
        {color: '#5ca7ff', percentage: 60},
        {color: '#f5a623', percentage: 80},
        {color: '#ff0000', percentage: 90},
      ],
      left: '1.23',
      total: '10.0',
      percentage: 0,
      drawer: false,
      selectItem: '',
      addSizeVisible: false,
      newSize: 0,
      reason: '',
    };


  },
  mounted() {
    // TODO 向后端请求 left 和 total 数据（个人云盘信息），并计算 percentage
    var num = this.left / this.total;
    num = num * 100;
    this.percentage = Math.ceil(num);
    console.log(this.percentage);
  },
  methods: {
    showAddSizeDiaglog() {
      this.addSizeVisible = true;
    },
    handleCommand(command) {
      if (command === 'logout') {
        //请求服务器注销登录
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 清空服务器与用户的会话状态，客户端的一些用户信息
          // this.getRequest('/web/logout').then(resp => {});
          this.$store.commit('REMOVE_USER');
          this.$store.commit('REMOVE_USERNAME')
          this.$router.replace("/");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    },
    teamInfoPage() {
      this.$router.push('/manageTeam')
    },
    clickTopInfo() {
      this.$router.replace('/HomePage');
    },
    showDrawer() {
      this.drawer = !this.drawer;
    },
    manageTeamInfo() {
      if (this.user.role.indexOf('admin') !== -1) {
        return false;
      }
      return true;
    }
  }
}
</script>

<style>
.sidebar > ul {
  height: 100%;
  top: 0px;
  margin: 0;
  padding: 0;
  overflow: auto;
  position: fixed;
}

.is-active {
  background-color: #28b294 !important;
}

.el-menu-item:hover {
  background-color: #616161 !important;
}

.is-active:hover {
  background-color: #28b294 !important;
}

.el-divider {
  background-color: #595959 !important;
}

.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}

.el-main {
  position: absolute;
  left: 250px;
  right: 0;
  bottom: 0;
  overflow-y: hidden;
  padding: 0 !important;
}

.el-menu {
  z-index: 10;
}

.top_info_block {
  margin: 20px 30px 20px 30px;
  cursor: pointer;
}

.home-header {
  background-color: #ffffff;
}

.header-row {
  top: 15px;
}

.header-divider {
  background-color: #f0f0f0 !important;
  z-index: 8;
  right: 0;
}

.user-info {
  float: right;
  white-space: nowrap !important;
}

.navbar-icon {
  font-size: 23px !important;
}

.navbar-title-text {
  font-size: 16px;
  margin-left: 5px;
}

.count-progress-info {
  margin-top: 450px;
  height: 100px;
  width: 200px;
  padding-left: 20px;
  overflow: auto;
}

.message-bell {
  margin-right: 25px;
  font-size: 25px;
  color: #7c7c7c;
}

.message-bell:hover {
  cursor: pointer;
  color: #393939;
}

.rightullidiv {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rightulliimg {
  max-width: 100%;
  max-height: 200px;
}

</style>