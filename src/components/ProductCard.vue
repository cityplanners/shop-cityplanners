<script setup>
import { ref } from 'vue'
defineProps({ product: { type: Object, required: true } })
const shirt = ref(false)
</script>
<template>
  <article class="product-card" :class="{ 'show-shirt': shirt }">
    <div class="card-visual" :style="{ '--art-bg': product.background }">
      <RouterLink class="card-image-link" :to="`/design/${product.slug}`" :aria-label="`View ${product.title}`">
        <img class="card-art" :src="product.graphic" :alt="`${product.title} artwork`" :loading="Number(product.number) <= 3 ? 'eager' : 'lazy'" width="600" height="600" />
        <img class="card-shirt" :src="product.gallery[0].src" :alt="`${product.title} shirt, ${product.gallery[0].label.toLowerCase()} view`" loading="lazy" width="600" height="600" />
      </RouterLink>
      <button class="preview-toggle" :aria-pressed="shirt" :aria-label="`${shirt ? 'Show artwork for' : 'Preview shirt for'} ${product.title}`" @click="shirt = !shirt"><span class="plus" aria-hidden="true">{{ shirt ? '−' : '+' }}</span><span>{{ shirt ? 'Artwork' : 'Shirt view' }}</span></button>
    </div>
    <RouterLink class="card-title-link" :to="`/design/${product.slug}`"><div class="card-caption"><span class="design-number mono">{{ product.number }}</span><h2>{{ product.title }}</h2><span class="card-plus" aria-hidden="true">+</span></div><p class="card-meta">{{ product.category }} <span>/</span> {{ product.variants.length > 1 ? `${product.variants.length} colors` : product.color }}</p></RouterLink>
  </article>
</template>
