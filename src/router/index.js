import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import publicLayout from '@/publicLayout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/admin/login',
    component: () => import('@/views/admin/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  /* 前台页面 */
  {
    path: '/',
    component: publicLayout,
    redirect: '/index',
    children: [{
      path: '',
      name: 'Index',
      hidden: true,
      component: () => import('@/views/index/index'),
      meta: {
        title: '首页',
      }
    }]
    // component: () => import('@/views/index/index'),
    // meta: {
    //   title: '首页',
    // }
  },
  {
    path: '/article',
    component: publicLayout,
    children: [{
      path: ':id',
      // path: 'detail',
      name: 'ArticleDetail',
      hidden: true,
      component: () => import('@/views/articleDetail/index'),
      meta: {
        title: '文章详情',
      }
    }]
  },
  {
    path: '/tag',
    component: publicLayout,
    children: [{
      path: '/',
      // path: 'detail',
      name: 'ArticleTag',
      hidden: true,
      component: () => import('@/views/tag/index'),
      meta: {
        title: '文章标签',
      }
    }]
  },
  {
    path: '/category',
    component: publicLayout,
    children: [{
      path: '/',
      // path: 'detail',
      name: 'ArticleCategory',
      hidden: true,
      component: () => import('@/views/category/index'),
      meta: {
        title: '文章分类',
      }
    }]
  },
  {
    path: '/archive',
    component: publicLayout,
    children: [{
      path: 'timeline',
      // path: 'detail',
      name: 'ArticleArchive',
      hidden: true,
      component: () => import('@/views/archive/index'),
      meta: {
        title: '文章归档',
      }
    }]
  },
  {
    path: '/search',
    component: publicLayout,
    children: [{
      path: ':label',
      // path: 'detail',
      name: 'ArticleSearch',
      hidden: true,
      component: () => import('@/views/search/index'),
      meta: {
        title: '文章搜索',
      }
    }]
  },

  /*  后台页面 */
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    children: [{
      path: 'index',
      name: 'AdminIndex',
      component: () => import('@/views/admin/dashboard/index'),
      meta: {
        title: '管理后台首页',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/admin/article',
    component: Layout,
    redirect: '/admin/article/index',
    name: 'Article',
    meta: {
      title: '文章管理',
      icon: 'form'
    },
    children: [{
      path: 'edit',
      name: 'AdminArticle',
      component: () => import('@/views/admin/article/index'),
      meta: {
        title: '发布编辑',
        icon: 'edit'
      }
    }, {
      path: 'category',
      name: 'AdminCategory',
      component: () => import('@/views/admin/category/index'),
      meta: {
        title: '分类管理',
        icon: 'category'
      }
    }, {
      path: 'tag',
      name: 'AdminTag',
      component: () => import('@/views/admin/tag/index'),
      meta: {
        title: '标签管理',
        icon: 'tag'
      }
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: 'Form',
        icon: 'form'
      }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [{
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: 'Menu1'
        },
        children: [{
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {
              title: 'Menu1-1'
            }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {
              title: 'Menu1-2'
            },
            children: [{
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {
                  title: 'Menu1-2-1'
                }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {
                  title: 'Menu1-2-2'
                }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {
              title: 'Menu1-3'
            }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {
          title: 'menu2'
        }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [{
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: 'External Link',
        icon: 'link'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {

  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
