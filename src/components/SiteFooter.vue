<script setup>
import { wallet, walletUrl, paymentStatement } from '../config/shop'
</script>
<template>
  <footer class="site-footer" id="payment">
    <div class="footer-top"><span class="footer-brand">CITY PLANNERS</span><span class="mono">ORLANDO, FL / ONLINE EVERYWHERE</span></div>
    <div class="payment-note">
      <span class="bitcoin-mark" aria-hidden="true">BTC</span>
      <div><p>{{ paymentStatement }}</p><p class="wallet-line"><span>Official CITY PLANNERS business wallet</span><a :href="walletUrl" target="_blank" rel="noopener noreferrer">{{ wallet }}</a></p></div>
    </div>
    <div class="footer-bottom mono"><span>© {{ new Date().getFullYear() }} CITY PLANNERS</span><RouterLink to="/checkout">PREORDER UPDATES</RouterLink></div>
  </footer>
</template>
