import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon'
import CalendarView from "nativescript-ui-calendar/vue";
// import { CheckBox } from '@nstudio/nativescript-checkbox';
import RadListView from 'nativescript-ui-listview/vue';


Vue.prototype.$sell_arr = [];
Vue.prototype.$sell_obj = {
  cat_flag:true,
  sub_cat_flag:false,
  form:false,
  cam:false,
  prod_form:false,
};
// Load TNSFonticon
TNSFontIcon.debug = true
TNSFontIcon.paths = {
   fa: './assets/css/fontawesome.min.css',
   far: './assets/css/regular.min.css',
   fas: './assets/css/solid.min.css',
   fab: './assets/css/brand.min.css'
}
TNSFontIcon.loadCss()
Vue.filter('fonticon', fonticon)

Vue.use(RadListView);
Vue.use(CalendarView);

Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);
Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
); 
// Vue.registerElement(
//   'CheckBox',
//   () => CheckBox,
//   {
//     model: {
//       prop: 'checked',
//       event: 'checkedChange'
//     }
//   }
// );

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
