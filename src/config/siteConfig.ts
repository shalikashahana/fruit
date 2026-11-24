export const SITE_CONFIG = {
  FRAME_COUNT: 120,
  FRAME_PATH: (index: number) => `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`,
  SCROLL_HEIGHT: '500vh',
  LERP: 0.12,
  
  // Watermark patch parameters (in normalized coordinates 0-1 of the 1280x720 frame)
  // Watermark is located at x: ~88.7%-95.5%, y: ~79.8%-90.5%
  WATERMARK_PATCH: {
    x: 0.885,
    y: 0.795,
    width: 0.070,
    height: 0.115,
    color: '#0e393f',
    edgeBlend: true,
  },

  THEME: {
    tealBase: '#133234',
    tealDark: '#0d2527',
    tealDeep: '#081719',
    orangeBrand: '#FF8A1F',
    orangeLight: '#FFAA4D',
    cream: '#FFF4E0',
    creamMuted: '#D8CEBE',
  },

  NUTRITION_PER_100G: [
    { label: 'Calories', value: 47, unit: 'kcal', dailyPercent: 2, icon: 'Flame', color: '#FF8A1F' },
    { label: 'Vitamin C', value: 53, unit: 'mg', dailyPercent: 59, icon: 'ShieldCheck', color: '#FFAA4D' },
    { label: 'Dietary Fiber', value: 2.4, unit: 'g', dailyPercent: 9, icon: 'Activity', color: '#38BDF8' },
    { label: 'Sugars', value: 9.4, unit: 'g', dailyPercent: 19, icon: 'Sparkles', color: '#F472B6' },
    { label: 'Carbohydrates', value: 11.8, unit: 'g', dailyPercent: 4, icon: 'Zap', color: '#FBBF24' },
    { label: 'Potassium', value: 181, unit: 'mg', dailyPercent: 5, icon: 'Heart', color: '#34D399' },
    { label: 'Folate', value: 30, unit: 'mcg', dailyPercent: 8, icon: 'Dna', color: '#A78BFA' },
    { label: 'Protein', value: 0.9, unit: 'g', dailyPercent: 2, icon: 'Target', color: '#60A5FA' },
  ],

  HEALTH_BENEFITS: [
    {
      title: 'Immune Fortress',
      nutrient: 'Vitamin C (Ascorbic Acid)',
      description: 'Strengthens white blood cell defenses and shields cellular structures against oxidative stress, keeping seasonal fatigue at bay.',
      icon: 'Shield',
      badge: 'High Potency',
    },
    {
      title: 'Cardiovascular Vitality',
      nutrient: 'Potassium, Fiber & Hesperidin',
      description: 'Supports healthy arterial flexibility and balanced blood pressure with bioflavonoids and cholesterol-binding soluble pectins.',
      icon: 'HeartPulse',
      badge: 'Heart Smart',
    },
    {
      title: 'Radiant Skin Matrix',
      nutrient: 'Bio-available Collagen Boost',
      description: 'Vitamin C serves as an indispensable enzymatic co-factor for collagen synthesis, preserving firmness, tone, and cellular moisture.',
      icon: 'Sparkle',
      badge: 'Dermal Glow',
    },
    {
      title: 'Harmonious Digestion',
      nutrient: 'Soluble & Insoluble Pectin',
      description: 'Fuels the beneficial gut microbiome while gently regulating peristalsis and sustaining comfortable, lasting metabolic energy.',
      icon: 'Leaf',
      badge: 'Gut Health',
    },
  ],

  ENJOY_METHODS: [
    {
      title: 'The Whole Fruit',
      subtitle: 'The Gold Standard',
      description: 'Eating the orange in sections delivers the complete natural pectin matrix. The fibrous pith holds rich bioflavonoids that moderate sugar absorption.',
      tag: 'Best Fiber & Satiety',
      features: ['100% natural fiber retained', 'Lower glycemic index impact', 'Includes active hesperidin in white pith'],
      recommended: true,
    },
    {
      title: 'Freshly Squeezed Juice',
      subtitle: 'Instant Vitamin Infusion',
      description: 'A rapid rush of vitamin C and invigorating hydration. Drink immediately after pressing to prevent oxidation from degrading ascorbic acid.',
      tag: 'Peak Hydration',
      features: ['Rapid vitamin assimilation', 'Zero artificial additives', 'Gentle on delicate digestion'],
      note: 'Whole oranges provide significantly more dietary fiber than pressed juice.',
      recommended: false,
    },
    {
      title: 'Zest & Infusions',
      subtitle: 'Aromatic Essential Oils',
      description: 'The colored outer peel is loaded with concentrated limonene and antioxidant polyphenols. Microplane over salads, dressings, or herbal teas.',
      tag: 'Culinary Accent',
      features: ['Concentrated d-limonene aroma', 'Zero sugar, intense citrus taste', 'Elevates vinaigrettes & desserts'],
      recommended: false,
    },
  ],

  COMING_SOON: [
    { name: 'Crisp Apple', status: 'In Nutrition Lab', focus: 'Quercetin & Polyphenols', color: '#EF4444' },
    { name: 'Alphonso Mango', status: 'Formulating', focus: 'Vitamin A & Beta-Carotene', color: '#F59E0B' },
    { name: 'Cavendish Banana', status: 'Coming Q2', focus: 'Electrolytes & Vitamin B6', color: '#EAB308' },
    { name: 'Wild Pomegranate', status: 'Coming Q2', focus: 'Punicalagins & Ellagic Acid', color: '#BE123C' },
  ],
};
