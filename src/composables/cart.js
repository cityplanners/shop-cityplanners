import { computed, ref, watch } from 'vue'
import { findProduct } from '../data/products'
import { sizes } from '../config/shop'

const key = 'cityplanners:interest-bag:v2'
function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]')
    if (!Array.isArray(value)) return []
    return value.filter((i) => findProduct(i.slug)?.variants.some((v) => v.id === i.color) && sizes.includes(i.size) && Number.isInteger(i.quantity) && i.quantity > 0 && i.quantity <= 10)
      .slice(0, 50).map(({ slug, size, color, quantity }) => ({ slug, size, color, quantity }))
  } catch { return [] }
}
const items = ref(readCart())
watch(items, (value) => { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Bag still works for this session. */ } }, { deep: true })
const count = computed(() => items.value.reduce((n, i) => n + i.quantity, 0))
const lines = computed(() => items.value.map((i) => ({ ...i, product: findProduct(i.slug), variant: findProduct(i.slug).variants.find((v) => v.id === i.color) })))

export function useCart() {
  return {
    items, count, lines,
    add(slug, size, color) {
      if (!findProduct(slug)?.variants.some((v) => v.id === color) || !sizes.includes(size)) return false
      const existing = items.value.find((i) => i.slug === slug && i.size === size && i.color === color)
      if (existing) existing.quantity = Math.min(existing.quantity + 1, 10)
      else items.value.push({ slug, size, color, quantity: 1 })
      return true
    },
    remove(slug, size, color) { items.value = items.value.filter((i) => i.slug !== slug || i.size !== size || i.color !== color) },
    setQuantity(slug, size, color, quantity) {
      const existing = items.value.find((i) => i.slug === slug && i.size === size && i.color === color)
      if (existing && Number.isInteger(quantity)) existing.quantity = Math.min(10, Math.max(1, quantity))
    },
  }
}
