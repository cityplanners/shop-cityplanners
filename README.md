# CITY PLANNERS / Shop

Vue storefront prototype for **shop.cityplanners.co**. This is a design review,
not a live store. Desktop and mobile styling remains provisional until approved.

## Run locally

Requires Node.js 24 (or a compatible recent Node 22 release) and npm.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Included

- Eight square artwork tiles with desktop garment hover and an explicit touch preview button.
- A full page per design with gallery views, descriptive text, size selection, and a history field ready for the creator's account.
- Color selection where available: I4 EYESORE in white or black.
- A locally saved bag that distinguishes design, color, and size and supports quantity/removal.
- Prelaunch checkout with email consent and all selected design/color/size preferences.
- An outlined Montserrat SVG wordmark, locally bundled fonts, responsive layout, keyboard controls, and reduced-motion support.
- The official business wallet link and the requested USD-to-BTC statement.
- Build validation on pushes/PRs; deployment only through a manually triggered workflow.

## Collection

| Design | Garment | Colors |
| --- | --- | --- |
| Surreal Landscaping | T-shirt | Safety yellow |
| No Dancing | T-shirt | Red |
| Live Forever | T-shirt | Black |
| No Hunting Humans | Long sleeve | Woodland camo |
| I4 EYESORE / The Majesty Building | Long sleeve | White, black |
| Satellite | T-shirt | Black |
| Graphic Designer | T-shirt | White |
| Advertise Here | T-shirt | Yellow |

The Live Forever tile is an unchanged copy of **live forever eos.png**.
Supplied artwork and original garment images are copied without creative edits.
The No Hunting Humans and black I4 EYESORE garment views are generated concepts,
not photos of manufactured inventory. Their product pages say so.

## Content and style

- `src/data/products.js`: artwork, gallery images, variants, descriptions, history.
- `src/config/shop.js`: wallet, payment statement, draft size preferences, public signup endpoint.
- `src/styles.css`: all provisional visual styling.
- `src/composables/cart.js`: local bag state, keyed by design + color + size.
- `src/services/waitlist.js`: endpoint adapter and signup payload.
- `public/designs/`, `public/garments/`: original artwork and garment mockups.

The initial descriptions describe the visible art; they do not claim a historical
origin. `history` fields are intentionally empty until Christofer supplies the
stories. Prices, materials, measurements, and stock have not been invented.
XS–3XL are draft interest preferences, not confirmed production availability.

## Connect the mailing list

The prototype deliberately starts with no email provider configured. It clearly
labels signup as a preview and never reports a real subscription when no request
was sent. Email addresses are not put in local storage. Bag selections are.

1. Set up a server or form service that accepts the JSON described in
   `docs/waitlist-api.md`, stores subscribers, and emails the owner their selections.
2. Configure the destination inbox with that service after confirming it with the owner.
3. Add its public HTTPS URL as `VITE_WAITLIST_ENDPOINT` in `.env.local`, or as a
   GitHub Actions repository variable for publishing. No API secret belongs in Vite variables.
4. Enable validation, origin restrictions, abuse protection, confirmation and
   unsubscribe handling on the server/provider, then test actual delivery.

No emails have been sent and no mailing-list service has been provisioned.

## GitHub Pages, after approval

The repository is named `shop-cityplanners`; its name does not determine the
custom hostname. The intended hostname is **shop.cityplanners.co**, not
`shop.github.com`.

1. Enable Pages with **GitHub Actions** as the source.
2. Configure the custom domain as `shop.cityplanners.co` and verify domain ownership.
3. Point the `shop` DNS CNAME to the GitHub account's `<owner>.github.io` hostname,
   not to a repository URL. Leave the existing main website untouched.
4. Configure the email endpoint, finalize approved content/CSS, and remove the
   `noindex,nofollow` meta tag from `index.html` when ready for indexing.
5. Manually run **Publish approved shop**, checking the design approval input.
6. Verify domain status and HTTPS in Pages settings.

For a temporary `<owner>.github.io/shop-cityplanners/` project URL instead of the
custom domain, set `VITE_BASE_PATH=/shop-cityplanners/` and omit `public/CNAME`.
Hash-based routes support page reloads on static hosting.

Official references: [Vue quick start](https://vuejs.org/guide/quick-start.html),
[Vite static deployment](https://vite.dev/guide/static-deploy.html), and
[GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).

## Current launch boundaries

No payment processor, Bitcoin transaction flow, order placement, live inventory,
or production subscription service is active. The wallet is a read-only explorer
link. The checkout only captures preorder interest when an endpoint is connected.

Artwork rights remain with their respective owners. No open-source license is
granted for the supplied designs by this prototype.
