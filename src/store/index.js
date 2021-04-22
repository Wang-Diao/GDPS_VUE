import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user')),
    username: window.localStorage.getItem('username'),
    userId: window.localStorage.getItem('userId'),
  },
  mutations: {
    //写法与getters相类似
    //组件想要对于 vuex 中的数据进行的处理
    //组件中采用 this.$store.commit('方法名') 的方式调用，实现充分解耦
    //内部操作必须在此刻完成(同步)
    INIT_USER(state, user) {
      //防止浏览器刷新之后，将信息丢失
      state.user = user;
      sessionStorage.setItem('user', user);
      localStorage.setItem('user', user);
    },
    REMOVE_USER(state) {
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
      state.user = '';
    },
    INIT_USERNAME(state, username) {
      state.username = username;
      sessionStorage.setItem('username', username);
      localStorage.setItem('username', username);
    },
    REMOVE_USERNAME(state) {
      sessionStorage.removeItem('username');
      localStorage.removeItem('username');
      state.usernmae = '';
    },
    INIT_USERID(state, userId) {
      state.userId = userId;
      sessionStorage.setItem('userId', userId);
      localStorage.setItem('userId', userId);
    },
    REMOVE_USERID(state) {
      sessionStorage.removeItem('userId');
      localStorage.removeItem('userId');
      state.userId = '';
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    username: function (state) {
      return state.username;
    },
    userId: function (state) {
      return state.userId;
    }
  }
})
