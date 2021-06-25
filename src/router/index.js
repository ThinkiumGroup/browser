import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import routerPhone from "./routerPhone";
import routerPC from "./routerPc";
let routers
// if(location.href.includes('localhost')) {
 
//   //  routers = [...routerPhone, ...routerPC]
//   routers = [...routerPC, ...routerPhone ]
// } else 
if(location.href.includes('phone')) {
  routers = routerPhone
} else {
  isPhone()
}
function isPhone () {
  console.log(window)
  if(window.screen.availHeight > window.screen.availWidth  ) {
    routers = routerPhone
  } else {
    routers = routerPC
  }
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      ...routers
    ]
  }

]

const router = new VueRouter({
  routes
});

export default router
