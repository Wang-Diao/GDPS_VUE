import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './utils/api.js'
import Contextmenu from "vue-contextmenujs"
import 'vue-popperjs/dist/vue-popper.css'
import axios from "axios"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import {
  deleteRequest,
  excelFilePostUpload,
  getRequest,
  postFileRequest,
  postJsonRequest,
  postKeyValueRequest,
  postRequest, putRequest
} from "@/utils/api";

Vue.config.productionTip = false;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postFileRequest = postFileRequest;
Vue.prototype.postJsonRequest = postJsonRequest;
Vue.prototype.excelFilePostUpload = excelFilePostUpload;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.use(ElementUI);
Vue.use(Contextmenu);
axios.defaults.baseURL = "http://localhost:9000"
Vue.prototype.$http = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
