import { asset } from '../config/shop'

// Descriptions describe the supplied artwork. Add the creator's actual histories
// to history; no biographical or production history has been invented.
const records = [
  {
    slug: 'surreal-landscaping', number: '01', title: 'Surreal Landscaping',
    category: 'T-shirt', color: 'Safety yellow', background: '#ccff00',
    graphic: 'surreal-landscaping.png',
    sourceGraphic: 'surreal landscaping.svg.png',
    views: [['surreal-back.png', 'Back'], ['surreal-front.png', 'Front'], ['surreal-side.png', 'Side']],
    description: '“We shape your reality!” An all-seeing eye and a landscaping service that promises a little more than a well-kept lawn.',
    history: '',
  },
  {
    slug: 'no-dancing', number: '02', title: 'No Dancing',
    category: 'T-shirt', color: 'Red', background: '#ff0000',
    graphic: 'no-dancing.png', sourceGraphic: 'no dancing.png',
    views: [['no-dancing-back.png', 'Back'], ['no-dancing-front.png', 'Front']],
    description: 'A warning sign, worn out of context. Prohibition symbols and official-looking fine print give dancing the bureaucratic treatment.',
    history: '',
  },
  {
    slug: 'live-forever', number: '03', title: 'Live Forever',
    category: 'T-shirt', color: 'Black', background: '#000000',
    graphic: 'live-forever-eos.png', sourceGraphic: 'live forever/live forever eos.png',
    views: [['live-forever-back.png', 'Back'], ['live-forever-front.png', 'Front']],
    description: '“Online in cyberspace!” A neon-green invitation to upload yourself, complete with a globe, a monthly rate, and the promise of forever.',
    history: '',
  },
  {
    slug: 'no-hunting-humans', number: '04', title: 'No Hunting Humans',
    category: 'Long sleeve', color: 'Woodland camo', background: '#3b3b30',
    graphic: 'no-hunting-humans.png', sourceGraphic: 'image.png',
    views: [['no-hunting-front.png', 'Front'], ['no-hunting-back.png', 'Back']],
    description: 'NO HUNTING. HUMANS. A familiar woodland camouflage pattern interrupted by an orange public notice.',
    history: '', concept: true,
  },
  {
    slug: 'majesty-building', number: '05', title: 'I4 EYESORE',
    category: 'Long sleeve', color: 'White', background: '#ffffff',
    graphic: 'majesty-building.png', sourceGraphic: 'BACK.png',
    views: [['majesty-back.png', 'Back'], ['majesty-front.png', 'Front'], ['majesty-left.png', 'Left sleeve'], ['majesty-right.png', 'Right sleeve']],
    variants: [
      { id: 'white', label: 'White', swatch: '#ffffff' },
      { id: 'black', label: 'Black', swatch: '#111111', concept: true, views: [['majesty-black-back.png', 'Back'], ['majesty-black-front.png', 'Front']] },
    ],
    description: 'Altamonte Springs, rendered as a souvenir. The blue building takes center stage, with CITYPLANNERS.CO and SUPPORT LOCAL ART along the sleeves.',
    history: '',
  },
  {
    slug: 'satellite', number: '06', title: 'Satellite',
    category: 'T-shirt', color: 'Black', background: '#000000',
    graphic: 'satellite.png', sourceGraphic: 'satellite 1.png',
    views: [['satellite-back.png', 'Back'], ['satellite-side.png', 'Side']],
    description: '“Twinkle, twinkle, satellite…” A small orbiting object, Japanese lettering, and a familiar rhyme looking a little farther into the sky.',
    history: '',
  },
  {
    slug: 'graphic-designer', number: '07', title: 'Graphic Designer',
    category: 'T-shirt', color: 'White', background: '#ffffff',
    graphic: 'graphic-designer.png', sourceGraphic: 'for hire white.png',
    views: [['designer-front.png', 'Front'], ['designer-side.png', 'Side']],
    description: '“Graphic designer (for hire).” A rainbow-colored job title turns a white shirt into a very direct business card.',
    history: '',
  },
  {
    slug: 'advertise-here', number: '08', title: 'Advertise Here',
    category: 'T-shirt', color: 'Yellow', background: '#ffff00',
    graphic: 'advertise-here.png', sourceGraphic: 'back(1).png',
    views: [['advertise-back.png', 'Back'], ['advertise-front.png', 'Front'], ['advertise-side.png', 'Side']],
    description: 'An advertising space with sleeves. A phone number and an open invitation, printed in black on bright yellow.',
    history: '',
  },
]

export const products = records.map((p) => {
  const graphic = asset(`designs/${p.graphic}`)
  const variants = (p.variants || [{ id: p.color.toLowerCase().replaceAll(' ', '-'), label: p.color, swatch: p.background }]).map((v) => ({
    ...v,
    concept: v.concept || p.concept || false,
    gallery: [
      ...(v.views || p.views).map(([file, label]) => ({ src: asset(`garments/${file}`), label, kind: 'garment' })),
      { src: graphic, label: 'Artwork', kind: 'artwork' },
    ],
  }))
  return { ...p, graphic, variants, gallery: variants[0].gallery }
})
export const findProduct = (slug) => products.find((p) => p.slug === slug)
