import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue'

const AllCavaletes = require('./assets/js/components/all-cavaletes.vue');
const CreateCavalete = require('./assets/js/components/create-cavalete.vue');
const EditCavalete = require('./assets/js/components/edit-cavalete.vue');
const RemoveCavalete = require('./assets/js/components/delete-cavalete.vue');
const ViewCavalete = require('./assets/js/components/view-cavalete.vue');

const routes = [
    {
        name: 'all_cavaletes',
        path: '/',
        component: AllCavaletes
    },
    {
        name: 'create_cavalete',
        path: '/cavaletes/create',
        component: CreateCavalete
    },
    {
        name: 'edit_cavalete',
        path: '/cavaletes/edit/:id',
        component: EditCavalete
    },
    {
        name: 'delete_cavalete',
        path: '/cavaletes/delete/:id',
        component: RemoveCavalete
    },
    {
        name: 'view_cavalete',
        path: '/cavaletes/view/:id',
        component: ViewCavalete
    }
];
var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');