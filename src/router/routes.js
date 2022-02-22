
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'ordenes', component: () => import('pages/ordenes/Ordenes.vue') },
      { path: 'detalle', component: () => import('pages/ordenes/DetalleOrdenes.vue') },
      { path: 'productos', component: () => import('pages/productos/Productos.vue') },
      { path: 'texcargo', component: () => import('pages/olva/Olva.vue') },
      { path: 'test', component: () => import('pages/TestFilter.vue') },
    ]
  },
  {
    path: "/auth",
    component: () => import("pages/Auth/PageAuth.vue")
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
