import { waitlistEndpoint } from '../config/shop'

export async function joinWaitlist({ email, consent, lines }) {
  const payload = {
    email: email.trim(),
    consent,
    consentText: 'Email me about CITY PLANNERS preorders and these designs.',
    consentAt: new Date().toISOString(),
    source: 'shop.cityplanners.co',
    interests: lines.map(({ product, variant, size, quantity }) => ({ design: product.title, slug: product.slug, color: variant.label, colorId: variant.id, size, quantity })),
  }
  if (!waitlistEndpoint) return { preview: true }
  const url = new URL(waitlistEndpoint)
  if (url.protocol !== 'https:') throw new Error('Signup is temporarily unavailable. Please try again later.')
  const response = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(12000),
  })
  if (!response.ok) throw new Error('We couldn’t save your signup. Please try again.')
  return { preview: false }
}
