// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import VueHtml5Editor from 'vue-html5-editor';

import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueHtml5Editor);

Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3000'
});

Vue.filter('fromNow', value => moment(value).fromNow());

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
