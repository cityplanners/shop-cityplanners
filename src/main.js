import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import '@fontsource/montserrat/latin-400.css'
import '@fontsource/montserrat/latin-500.css'
import '@fontsource/montserrat/latin-600.css'
import '@fontsource/montserrat/latin-700.css'
import '@fontsource/montserrat/latin-800.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import App from './App.vue'
import CollectionView from './views/CollectionView.vue'
import ProductView from './views/ProductView.vue'
import CartView from './views/CartView.vue'
import CheckoutView from './views/CheckoutView.vue'
import './styles.css'

// Hash routes survive refreshes on GitHub Pages without a server-side fallback.
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: CollectionView, meta: { title: 'Shop' } },
    { path: '/design/:slug', component: ProductView },
    { path: '/cart', component: CartView, meta: { title: 'Your bag' } },
    { path: '/checkout', component: CheckoutView, meta: { title: 'Preorder updates' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  if (to.meta.title) document.title = `CITY PLANNERS — ${to.meta.title}`
})

createApp(App).use(router).mount('#app')
