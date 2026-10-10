<script setup>
import ProductCard from '../components/ProductCard.vue'
import { products } from '../data/products'
</script>
<template>
  <section class="collection section-wrap" aria-labelledby="collection-title">
    <div class="collection-heading"><div><p class="eyebrow">CITY PLANNERS / DESIGN ARCHIVE</p><h1 id="collection-title">Wear something<br class="mobile-break" /> unofficial.</h1></div><div class="opening-note"><span class="notice-label mono">PUBLIC NOTICE / 001</span><p>Preorders opening soon.</p><RouterLink to="/checkout">Get notified</RouterLink></div></div>
    <div class="collection-toolbar mono"><span>THE COLLECTION <span class="muted">/ {{ products.length.toString().padStart(2, '0') }} DESIGNS</span></span><span class="desktop-hint">HOVER TO VIEW GARMENT</span><span class="mobile-hint">TAP + FOR SHIRT VIEW</span></div>
    <div class="product-grid"><ProductCard v-for="product in products" :key="product.slug" :product="product" /></div>
    <div class="collection-end mono"><span>END OF COLLECTION / {{ products.length.toString().padStart(3, '0') }}</span><span>MORE TO COME.</span></div>
  </section>
</template>
