export const wallet = 'bc1q04qcvx2ftesmm0yuwn2hu00nhphpk8r4dpfgyx'
export const walletUrl = `https://mempool.space/address/${wallet}`
export const paymentStatement = 'We accept Bitcoin as our primary form of payment. 100% of proceeds received in USD will be converted into BTC to sanitize the currency.'
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
export const waitlistEndpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim() || ''
// Interest preferences only; final garment availability must be confirmed before launch.
export const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
