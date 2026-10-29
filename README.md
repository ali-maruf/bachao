# Bachao (বাঁচাও)

"Save good food. Pay less." A surplus-food marketplace for Dhaka: bakeries, sweet shops and restaurants sell unsold end-of-day food as discounted Surprise Bags.

- [`DESIGN.md`](DESIGN.md) is the MVP design spec: brand directions, IA, flows, design system, screen specs, bilingual microcopy and riskiest assumptions.
- [`prototype/`](prototype/) is a static, dependency-free bilingual prototype:
  - `index.html` is the marketing home page
  - `app.html` holds the buyer app screens (Discover list/map, Bag detail, Checkout with OTP, pickup ticket, plus empty, offline and payment-failed states via "Prototype states")
  - `assets/tokens.css` holds the design tokens and components
  - `assets/common.js` holds the i18n, icons, mock data and demo clock

## Run locally

```bash
python3 -m http.server 4321 --directory prototype
```

Then open http://localhost:4321. The demo clock starts at 7:40 PM Dhaka time so pickup windows make sense. All shops are fictional.
