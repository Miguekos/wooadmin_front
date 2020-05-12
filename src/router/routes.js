
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'ordenes', component: () => import('pages/ordenes/Ordenes.vue') },
      { path: 'productos', component: () => import('pages/productos/Productos.vue') },
      { path: 'olva', component: () => import('pages/olva/Olva.vue') },
      { path: 'test', component: () => import('pages/TestFilter.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
