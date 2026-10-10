<script setup>
import { useCart } from '../composables/cart'
const { count, lines, remove, setQuantity } = useCart()
</script>
<template>
  <section class="section-wrap cart-page">
    <p class="eyebrow">CITY PLANNERS / YOUR SELECTION</p><div class="page-title-row"><h1>Your bag.</h1><span class="mono">{{ count.toString().padStart(2, '0') }} ITEMS</span></div>
    <template v-if="lines.length"><div class="cart-layout"><div class="cart-lines"><article v-for="line in lines" :key="`${line.slug}-${line.size}-${line.color}`" class="cart-line"><RouterLink class="cart-image" :to="`/design/${line.slug}`" style="background: #f4f5f6"><img :src="line.variant.gallery[0].src" :alt="line.product.title" /></RouterLink><div class="cart-item-info"><RouterLink class="cart-item-title" :to="`/design/${line.slug}`">{{ line.product.title }}</RouterLink><p>{{ line.product.category }} / {{ line.variant.label }}</p><p class="mono">SIZE {{ line.size }}</p><button class="text-button" :aria-label="`Remove ${line.product.title} size ${line.size}`" @click="remove(line.slug, line.size, line.color)">Remove</button></div><div class="quantity-control"><label :for="`quantity-${line.slug}-${line.size}-${line.color}`">Qty</label><select :id="`quantity-${line.slug}-${line.size}-${line.color}`" :value="line.quantity" @change="setQuantity(line.slug, line.size, line.color, Number($event.target.value))"><option v-for="n in 10" :key="n" :value="n">{{ n }}</option></select></div></article></div><aside class="order-summary"><p class="eyebrow">YOUR SELECTION</p><h2>{{ count }} {{ count === 1 ? 'item' : 'items' }}. Good taste.</h2><p>Prices and availability will be announced when preorders open.</p><RouterLink class="button-primary" to="/checkout">Continue to checkout</RouterLink><p class="small-note">You won’t be charged today.</p></aside></div><RouterLink class="underlined-link" to="/">Keep exploring</RouterLink></template>
    <div v-else class="empty-state"><p>Your bag is waiting for a little imagination.</p><RouterLink class="button-primary" to="/">Explore the collection</RouterLink></div>
  </section>
</template>
