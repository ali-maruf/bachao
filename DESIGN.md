# Bachao (বাঁচাও) — MVP Design Spec

"Save good food. Pay less." · "ভালো খাবার বাঁচান। কম দামে।"

Status: pre-launch MVP · Pilot: 20–30 shops in Dhanmondi, Mohammadpur, Gulshan · Prototype: [`prototype/`](prototype/)

---

## 1. Brand strategy

### Positioning
Bachao is the evening ritual of picking up something good from your neighbourhood shop for less. It is **not** a clearance bin. Every brand decision tests against one question: *would a proud mishti-shop owner be happy to see their name next to this?*

Three jobs for the brand:
1. **Partners:** make listing feel like hospitality ("reaching new customers", "nothing goes to waste"), never discounting.
2. **Buyers:** look trustworthy at a glance (licences, best-before times, real photos) before it looks fun.
3. **Habit:** small, warm rewards (meals saved, streaks) that feel like a neighbourhood thank-you, not a guilt trip.

### Direction A — "Mishti Dokan" (recommended)
| | |
|---|---|
| Personality | Warm · Honest · Generous |
| Idea | The glass-fronted sweet shop at 9 PM: trays, paper boxes tied with string, a shopkeeper who knows you. |
| Primary | **Kalojam** `#7A1F3D` (deep maroon of kalojam / roshogolla syrup) — buttons, links, brand |
| Primary hover / pressed | `#651733` / `#4F1128` |
| Secondary | **Haldi** `#F4B63F` (turmeric) — highlights, savings price, streaks. Always with dark text. |
| Ink | `#2B1A1F` (warm near-black) · muted `#6E5A5F` |
| Surface | **Doi** `#FFFBF4` (yogurt white) · card `#FFFFFF` · sunken `#F6EEE3` · line `#E8DCCD` |
| Success | **Lau-pata** `#2F7D4F` (bottle-gourd leaf) · bg `#E5F3EA` |
| Warning | `#8A5300` text on `#FFF0D4` (used for "best before soon") |
| Error | `#B3261E` · bg `#FDE8E6` |
| Dark mode | bg `#1A1114` · card `#25191D` · sunken `#2F2126` · line `#3D2B31` · ink `#F7ECE6` · muted `#BFA9AE` · primary `#F08DAA` (on dark, primary inverts to a rose that passes AA on `#1A1114`) · haldi `#F6C25E` · success `#6FCB93` · warning `#F2B45A` · error `#FF8A80` |
| Type | Display: **Baloo Da 2** 600/700 (rounded, has full Bangla + Latin in one family, friendly without being childish). Body: **Hind Siliguri** 400/500/600 (best-in-class Bangla readability on Android, solid Latin). One display family + one body family keeps first load small (~90 KB woff2, subset). |
| Logo | Lowercase wordmark **bachao** in Baloo Da 2 Bold; the Bangla lockup **বাঁচাও** uses the *chandrabindu* (ঁ) as the mark: the dot-and-crescent becomes a paper bag's handle over a bag-shaped "o". The standalone app icon is that bag-with-handle on kalojam. Works at 16 px. |
| Photography | Real, unstyled, warm-lit photos from partner shops: trays of mishti, stacks of paratha, a cut cake, a handi of biryani, bread in paper. Shot on phones at the counter, 4:3, slight top-down. No stock photos, no white-sweep studio shots. Every photo labelled "Typical contents". |
| Illustration | Minimal: flat two-colour spot illustrations (kalojam + haldi) in the style of paper-box printing / shop-sign lettering, used only for empty states and onboarding. |
| Icons | 2 px rounded stroke, 24 px grid (Lucide-compatible). Filled variant only for active nav. |
| Voice | Like a friendly shopkeeper: warm, direct, a little playful. We say "grab", "tonight", "your bag". We never say "leftovers", "expired", "clearance", "waste" in buyer-facing headlines. |
| Sample | EN: "Tonight's mishti, half the price." · BN: "আজ রাতের মিষ্টি, অর্ধেক দামে।" |

### Direction B — "Rickshaw Night"
| | |
|---|---|
| Personality | Bold · Quick · Street-smart |
| Idea | Rickshaw-art colour and Dhaka night energy: neon signs, hand-painted type. |
| Palette | Primary Teal Night `#0F4C5C` · Secondary Mango `#FFB000` · Accent Rickshaw Pink `#E0457B` · Surface `#FFFFFF` · Success `#1F8A4C` · Warning `#B86E00` · Error `#C62828` · Dark bg `#0B1E24` |
| Type | Display: Galada (Bangla script) + Poppins; Body: Noto Sans Bengali + Poppins |
| Logo | Hand-lettered "Bachao" with rickshaw-art flourishes and a heart-shaped bag. |
| Photo | High-contrast night shots, motion blur, neon. |
| Voice | Punchy, meme-adjacent. EN "Dinner heist. ৳120. Legal." · BN "রাতের খাবার ডাকাতি। ১২০ টাকায়। পুরোপুরি বৈধ।" |

### Recommendation: Direction A, "Mishti Dokan"
- **It answers the supply risk directly.** Shop owners fear looking cheap. A maroon-and-turmeric brand that looks like *their* paper boxes reads premium-traditional. Rickshaw art reads cheap-fun, which is the exact association partners are afraid of.
- **Trust beats flash for hygiene anxiety.** Direction B's energy undermines "is this food safe?".
- **It's ownable.** Food-tech in the region is either green-leaf eco or red-and-white delivery. Maroon + turmeric belongs to no competitor.
- **It's cheap to load.** One Bangla+Latin display family and one body family.
- Keep a little of B: rickshaw pink can appear once a year in campaign work (Pohela Boishakh), never in product UI.

---

## 2. Information architecture

```
bachao.com.bd (marketing, SSR/static, Bangla + English via /bn /en)
├── /                  Home
├── /partners          For Partners (+ earnings calculator, sign-up form)
├── /trust             How it works · Trust & Safety · Refund policy
├── /about             About · Impact · Team
├── /blog              Blog/Press index → /blog/:slug
├── /faq               (anchored section on Home + full page)
└── /legal/{terms,privacy}

app.bachao.com.bd (buyer PWA)
├── /welcome           Onboarding: language → location → phone/OTP (deferred until checkout)
├── /discover          List ⇄ Map, filters, sort
├── /bag/:id           Bag detail
├── /checkout/:id      Checkout
├── /order/:id         Confirmation + pickup ticket (QR / 4-digit code)
├── /order/:id/review  Rate & review
├── /favourites
└── /me                Profile: orders, impact, notifications, language, help
   Bottom nav: Discover · Favourites · Orders · Me

partner.bachao.com.bd (partner PWA, one-handed)
├── /onboarding        Shop → Licence → Payout → Hours → Photos
├── /today             Big "List today's bags" + live status
├── /orders            Tonight's reservations, scan/enter code
├── /earnings          Daily/weekly payouts, commission, food saved
└── /more              Reviews · Support · Settings
   Bottom nav: Today · Orders · Earnings · More

admin.bachao.com.bd (desktop)
├── Overview (analytics)   ├── Partner approvals   ├── Orders (live)
├── Disputes & refunds     ├── Payouts             └── Settings / staff
```

**Login deferral:** buyers browse without an account. Phone + OTP is asked at checkout, not at launch: fewer drop-offs before they've seen a single bag.

---

## 3. Key flows

### 3.1 Buyer: first order (target: under 2 minutes, 7 taps)
1. Lands on home or opens shared link → taps **Find bags near you**.
2. Language (auto-detected from device, one-tap switch) → location prompt with plain explanation. **Denied/unavailable → area picker** (Dhanmondi, Mohammadpur, Gulshan, …) — never a dead end.
3. Discover list, sorted **Pickup soon**. Cards show price, pickup window, distance, best-before, bags left.
4. Taps bag → Bag detail. Trust block above the fold: licence badge, rating, best-before, typical-contents photos.
5. **Reserve** → Checkout. Not logged in? Bottom sheet: phone → OTP (auto-read on Android via WebOTP) → back to checkout with state kept.
6. Picks bKash (default) / Nagad / card / **Pay at pickup (first order only)** with no-show rule shown inline.
7. Pays (bKash redirect + return) → Confirmation: 4-digit code + QR, countdown, directions, call shop. Push/SMS reminder 30 min before window.
8. After window closes + 15 min → review prompt (3 taps).

Failure branches: payment failed (nothing charged, retry/switch method, bag held for 5 min), sold out during checkout (offer 3 similar nearby), shop cancels (auto-refund + notification + ৳30 credit).

### 3.2 Partner: first listing (target: under 60 seconds)
1. Opens partner app → **Today** screen. One big button: **List today's bags**.
2. Bottom sheet with smart defaults from onboarding: Category (pre-filled), **Quantity stepper** (−/+, default 5), **Price** chips (৳120 · ৳150 · ৳200 · custom) with "worth at least ৳X" auto-calculated at 3×, **Pickup window** (default from hours, e.g. 8:30–9:30 PM), **Best before** (default "Tonight 11 PM").
3. **Publish** → confirmation "5 bags are live. We'll buzz you when someone reserves."
4. Next day: card at the top — **Repeat yesterday (5 × ৳150, 8:30–9:30)** — one tap.
No photo upload needed per listing; shop's "typical contents" photos come from onboarding.

### 3.3 Pickup handoff (target: under 15 seconds at the counter)
1. Buyer opens order → ticket shows **large 4-digit code + QR**, brightness hint, name.
2. Staff opens **Orders** → tonight's list (name + code visible). Either tap **Scan** (camera) or type 4 digits on a giant keypad, or simply tap the buyer's row → **Mark collected**.
3. Both screens flip to green "Collected ✓" (with text, not colour alone). Buyer gets review prompt later.
4. No-show: at window end + 15 min the order auto-marks "Not collected"; shop keeps the payout; pay-at-pickup buyer loses pay-at-pickup eligibility (shown at checkout).

---

## 4. Design system

### 4.1 Tokens (implemented in [`prototype/assets/tokens.css`](prototype/assets/tokens.css))
**Colour:** see Direction A table. Semantic tokens: `--bg --surface --sunken --line --ink --muted --primary --primary-ink --haldi --haldi-ink --success --success-bg --warn --warn-bg --error --error-bg --focus`.

**Type scale** (mobile → desktop; Bangla gets +8% line-height via `:lang(bn)`):
| Token | Size/line | Use |
|---|---|---|
| display | 36/42 → 56/62, Baloo 700 | Hero |
| h1 | 28/34 → 40/46, Baloo 700 | Page titles |
| h2 | 22/28 → 30/36, Baloo 600 | Sections |
| h3 | 18/24, Baloo 600 | Card titles |
| body | 16/24, Hind 400 | Default (never below 16 px on inputs: prevents iOS zoom) |
| small | 14/20, Hind 500 | Meta |
| micro | 12/16, Hind 600, +0.04em caps (EN only; no caps in Bangla) | Badges |

**Spacing (8-pt grid):** `--s1 4 · --s2 8 · --s3 12 · --s4 16 · --s5 24 · --s6 32 · --s7 48 · --s8 64 · --s9 96`. 4 is allowed only inside components.
**Radius:** `--r-sm 6` (badges) · `--r-md 12` (inputs, buttons) · `--r-lg 18` (cards, sheets) · `--r-pill 999` (chips).
**Shadow:** `--sh-1 0 1px 2px rgb(43 26 31 / .08)` (cards) · `--sh-2 0 6px 20px rgb(43 26 31 / .12)` (sheets, sticky bars) · dark mode uses borders instead of shadows.
**Motion:** `--t-fast 120ms` (press) · `--t-base 200ms` (chips, toggles) · `--t-slow 320ms` (sheets) · easing `cubic-bezier(.2,.8,.2,1)`. All disabled under `prefers-reduced-motion`.
**Tap targets:** min 44×44 px; primary buttons 52 px tall on mobile.
**Breakpoints:** 360 base · 600 (large phone/small tablet) · 900 (tablet/desktop: two-column) · 1200 (max content 1160 px).

### 4.2 Components (states: default · hover · pressed · focus-visible · disabled · loading · error where relevant)
| Component | Notes |
|---|---|
| Button | primary (kalojam), secondary (outline), haldi (savings CTA), ghost, danger. Loading = spinner + label kept ("Paying…"). |
| Input / Select | 52 px, label above (never placeholder-only), helper + error text below with icon. |
| OTP field | 6 boxes, `autocomplete="one-time-code"`, paste fills all, auto-advance, resend timer "Resend in 0:28". |
| Chips / filters | Toggle chips with check icon when on (not colour-only). Horizontal scroll on mobile. |
| Bag card | photo 4:3 with bags-left badge, shop + rating, pickup window, distance, best-before, price (strikethrough + savings %), favourite heart. |
| Shop card | logo, name, area, rating, "Verified licence", favourites count, "Notify me" bell. |
| Rating | 5 stars + numeric "4.7 (212)". Input variant with 44 px stars. |
| Badges | Best-before (clock icon; warn style if < 3 h), Hygiene verified (shield-check), Bags left ("3 left"; error style at 1), Halal (crescent), New partner. |
| Price | `৳150` large + `৳450` strikethrough + "Save 67%" haldi pill. Screen reader: "150 taka, was 450". |
| Countdown | "Pickup opens in 1h 12m" → "Pickup open · closes in 38m" → "Closed". Live region polite, updates per minute. |
| QR pickup ticket | QR + 4-digit code in 48 px Baloo, order number, shop, window, "Show this at the counter". Torn-ticket edge. |
| Bottom nav | 4 items, icon + label always. Active = filled icon + kalojam label + top indicator. |
| Map pin | Price label pin (৳150); selected = enlarged + kalojam; sold out = grey with strike. Cluster pins with counts. |
| Toast | Bottom, above nav, 4 s, with action ("Undo"). Role=status. |
| Modal / bottom sheet | Sheet on mobile, centred dialog ≥ 900 px. Drag handle, close button, focus trap. |
| Empty states | Spot illustration + one-line cause + one action. |
| Skeleton | Card-shaped shimmer (static under reduced motion). Shown after 300 ms only, to avoid flicker. |

---

## 5. Screens

> Prototype covers: Marketing Home, Discover (list + map), Bag detail, Checkout, Confirmation/pickup ticket, plus empty / payment-failed / sold-out states. Everything else is specified below.

### A. Marketing site
**A1 Home** (built) — Header: logo, nav (How it works, For partners, About), EN/বাং toggle, "Open app". Hero: headline, subhead, location input + "Find bags" button + "Use my location" link; a ticket-style sample bag card on the right (desktop) / below (mobile). Live counter strip (meals saved, partner shops, kg food saved, CO₂e). How it works (3 steps, real sequence). Tonight's shops (horizontal scroll on mobile, 3-col desktop). What buyers say (3 quotes with area + first name). Partner CTA band (kalojam bg). Install PWA card (Add to home screen, 300 KB, works on slow data). FAQ (accordion, `<details>`). Footer (links, language, bKash/Nagad logos placeholders, trade licence no.).

**A2 For Partners** — Hero: "Your good food, a few more happy customers." + "Become a partner (free)". Benefits row: New customers · Nothing goes in the bin · Paid every week · Zero upfront cost. **Earnings calculator**: sliders for bags/day (1–20) and price (৳100–৳400) → monthly payout after commission (e.g. 5 bags × ৳150 × 26 days × 82% = **৳15,990/month**), plus "≈ 130 kg food rescued". 3-step onboarding (Sign up → We visit & verify → List in 60 seconds). Partner testimonial with shop photo. "How your brand appears" — a preview of their shop card, making the point that Bachao shows "Surprise Bag", never "discount". Sign-up form: shop name, owner name, phone, area (select), category, best time to call. FAQ: "Will this cheapen my brand?", "Who sets the price?", "What if no one buys?".

**A3 How it works / Trust & Safety** — What's in a Surprise Bag (photos of 4 real past bags per category, "worth at least 3× what you pay"). Hygiene standards: trade licence verified, BFSA registration where applicable, best-before set by shop and capped at end of day, no reheated-twice items, partner checklist. Pickup window rules. Refund policy table: shop cancels → full refund + credit; food unsafe/inedible → photo within 2 h → refund; disliked contents → no refund (it's a surprise) but feedback reaches shop; no-show → no refund.

**A4 About / Impact** — Mission paragraph; Bangladesh food-waste stats (UNEP Food Waste Index 2021: ~82 kg household food waste per person per year in Bangladesh — cite and update yearly); our counter; team cards (3 founders, photo, one line each); press kit link.

**A5 Blog/Press** — Index: cards with cover, category tag (Stories, Partners, Press), date, read time. Article: 680 px column, Bangla 18/32, share buttons (Facebook, WhatsApp, copy link), "Find bags near you" end CTA.

### B. Buyer app
**B1 Onboarding** — (1) Language: two big cards "বাংলা" / "English", device language pre-selected. (2) Location: illustration + "We use your location only to show shops near you." Buttons: "Allow location" / "Choose my area" → searchable area list grouped by city. (3) Phone + OTP — at first checkout: +880 prefix fixed, 10-digit field, "We'll send a 6-digit code by SMS". OTP screen with timer, auto-fill, "Change number".

**B2 Discover** (built) — Sticky top: area selector ("Dhanmondi ▾"), search icon. Segmented **List | Map**. Filter chips row: Pickup now, Bakery, Sweets, Meals, Grocery, Halal, ≤ ৳150, plus "Filters" opening a sheet (distance slider 1–10 km, pickup time range, price range, category, halal). Sort: Pickup soon (default) · Nearest · Cheapest · Top rated. Results count. Map: price pins + selected-bag mini-card at bottom. Desktop: list (2 columns) + sticky map side-by-side.

**B3 Bag card** (built) — described in components.

**B4 Bag detail** (built) — Photo carousel ("Typical contents" label). Shop name, rating, verified licence badge, halal. Price block + bags left. Pickup window + countdown + best-before. "What to expect" (category, estimated items, "worth at least ৳450"). Allergens (chips: gluten, dairy, nuts, egg — "Ask the shop if unsure"). Pickup instructions (from shop: "Show code at the left counter"). Map snippet + address + "Get directions". Hygiene: licence number, last verified date. Reviews: score breakdown (Quality, Quantity, Staff) + 3 latest. Sticky bottom bar: price + **Reserve**. Favourite + "Notify me when they list" toggle.

**B5 Checkout** (built) — Order summary (shop, window, best-before). Quantity stepper (max = min(bags left, 3)). Payment: bKash (default, last used), Nagad, Card, Pay at pickup (first order only, with the rule: "If you don't pick up, you'll need to pay online for future orders"). Price breakdown (bag × qty, no service fee for MVP). Agreement line: "Surprise Bags are non-refundable unless the shop cancels or the food is unsafe." Sticky **Pay ৳150 with bKash**. States: paying, failed, sold out.

**B6 Confirmation + pickup** (built) — Success header, ticket (QR + 4-digit code), countdown, shop + address, Get directions, Call shop, "Add reminder", Cancel (free until 2 h before window). Brightness tip.

**B7 Rate & review** — Bottom sheet: overall stars (big), then three quick rows Food quality / Quantity / Staff (1–5 tappable faces with labels), optional photo + comment, Submit. Takes ≤ 10 s.

**B8 Profile** — Header with name + impact card ("You saved 12 meals ≈ 30 kg CO₂e" + streak "4 weeks in a row"). Rows: Orders, Favourites & alerts, Payment methods, Notifications, Language (বাংলা/English switch), Help & refunds, Invite friends (৳50 credit), Log out.

**B9 Empty / error / edge** — No bags nearby (built: widen radius / notify me), Sold out (built: similar bags), Payment failed (built), Shop cancelled (refund timeline), Offline (banner "You're offline. Showing bags from 8:12 PM." + cached list, Reserve disabled with reason), Location denied (area picker), OTP wrong (inline error, 5 tries then 15-min cooldown).

### C. Partner dashboard (one-handed: all primary actions in bottom 40% of screen, 56 px buttons, 18 px body)
**C1 Onboarding** — 5 short steps with progress "2 of 5": Shop (name, category, address pin), Trade licence (photo upload; "We'll verify within 24 h"), Payout (bKash merchant/personal number or bank), Opening hours (presets), Photos (3 typical-contents shots with in-app guide: "Shoot from above, near a window"). Can save & continue later. Field team can complete it on the owner's phone during a visit.

**C2 Today** — Greeting + date. Status card: "Not listed yet today". Giant **List today's bags** button; under it **Repeat yesterday · 5 × ৳150 · 8:30–9:30 PM**. Once live: "3 of 5 reserved", progress, buttons "Add 1 more" / "Pause listing". Tip of the day.

**C3 Orders** — Tonight's reservations: buyer first name, code, qty, status (Reserved / Collected / Not collected). Floating **Scan code** button; "Enter code" opens a 4-digit keypad at thumb height. Confirmation full-screen green with "Collected · Rafi · 1 bag".

**C4 Earnings** — This week payout (big), next payout date (every Tuesday to bKash), table per day: bags sold × price = gross, − commission 18%, = net. Food saved (kg) for the shop, shareable badge for their Facebook page ("We saved 120 meals with Bachao").

**C5 Reviews & support** — Average + recent reviews (reply possible), WhatsApp support button, call field rep, FAQ.

### D. Admin panel (desktop, ≥ 1200 px, dense tables)
Left nav: Overview, Partners, Orders, Disputes, Payouts, Settings.
- **Overview:** KPI tiles (GMV, bags sold, sell-through = sold/listed, repeat buyers % (2+ orders in 30 d), no-show %), 30-day trend charts, area breakdown.
- **Partner approvals:** queue table (shop, area, submitted, licence image preview, map pin) → detail drawer with Approve / Request changes / Reject (reason required).
- **Orders:** live table with filters (status, area, shop), search by code/phone.
- **Disputes & refunds:** ticket list with buyer photo evidence, shop response, actions: full/partial refund, credit, warn shop.
- **Payouts:** weekly batch per partner, export CSV for bKash bulk disbursement, mark paid, failed retries.

---

## 6. Bilingual microcopy

| Moment | English | বাংলা |
|---|---|---|
| Hero headline | Tonight's mishti, half the price. | আজ রাতের মিষ্টি, অর্ধেক দামে। |
| Hero subhead | Bakeries, sweet shops and restaurants near you sell their unsold food in Surprise Bags at 50–70% off. Reserve in the app, pick up tonight. | আপনার আশেপাশের বেকারি, মিষ্টির দোকান আর রেস্টুরেন্ট দিনের শেষে না-বিক্রি হওয়া খাবার সারপ্রাইজ ব্যাগে ৫০–৭০% কম দামে দেয়। অ্যাপে রিজার্ভ করুন, আজ রাতেই নিয়ে যান। |
| Location CTA | Find bags near you | কাছাকাছি ব্যাগ খুঁজুন |
| Partner pitch | Your good food, a few more happy customers. Reach new regulars at the end of every day. Zero upfront cost. | আপনার ভালো খাবার, আরও কিছু খুশি ক্রেতা। প্রতিদিন দিনের শেষে নতুন নিয়মিত ক্রেতা পান। কোনো আগাম খরচ নেই। |
| Empty: no bags | Nothing nearby right now. Most shops list after 6 PM. Want a ping when they do? | এই মুহূর্তে কাছাকাছি কিছু নেই। বেশিরভাগ দোকান সন্ধ্যা ৬টার পর ব্যাগ দেয়। দিলেই জানিয়ে দেব? |
| Empty: sold out | All gone! These shops nearby still have bags. | সব শেষ! কাছের এই দোকানগুলোতে এখনও ব্যাগ আছে। |
| Payment failed | bKash payment didn't go through. No money was taken. Try again or pick another method. | বিকাশ পেমেন্ট হয়নি। আপনার কোনো টাকা কাটা হয়নি। আবার চেষ্টা করুন বা অন্য পদ্ধতি বেছে নিন। |
| Pay at pickup rule | First order only. If you don't pick up, future orders must be paid online. | শুধু প্রথম অর্ডারে। না নিতে এলে পরের অর্ডারগুলো অনলাইনে পেমেন্ট করতে হবে। |
| Pickup reminder (push) | Your bag at Moyna Bakery is ready from 8:30. Show code 4821 at the counter. | ময়না বেকারিতে আপনার ব্যাগ ৮:৩০ থেকে তৈরি। কাউন্টারে কোড ৪৮২১ দেখান। |
| Shop cancelled | Moyna Bakery had to cancel tonight's bag. Your ৳150 is on its way back to bKash (within 24 h), plus ৳30 credit from us. | ময়না বেকারি আজ রাতের ব্যাগটি বাতিল করেছে। আপনার ৳১৫০ ২৪ ঘণ্টার মধ্যে বিকাশে ফেরত যাবে, সাথে আমাদের পক্ষ থেকে ৳৩০ ক্রেডিট। |
| Buyer cancels | Cancel this bag? You'll get a full refund. Someone else gets to save it. | ব্যাগটি বাতিল করবেন? পুরো টাকা ফেরত পাবেন, আর অন্য কেউ এটা নিতে পারবে। |
| Review prompt | How was your bag from Moyna Bakery? 10 seconds, and it helps the next person. | ময়না বেকারির ব্যাগ কেমন ছিল? মাত্র ১০ সেকেন্ড, পরের জনের কাজে লাগবে। |
| Impact | You've saved 12 meals. That's about 30 kg CO₂e kept out of the air. | আপনি ১২ বেলার খাবার বাঁচিয়েছেন। প্রায় ৩০ কেজি কার্বন নিঃসরণ কম হলো। |
| Partner: listed | 5 bags are live. We'll buzz you when someone reserves. | ৫টি ব্যাগ এখন লাইভ। কেউ রিজার্ভ করলেই জানিয়ে দেব। |
| Offline | You're offline. Showing bags from 8:12 PM. | আপনি অফলাইনে আছেন। রাত ৮:১২-এর তথ্য দেখানো হচ্ছে। |

Copy rules: Bangla uses Bangla numerals (০–৯) and "টাকা"/৳ consistently; times use "রাত ৮:৩০" not "PM". Never machine-translate: every string is written by a native writer and tested on 360 px (Bangla runs ~20–30% longer).

---

## 7. Five riskiest assumptions and how to test them before building

| # | Assumption | Test (2–3 weeks, < ৳50k) | Pass signal |
|---|---|---|---|
| 1 | **Shop owners will list if framed as "new customers / no waste", and won't feel it cheapens their brand.** | 25 counter-side interviews across 3 areas with two printed pitch cards (A: "reduce waste, reach new customers" vs B: "sell leftovers at a discount"). Then a concierge pilot: 10 shops list via a WhatsApp message to us for 2 weeks; we handle buyers manually. | ≥ 10 of 25 agree to a pilot; ≥ 6 of 10 still listing in week 2; zero "brand" complaints from the A framing. |
| 2 | **Counter staff can list in under 60 s on their phone.** | Paper + Figma prototype test on the owner's own phone during the 8–9 PM rush (5 shops, 3 listings each). Time it, note who actually does it (owner vs staff). | Median < 60 s, no assistance needed by the 2nd listing. |
| 3 | **Buyers trust a surprise bag from a shop they don't know, given licence + best-before + photos.** | Unmoderated 5-second + preference test with 40 Dhaka buyers (Facebook groups, university) on bag-detail variants with/without trust block. Fake-door: Facebook ad → landing page → "Reserve" counts. | ≥ 70% rate trust ≥ 4/5 with trust block; fake-door CTR ≥ 3%. |
| 4 | **Buyers will pay upfront with bKash for food they haven't seen.** | During the concierge pilot, offer bKash prepay vs pay-at-pickup; track choice, no-show rate per group. | ≥ 50% choose prepay by order 2; no-show < 10% overall. |
| 5 | **Habit forms: a buyer orders again within 14 days.** | Concierge pilot with a WhatsApp "tonight's bags" broadcast to 200 opted-in buyers. Track repeat purchases and which nudge works (favourite-shop alert vs impact message). | ≥ 30% of first-time buyers reorder within 14 days. |

Also measure throughout: Bangla vs English preference split (decides default language and copy QA budget), and pickup-window feasibility (are 8:30–9:30 PM windows realistic for students and families with Dhaka traffic?).
