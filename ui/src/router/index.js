import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Dashboard,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: () => import('@/views/accounts/Account.vue'),
    redirect: '/accounts/list',
    children: [
      {
        path: 'list',
        name: 'accounts-list',
        meta: { requiresAuth: true },
        component: () => import('@/views/accounts/AccountTableLayout.vue'),
      },
      {
        path: 'add',
        name: 'accounts-add',
        meta: { requiresAuth: true },
        component: () => import('@/views/accounts/AccountFormLayout.vue'),
      },
      {
        path: 'edit/:id',
        name: 'accounts-edit',
        meta: { requiresAuth: true },
        component: () => import('@/views/accounts/AccountEditFormLayout.vue'),
      },
    ],
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/categories/Category.vue'),
    redirect: '/categories/list',
    children: [
      {
        path: 'list',
        name: 'categories-list',
        meta: { requiresAuth: true },
        component: () => import('@/views/categories/CategoryTableLayout.vue'),
      },
      {
        path: 'add',
        name: 'categories-add',
        meta: { requiresAuth: true },
        component: () => import('@/views/accounts/AccountFormLayout.vue'),
      },
      {
        path: 'edit/:id',
        name: 'categories-edit',
        meta: { requiresAuth: true },
        component: () => import('@/views/accounts/AccountEditFormLayout.vue'),
      },
    ],
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('@/views/transactions/Transaction.vue'),
    redirect: '/transactions/list',
    children: [
      {
        path: 'list',
        name: 'transactions-list',
        meta: { requiresAuth: true },
        component: () => import('@/views/transactions/TransactionMainLayout.vue'),
      },
      {
        path: 'add',
        name: 'transactions-add',
        meta: { requiresAuth: true },
        component: () => import('@/views/transactions/TransactionsAddLayout.vue'),
      },
      {
        path: 'edit/:id',
        name: 'transactions-edit',
        meta: { requiresAuth: true },
        component: () => import('@/views/transactions/TransactionsEditLayout.vue'),
      }
    ],
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.bearer === null) {
      next('/pages/login')
    } else {
      if (store.state.bearer !== null) {
        next()
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      if (store.state.bearer !== null) {
        next('/dashboard')
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
