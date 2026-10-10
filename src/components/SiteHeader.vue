<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../composables/cart'
import { asset } from '../config/shop'
const { count } = useCart()
const menu = ref(null)
const route = useRoute()
watch(() => route.fullPath, () => menu.value?.close())
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink class="wordmark" to="/" aria-label="CITY PLANNERS home">
        <img :src="asset('city-planners-wordmark.svg')" alt="CITY PLANNERS" width="754" height="110" />
      </RouterLink>
      <div class="header-actions">
        <RouterLink class="bag-link" to="/cart" :aria-label="`Shopping bag, ${count} items`">Bag <span class="bag-count">{{ count.toString().padStart(2, '0') }}</span></RouterLink>
        <button class="menu-button" aria-label="Open menu" aria-haspopup="dialog" @click="menu.showModal()"><span></span><span></span></button>
      </div>
    </div>
  </header>
  <dialog ref="menu" class="menu-dialog" aria-labelledby="menu-title" @click="(event) => { if (event.target === menu) menu.close() }">
    <div class="menu-top"><p id="menu-title" class="eyebrow">CITY PLANNERS / DIRECTORY</p><button class="text-button" aria-label="Close menu" @click="menu.close()">Close ×</button></div>
    <nav aria-label="Main navigation">
      <RouterLink to="/">The collection</RouterLink>
      <RouterLink to="/cart">Your bag ({{ count }})</RouterLink>
      <RouterLink to="/checkout">Preorder updates</RouterLink>
      <a href="https://cityplanners.co">CITYPLANNERS.CO</a>
    </nav>
    <p class="mono menu-note">PREORDERS OPENING SOON</p>
  </dialog>
</template>
