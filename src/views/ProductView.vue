<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findProduct } from '../data/products'
import { sizes } from '../config/shop'
import { useCart } from '../composables/cart'
const route = useRoute()
const product = computed(() => findProduct(route.params.slug))
const selectedImage = ref(0)
const selectedSize = ref('')
const selectedColor = ref('')
const added = ref(false)
const { add } = useCart()
watch(product, (p) => {
  selectedImage.value = 0; selectedSize.value = ''; added.value = false
  selectedColor.value = p?.variants[0].id || ''
  document.title = `CITY PLANNERS — ${p?.title || 'Design not found'}`
}, { immediate: true })
const variant = computed(() => product.value?.variants.find((v) => v.id === selectedColor.value))
const activeImage = computed(() => variant.value?.gallery[selectedImage.value])
watch(selectedColor, () => { selectedImage.value = 0; added.value = false })
function addToBag() { added.value = add(product.value.slug, selectedSize.value, selectedColor.value) }
</script>
<template>
  <section v-if="product" class="product-page section-wrap">
    <div class="breadcrumb mono"><RouterLink to="/">COLLECTION</RouterLink><span>/</span><span>DESIGN {{ product.number }}</span></div>
    <div class="product-layout">
      <div class="gallery">
        <div class="gallery-main" :class="{ 'is-artwork': activeImage.kind === 'artwork' }" :style="{ '--art-bg': product.background }"><img :src="activeImage.src" :alt="`${product.title} — ${activeImage.label}`" /><span class="gallery-caption mono">{{ activeImage.label }} / {{ (selectedImage + 1).toString().padStart(2, '0') }}</span></div>
        <div class="gallery-thumbs" aria-label="Product views"><button v-for="(img, index) in variant.gallery" :key="img.src" :class="{ active: index === selectedImage }" :aria-label="`Show ${img.label.toLowerCase()} view`" :aria-pressed="index === selectedImage" @click="selectedImage = index"><img :src="img.src" :alt="img.label" /><span>{{ img.label }}</span></button></div>
        <p v-if="variant.concept" class="concept-note mono">CONCEPT GARMENT / FINAL PRINT MAY VARY</p>
      </div>
      <div class="product-information">
        <p class="eyebrow">DESIGN {{ product.number }} / {{ product.category.toUpperCase() }}</p>
        <h1>{{ product.title }}</h1><p class="product-color">{{ product.category }} / {{ variant.label }}</p>
        <div class="product-description"><p>{{ product.description }}</p></div>
        <p class="price-note mono">PRICING ANNOUNCED AT LAUNCH</p>
        <form @submit.prevent="addToBag">
          <fieldset v-if="product.variants.length > 1" class="colors"><legend>Color <span>/ {{ variant.label }}</span></legend><div class="color-options"><label v-for="color in product.variants" :key="color.id" :class="{ selected: selectedColor === color.id }"><input v-model="selectedColor" type="radio" name="color" :value="color.id" :aria-label="color.label" /><span class="color-swatch" :style="{ background: color.swatch }"></span><span>{{ color.label }}</span></label></div></fieldset>
          <fieldset class="sizes"><legend>Select your size</legend><div class="size-options"><label v-for="size in sizes" :key="size" :class="{ selected: selectedSize === size }"><input v-model="selectedSize" type="radio" name="size" :value="size" @change="added = false" /><span>{{ size }}</span></label></div></fieldset>
          <button class="button-primary add-button" type="submit" :disabled="!selectedSize">{{ added ? 'Added to bag' : 'Add to bag' }}<span aria-hidden="true">{{ added ? '✓' : '+' }}</span></button>
          <p v-if="added" class="added-message" role="status">{{ product.title }} / {{ variant.label }} / {{ selectedSize }} is in your bag. <RouterLink to="/cart">View bag</RouterLink></p>
        </form>
        <p class="product-footnote">Preorders opening soon. Save your selection and we’ll let you know when it’s ready.</p>
        <details v-if="product.history" class="design-notes" open><summary>About the design</summary><p>{{ product.history }}</p></details>
      </div>
    </div>
  </section>
  <section v-else class="section-wrap empty-state"><p class="eyebrow">DESIGN NOT FOUND</p><h1>This one isn’t in the archive.</h1><RouterLink class="button-primary" to="/">Back to the collection</RouterLink></section>
</template>
