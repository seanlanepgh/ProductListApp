import {createRouter, createWebHistory} from "vue-router";
import AppLayout from '../components/AppLayout.vue'

import Products from "../views/Products/Products.vue";
const routes = [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'app',
    redirect: '/app/products',
    component: AppLayout,
    children: [
    {
    path: 'products',
    name: 'app.products',
    component: Products
    },
    ]
  },
//   {
//     path: '/:pathMatch(.*)',
//     name: 'notfound',
//     component: NotFound,
//   }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;