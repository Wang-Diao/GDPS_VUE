import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/common/Home";
import UserRightsManagement from "@/views/UserRightsManagement";
import UserInformationManagement from "@/views/UserInformationManagement";
import DataManagement from "@/views/DataManagement";
import WarnInformationManagement from "@/views/WarnInformationManagement";
import ModelManagement from "@/views/ModelManagement";
import PersonalCenter from "@/views/PersonalCenter";
import HomePage from "@/views/HomePage";
import register from "@/views/register";
Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        redirect: '/HomePage',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/UserRightsManagement',
                name: 'UserRightsManagement',
                component: UserRightsManagement
            },
            {
                path: '/UserInformationManagement',
                name: 'UserInformationManagement',
                component: UserInformationManagement
            },
            {
                path: '/DataManagement',
                name: 'DataManagement',
                component: DataManagement
            },
            {
                path: '/WarnInformationManagement',
                name: 'WarnInformationManagement',
                component: WarnInformationManagement
            },
            {
                path: '/ModelManagement',
                name: 'ModelManagement',
                component: ModelManagement
            },
            {
                path: '/PersonalCenter',
                name: 'PersonalCenter',
                component: PersonalCenter
            },
            {
                path: '/HomePage',
                name: 'HomePage',
                component: HomePage
            },

        ]
    },
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/common/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(((to, from, next) => {
    //守卫函数，可以添加一个Loading效果
    if (to.path === '/') {
        //钩子函数
        next();
    } else {
        if (window.localStorage.getItem('user') || window.sessionStorage.getItem('user')) {
            next();
        }
        next();
    }
}));

router.afterEach(router => {
    //添加Loading效果结束图案
});

export default router
