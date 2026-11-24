# FruitWise — Interactive Scroll-Driven 3D Fruit Nutrition Experience

A production-grade, scroll-driven interactive fruit nutrition web experience inspired by Apple's product showcase pages. Built with React, TypeScript, Tailwind CSS, GSAP ScrollTrigger, and Lenis smooth scrolling.

---

## ✨ Features

- **Multi-Fruit Collection & Explosion**:
  - Starts with a cinematic high-resolution cluster of botanical fruits.
  - Smooth scroll scrubbing triggers a fruit explosion separating into floating orbits with independent depth, rotation, and parallax.

- **Continuous 3D Fruit Sequences**:
  - **Orange (120 frames)**: Whole orange falls, impacts, bursts open with high-speed juice splash, settling into freshly poured juice.
  - **Blueberry (178 frames)**: Rich indigo berry descent, ground impact, and vibrant cellular splash.
  - **Pomegranate (238 frames)**: Ruby jewel pomegranate falling, cracking upon impact, bursting arils and segments in high-speed motion.

- **Floating Nutrition Facts HUD**:
  - Overlaid directly on the 3D canvas during the settle phase of each fruit.
  - Features real laboratory assays: primary phytochemical powerhouses (e.g. *Ascorbic Acid*, *Anthocyanins*, *Punicalagins & Punicic Acid*), circular DV gauges, and macro/micronutrient breakdown cards.

- **Seamless Visual Cohesion**:
  - Zero visible canvas seams with studio backdrop matching (`#073B3A` for Multi-Fruit, `#133234` for Orange, `#121b28` for Blueberry, `#8ca88f` for Pomegranate).
  - All watermark artifacts permanently and seamlessly patched.

- **Direct Routes & Continuous Mode**:
  - Continuous exploration on `/`.
  - Dedicated fruit pages: `/orange`, `/blueberry`, `/pomegranate`.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animation & Motion**: GSAP 3 + ScrollTrigger
- **Smooth Scrolling**: Lenis (`@studio-freight/lenis`) synchronized with GSAP ticker
- **Rendering**: HTML5 Canvas with DPR capping (2x) and `requestAnimationFrame` lerp interpolation
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open `http://localhost:5173` to explore.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📄 License
MIT
