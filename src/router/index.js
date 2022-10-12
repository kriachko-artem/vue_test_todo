import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// import {idb} from '@/api/idb'
// idb.getTables().then(value => console.log(value)
// )
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/todo-list',
  //   name: 'todo-list',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../components/TodoList')
  // },
  // {
  //   path: '/add-todo',
  //   name: 'todo',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../components/CreateTodo')
  // }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
