/**
 * Boot up the Vue instance and wire up the router.
 */
'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
//import vueTouch from 'vue-touch';
import { configRouter } from './route-config';

import './assets/scss/index.scss';
  
import wxApi from './wx-api'

Vue.use(VueRouter);
Vue.use(require('vue-resource'));
Vue.use(require('vue-validator'));
//Vue.use(vueTouch);

Vue.http.options.xhr = {withCredentials: true};
Vue.http.headers['access-control-allow-origin'] = '*';

Vue.config.debug = true;
Vue.config.warnExpressionErrors = false
// create router
const router = new VueRouter({
  history: false,
  saveScrollPosition: true
});

// configure router
configRouter(router);

// boostrap the app
const App = Vue.extend(require('./app.vue'));
router.start(App, '#app');

wxApi.init(Vue);

// just for debugging
window.router = router;

