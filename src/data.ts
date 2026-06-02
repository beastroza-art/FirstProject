import { Pizza, Reward, Benefit, ExtraTopping } from './types';

export const PIZZAS: Pizza[] = [
  {
    id: 'margherita-prime',
    name: 'Margherita Prime',
    description: 'Salsa de tomate San Marzano, mozzarella fior di latte fresca, albahaca y aceite de oliva extra virgen.',
    price: 18.00,
    category: 'Premium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi1m2la_HQcOzob09hYJ9jOGJ4D8OEyIBWFDNcLYbGIQZlCJ28j-ttgiLkbGpJALbEhd2zt4Hp5pJNm-28R_XTUXRkc97bfrOSBvCHGM0lzc2YlzdJbW8CqvkH8OwIZv_OV3TY6obcnaIekZBSg8VwAEYPC0EeKylUs991191KrmbxMsDXO3iLnqKhXzrKAGuLKZdx2QLwzpwmn5stLzwzL-ygfbtq1M_gOEAoMpnA56eSstw11Dr4Nru3Vldj1VseHmc_teX3xWkQ',
    rating: 4.9,
    reviewsCount: 128,
    ingredients: ['Salsa de tomate San Marzano', 'Mozzarella fior di latte', 'Albahaca fresca', 'Aceite de oliva extra virgen']
  },
  {
    id: 'pepperoni-trufa',
    name: 'Pepperoni Trufa',
    description: 'Doble pepperoni artesanal, mozzarella, aceite de trufa blanca y un toque de miel picante.',
    price: 22.00,
    category: 'Premium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDboGumUeP5bTFlWIM18v-hHRNXaCMtiNO8oIUWRLyUh7sT6LeBION6D_zxjqgPswG0wMX-vcgqwNImtNSW2ssZzUABMykc_evcHUpK1Pgu96v-Cq9JU7U2HBQ-2jkbTfU_TaWJ4DPP8AYrwudWCvF4cfUPU2U5yEkWKBXCrqZlOIi9iV1ODVYLSB_pHLZDd_UFZnK05UZahLKMNiet4lm-ZsR7BRbxSX6AT9j-ISAeSWZ0UmYQo7syCzS1f2zXZd7inD18oURz8kmy',
    rating: 4.8,
    reviewsCount: 94,
    ingredients: ['Salsa de tomate', 'Doble pepperoni artesanal', 'Mozzarella', 'Aceite de trufa blanca', 'Miel picante']
  },
  {
    id: 'prime-special',
    name: 'Pizza Prime Special',
    description: 'Nuestra creación insignia para paladares exigentes. Ingredientes 100% artesanales sobre una base de masa madre italiana de fermentación lenta, terminada con un toque de aceite de oliva premium.',
    price: 24.99,
    category: 'Premium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmKcnuI-q4NM3u3T7tT7qfmaxaoTt3sndXPpgVLocMO1LQa4VZhfT1oYcdzFLobT2qyWVMaSrOQzxO-6_xC9bzaUBIuEg1xeJj-d0fUovxoz3Zf12KAQ_TPy7IJVY7dgbEdIiSoOs29WhUMVYBuqiLxv8x2Mjy-HOqkOdFSW23iZqPBAF03gq1olU4lMr6OjWXpRYUWxPmgR1Axh1_VX-0fI-tj4Z67BeRJlHttVH26qzEMHkgSPgaY2da3dHxcmSJ7dUIdJCre0Qd',
    rating: 4.9,
    reviewsCount: 128,
    ingredients: ['Masa madre italiana', 'Salsa de tomate premium', 'Mozzarella fresca', 'Albahaca de huerto', 'Aceite de oliva premium']
  },
  {
    id: 'truffle-prosciutto',
    name: 'Truffle Prosciutto',
    description: 'Crujiente masa artesanal, crema de trufa negra, fior di latte, prosciutto de Parma madurado, arúgula fresca y reducción balsámica.',
    price: 24.00,
    category: 'Premium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6T-7RgQKufeP-BviWUh3mEkMtdxhbRnYk2Aj4K-2ib59ZW3B749yXCW8JR32Dy6-HSVoJ1QQaWO_2sqn58soZTHcV9Yu9z_y5S_Ts9wJqORoxsmrH1hIZge7J5kKUdhoNLFRdUJynvv3td-WBax2Rh1ErehM_zgg6_XmMqWy3mbZTqz6_ng9k_yFMKYvvV8RCF7d0zACUhiUDPQ3T6C0Vt4ldp-k0Xa6A4C23LG9m7zRX50dIGQyXpHs4mJ1d_gt6NCRabHEwx5Lt',
    rating: 4.9,
    reviewsCount: 145,
    ingredients: ['Crema de trufa negra', 'Fior di latte', 'Prosciutto de Parma', 'Arúgula fresca', 'Reducción balsámica']
  },
  {
    id: 'burrata-margherita',
    name: 'Burrata Margherita',
    description: 'Salsa de tomate San Marzano auténtica, burrata fresca importada desde Puglia, hojas de albahaca dulce y un fino hilo de aceite de oliva virgen extra.',
    price: 22.00,
    category: 'Premium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNYiqrKAf1qiWa1az6XXgu0tB8uDd11mc_sCJwzNnUQJcLuiiEgTLMxC78FM04ONsc2c72cpNoLuW9LYNknS3yVUyJAUhBBaW9-lonP7m-kmaM9aOhsoIW0ZUT1SkzOfLm8OPSJCtSaVO2VVv5b6SqfYJz8VWojcAZfxGwIILmQVPXraSnUMF2vN0wlH3AAWd9nPN0uT2gSvEp3eXs6ptAGCvAGg89lkxytysRgYMW0Zxksvnn_7pNq4ZvlyRCTphtkF_XUMhmkFh',
    rating: 4.8,
    reviewsCount: 112,
    ingredients: ['Salsa de tomate San Marzano', 'Burrata fresca de Puglia', 'Albahaca dulce', 'Hilo de aceite de oliva']
  },
  {
    id: 'spicy-honey-diavola',
    name: 'Spicy Honey Diavola',
    description: 'Queso mozzarella, salami calabrés especiado picante, pimientos rojos asados y terminado con un toque de miel infusionada con chile picante.',
    price: 23.00,
    category: 'Premium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo43qGGm91OPlZ_LJ2rHggG87mb9Rxg-khUR6qdUwil5q8NjYl_rhAje2FzQ-5ALPH_ec8HeM7EJQgH9rGznjLRxNsMZtAL3-DDAYywDHT921f2ykZ_KIUw_j6J7BPXJl3spD5GzCTJM2ZhK6pDamFcjsVVewMlxhO0u3avuojAIeZmh9d97oMVILUaYQUjPle-jE-i04Ex0BMMvtFR4_WpbVpfB6sRlfBbuM8t2WTczJKPZhqiROk_VuXIFiebmGAM16N4Wp8KKP',
    rating: 4.7,
    reviewsCount: 88,
    ingredients: ['Mozzarella', 'Salami calabrés picante', 'Pimientos rojos asados', 'Miel de chile picante']
  },
  {
    id: 'wild-mushroom-bianco',
    name: 'Wild Mushroom Bianco',
    description: 'Base blanca con confit de ajo, champiñones silvestres asados a la leña, queso taleggio cremoso, tomillo fresco y aceite de trufa blanca.',
    price: 25.00,
    category: 'Premium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkxz3ULTONP_Bhy9w3PseZUX0cQRjA7ssnVa3jH1J4eR1dzRwu32RvRJL-2RXO8zRcC3c_ux5_3F9LIg1VEepZsSIMYJQJCLTDGX81_gahdX9OVWAMQ2WhS2gf0p6Kc5Glh8OhloIVexomRfQjbKq0wq68SvAFOUKXue7eg7dVCCtxtzTbULGoVGUE9VGYKkDi6dDFkn39IIZuP6g5Eeuai9BXeV84T33N5s85zgs4Ix-p0g7ShLTW61Go6vP7HjYc-DsTs71RKnG1',
    rating: 4.9,
    reviewsCount: 167,
    ingredients: ['Confit de ajo', 'Champiñones silvestres', 'Queso taleggio', 'Tomillo fresco', 'Aceite de trufa blanca']
  },
  // Classic section
  {
    id: 'classic-pepperoni',
    name: 'Pepperoni Tradicional',
    description: 'Salsa de tomate, queso mozzarella abundante y rodajas crujientes de pepperoni clásico.',
    price: 15.00,
    category: 'Clásicas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDboGumUeP5bTFlWIM18v-hHRNXaCMtiNO8oIUWRLyUh7sT6LeBION6D_zxjqgPswG0wMX-vcgqwNImtNSW2ssZzUABMykc_evcHUpK1Pgu96v-Cq9JU7U2HBQ-2jkbTfU_TaWJ4DPP8AYrwudWCvF4cfUPU2U5yEkWKBXCrqZlOIi9iV1ODVYLSB_pHLZDd_UFZnK05UZahLKMNiet4lm-ZsR7BRbxSX6AT9j-ISAeSWZ0UmYQo7syCzS1f2zXZd7inD18oURz8kmy',
    rating: 4.6,
    reviewsCount: 230
  },
  {
    id: 'classic-four-cheese',
    name: 'Cuatro Quesos',
    description: 'Salsa de tomate y una mezcla premium de quesos mozzarella, gorgonzola, parmesano y provolone fresco.',
    price: 16.50,
    category: 'Clásicas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi1m2la_HQcOzob09hYJ9jOGJ4D8OEyIBWFDNcLYbGIQZlCJ28j-ttgiLkbGpJALbEhd2zt4Hp5pJNm-28R_XTUXRkc97bfrOSBvCHGM0lzc2YlzdJbW8CqvkH8OwIZv_OV3TY6obcnaIekZBSg8VwAEYPC0EeKylUs991191KrmbxMsDXO3iLnqKhXzrKAGuLKZdx2QLwzpwmn5stLzwzL-ygfbtq1M_gOEAoMpnA56eSstw11Dr4Nru3Vldj1VseHmc_teX3xWkQ',
    rating: 4.7,
    reviewsCount: 145
  },
  // Sides section
  {
    id: 'truffle-garlic-bread',
    name: 'Truffle Garlic Bread',
    description: 'Pan de ajo rústico tostado a la leña, mantequilla de ajo artesanal, queso fundido y un toque de crema de trufas.',
    price: 11.00,
    category: 'Acompañamientos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM9fDD5E9Yk4UJdj3BvUieHDLOxgPrHP5KM78NJ_5Pf1qnmmk16LcIA-y3gvlpy_q_xBR-cxdrVJIv1T-Q49zxPMLRF1whgo8qrEmV8AHiuON_Bpad1F82zUo71zKPQCIDk6GHzvDIGf8PK6Te2M9ShM4RKCFdglNMokfM4v08M7CsfzN4AnyCzKHW7tXDPX90_btc3QTNBXoJnDrhxtzyKPuEObqI0Uy_ILKHcjD2fBCsIFy7feLZJFazoufbPCUFJGxi914GLvrX',
    rating: 4.8,
    reviewsCount: 88
  },
  {
    id: 'palitroques-papas',
    name: 'Palitroques Rústicos',
    description: 'Bastones de masa tierna horneados con especias italianas, parmesano y acompañados de salsa marinara.',
    price: 8.00,
    category: 'Acompañamientos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM9fDD5E9Yk4UJdj3BvUieHDLOxgPrHP5KM78NJ_5Pf1qnmmk16LcIA-y3gvlpy_q_xBR-cxdrVJIv1T-Q49zxPMLRF1whgo8qrEmV8AHiuON_Bpad1F82zUo71zKPQCIDk6GHzvDIGf8PK6Te2M9ShM4RKCFdglNMokfM4v08M7CsfzN4AnyCzKHW7tXDPX90_btc3QTNBXoJnDrhxtzyKPuEObqI0Uy_ILKHcjD2fBCsIFy7feLZJFazoufbPCUFJGxi914GLvrX',
    rating: 4.5,
    reviewsCount: 54
  },
  // Drinks section
  {
    id: 'refresco-1l',
    name: 'Refresco Familiar 1L',
    description: 'Refrescos helados de un litro a tu elección para acompañar tus pizzas.',
    price: 4.00,
    category: 'Bebidas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqIQEARq9syHxA1_noQfGaDZScxVwqN7VoaP9BqPUMSpirtH2tY3Iw-x8gUpSd4qGFSngCdrtM5Rd63u_synpaQAz5vzogqFyr97mMNFcziuE6ZfWyKwEn34Mkgot1tnqH1u3PnydhMcRRck3gfoMJL60d2ioIIzaKtPyyVkNfzneU7lxLR3XVpfOVcKsLz4fJfsdAuwZBm3ALEDIGFbA7vqNwGEQzeSuppZUdcnw-diMs1O5buhgEjt0barf-CZCluvUL8TE-dBxz',
    rating: 4.9,
    reviewsCount: 420
  },
  // Dessert section
  {
    id: 'torta-chocolate',
    name: 'Torta Fudge de Chocolate',
    description: 'Deliciosa torta blanda de chocolate con bizcocho húmedo, fudge de chocolate belga y migas crujientes.',
    price: 6.50,
    category: 'Postres',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6T-7RgQKufeP-BviWUh3mEkMtdxhbRnYk2Aj4K-2ib59ZW3B749yXCW8JR32Dy6-HSVoJ1QQaWO_2sqn58soZTHcV9Yu9z_y5S_Ts9wJqORoxsmrH1hIZge7J5kKUdhoNLFRdUJynvv3td-WBax2Rh1ErehM_zgg6_XmMqWy3mbZTqz6_ng9k_yFMKYvvV8RCF7d0zACUhiUDPQ3T6C0Vt4ldp-k0Xa6A4C23LG9m7zRX50dIGQyXpHs4mJ1d_gt6NCRabHEwx5Lt',
    rating: 4.8,
    reviewsCount: 76
  }
];

export const REWARDS: Reward[] = [
  {
    id: 'rew_acompanamiento',
    name: 'Acompañamiento Gratis',
    description: 'Elige entre palitroques o papas rústicas.',
    pointsCost: 300,
    icon: 'Pizza'
  },
  {
    id: 'rew_bebida',
    name: 'Bebida Gratis',
    description: 'Refresco de 1 litro de tu elección.',
    pointsCost: 150,
    icon: 'CupSoda'
  },
  {
    id: 'rew_fifty_off',
    name: '50% Off Pizza',
    description: 'Descuento en cualquier pizza grande.',
    pointsCost: 800,
    icon: 'Percent',
    premium: true
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: 'ben_envio',
    name: 'Envío Gratis Prioritario',
    description: 'En todos tus pedidos mayores a $15',
    icon: 'Bike'
  },
  {
    id: 'ben_cumple',
    name: 'Regalo de Cumpleaños',
    description: 'Una pizza mediana gratis en tu mes',
    icon: 'Gift'
  },
  {
    id: 'ben_doble',
    name: 'Doble Puntuación',
    description: 'Los martes y jueves acumulas doble',
    icon: 'Star'
  }
];

export const EXTRAS: ExtraTopping[] = [
  { id: 'ext_queso', name: 'Extra Queso', price: 2.00 },
  { id: 'ext_trufa', name: 'Aceite de Trufa', price: 3.50 },
  { id: 'ext_hongos', name: 'Champiñones Frescos', price: 1.50 }
];
