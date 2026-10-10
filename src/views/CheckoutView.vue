<script setup>
import { ref } from 'vue'
import { useCart } from '../composables/cart'
import { waitlistEndpoint } from '../config/shop'
import { joinWaitlist } from '../services/waitlist'
const { lines } = useCart()
const email = ref('')
const consent = ref(false)
const busy = ref(false)
const error = ref('')
const result = ref(null)
async function submit() {
  if (!consent.value || busy.value) return
  error.value = ''; busy.value = true
  try { result.value = await joinWaitlist({ email: email.value, consent: consent.value, lines: lines.value }) }
  catch (e) { error.value = e.name === 'TimeoutError' ? 'That took too long. Please try again.' : e.message || 'Something went wrong. Please try again.' }
  finally { busy.value = false }
}
</script>
<template>
  <section class="section-wrap checkout-page">
    <div class="checkout-layout"><div class="checkout-copy"><p class="eyebrow">PUBLIC NOTICE / PREORDER STATUS</p><span class="opening-stamp mono">OPENING SOON</span><h1>Not open yet.<br />You’re early.</h1><p class="checkout-intro">Preorders will open soon. Join the mailing list and we’ll let you know when your designs are ready.</p><p class="checkout-fine">Your design choices, colors, and sizes will be included with your signup. This is an expression of interest; no order or payment is taken.</p>
      <form v-if="!result" class="signup-form" @submit.prevent="submit"><label for="email">Email address</label><input id="email" v-model="email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required maxlength="254" :disabled="busy" /><label class="consent-label"><input v-model="consent" type="checkbox" required :disabled="busy" /><span>Email me about CITY PLANNERS preorders and these designs. I can unsubscribe at any time.</span></label><button class="button-primary" :disabled="busy || !consent" type="submit">{{ busy ? 'Sending…' : 'Notify me when preorders open' }}</button><p v-if="!waitlistEndpoint" class="preview-note">Design preview: signup delivery is not connected yet.</p><p v-if="error" class="form-error" role="alert">{{ error }}</p></form>
      <div v-else class="signup-result" role="status"><h2>{{ result.preview ? 'Signup preview complete.' : 'You’re on the list.' }}</h2><p>{{ result.preview ? 'Your selections are ready. No email or subscription has been sent from this preview.' : 'Your interest has been registered. We’ll email you when preorders open.' }}</p><RouterLink class="underlined-link" to="/">Back to the collection</RouterLink></div>
    </div><aside class="interest-summary"><div class="interest-heading mono"><span>YOUR INTERESTS</span><RouterLink to="/cart">EDIT BAG</RouterLink></div><template v-if="lines.length"><article v-for="line in lines" :key="`${line.slug}-${line.size}-${line.color}`" class="interest-line"><div style="background: #f4f5f6"><img :src="line.variant.gallery[0].src" :alt="line.product.title" /></div><section><h2>{{ line.product.title }}</h2><p class="mono">{{ line.variant.label.toUpperCase() }} / {{ line.size }} / QTY {{ line.quantity }}</p></section></article></template><p v-else class="general-interest">You’ll receive general preorder updates.<br /><RouterLink to="/">Choose a design</RouterLink> to include your size.</p><div class="interest-bottom mono">NO PAYMENT REQUIRED</div></aside></div>
  </section>
</template>
