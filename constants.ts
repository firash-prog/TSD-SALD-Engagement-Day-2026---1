import { ItemData } from './types';

// The Source of Truth for IDs and Image Paths.
// Text (name/description) here acts as the default if no overrides are found in localStorage.
export const STATIC_ITEMS: ItemData[] = [
  {
    id: '1',
    name: 'Welcoming Archway',
    description: 'Grand wooden entrance featuring Arabic calligraphy, camel silhouettes, and warm lantern lighting.',
    // Using a high-quality hosted image representing an illuminated archway in the desert
    image: 'https://images.unsplash.com/photo-1518022525094-218670c9b745?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    name: 'Boho Tents',
    description: 'A sanctuary for cultivating connection in nature. Five premium canvas tents with warm lighting, rugs, and pillows set against the sunset.',
    // Updated to use the specific local image provided by the user
    image: '/images/tents.jpg',
  },
  {
    id: '3',
    name: 'Site Decorations',
    description: 'Ambient lighting and desert-themed decor.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '4',
    name: 'Premium Harvest Feast',
    description: 'Live BBQ stations and harvest table.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '5',
    name: 'Ice Cream Cart',
    description: 'Vintage trike serving unlimited popsicles.',
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '6',
    name: 'Oasis Legacy Gift Bags',
    description: 'Tote bag with Charger, Mister, and Candle.',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '7',
    name: 'Selfie Setup Area',
    description: 'Themed photo backdrop.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '8',
    name: 'Games Area',
    description: 'Table Football, Tennis, Giant Soccer, Carrom.',
    image: 'https://images.unsplash.com/photo-1520698114423-6874e0d99dc0?auto=format&fit=crop&q=80&w=1000',
    subItems: [
      { id: '8-1', name: 'Table Football', image: 'https://images.unsplash.com/photo-1563299796-b729d0af54a5?auto=format&fit=crop&q=80&w=500' },
      { id: '8-2', name: 'Table Tennis', image: 'https://images.unsplash.com/photo-1534158914592-062992bbe900?auto=format&fit=crop&q=80&w=500' },
      { id: '8-3', name: 'Giant Soccer', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=500' },
      { id: '8-4', name: 'Carrom Board', image: 'https://images.unsplash.com/photo-1596726912365-d3527a419284?auto=format&fit=crop&q=80&w=500' },
    ]
  },
  {
    id: '9',
    name: 'Fragrance Mixing',
    description: 'Interactive perfume lab.',
    image: 'https://images.unsplash.com/photo-1595425235438-c300d603217b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '10',
    name: 'Plant a Seed',
    description: 'Potting station for succulents.',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80&w=1000',
  },
];