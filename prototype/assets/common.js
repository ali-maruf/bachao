/* Bachao prototype — shared helpers: i18n, icons, food art, mock data, demo clock. */
(function () {
  "use strict";

  /* ---------- i18n ---------- */
  const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
  const dict = { en: {}, bn: {} };
  const listeners = [];
  let stored = null;
  try { stored = localStorage.getItem("bachao-lang"); } catch (e) { /* storage unavailable */ }
  let lang = stored || ((navigator.language || "").startsWith("bn") ? "bn" : "en");

  const n = (v) => lang === "bn" ? String(v).replace(/\d/g, (d) => BN_DIGITS[d]) : String(v);
  const t = (key, vars) => {
    let s = (dict[lang] && dict[lang][key]) ?? dict.en[key] ?? key;
    if (vars) for (const k in vars) s = s.replaceAll("{" + k + "}", vars[k]);
    return s;
  };
  function apply(root) {
    (root || document).querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    (root || document).querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    (root || document).querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    (root || document).querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    (root || document).querySelectorAll("[data-num]").forEach((el) => { el.textContent = n(el.dataset.num); });
  }
  function setLang(l) {
    lang = l;
    try { localStorage.setItem("bachao-lang", l); } catch (e) { /* storage unavailable */ }
    document.documentElement.lang = l;
    document.querySelectorAll(".lang-toggle button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
    apply();
    listeners.forEach((fn) => fn(l));
  }
  function initLangToggle() {
    document.querySelectorAll(".lang-toggle button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
    setLang(lang);
  }

  /* ---------- money & time ---------- */
  const tk = (v) => "৳" + n(v.toLocaleString("en-IN"));
  // Demo clock: the prototype always opens at 7:40 PM Dhaka time so pickup windows make sense.
  const loadedAt = Date.now();
  const DEMO_START_MIN = 19 * 60 + 40;
  const nowMin = () => DEMO_START_MIN + (Date.now() - loadedAt) / 60000;
  function clock(min) {
    min = Math.round(min) % 1440;
    let h = Math.floor(min / 60), m = min % 60;
    const mm = String(m).padStart(2, "0");
    if (lang === "bn") {
      const part = h < 12 ? (h < 5 ? "রাত" : "সকাল") : h < 16 ? "দুপুর" : h < 18 ? "বিকাল" : h < 19 ? "সন্ধ্যা" : "রাত";
      const h12 = h % 12 || 12;
      return part + " " + n(h12 + ":" + mm);
    }
    const ap = h < 12 ? "AM" : "PM";
    return (h % 12 || 12) + ":" + mm + " " + ap;
  }
  const windowText = (a, b) => lang === "bn" ? clock(a) + "–" + clock(b).replace(/^\S+ /, "") : clock(a).replace(/ (AM|PM)$/, "") + "–" + clock(b);
  function dur(mins) {
    mins = Math.max(0, Math.round(mins));
    const h = Math.floor(mins / 60), m = mins % 60;
    if (lang === "bn") return (h ? n(h) + " ঘ " : "") + n(m) + " মি";
    return (h ? h + "h " : "") + m + "m";
  }

  /* ---------- icons (2px rounded stroke, 24px grid) ---------- */
  const P = {
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    star: '<path d="M12 2.8l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3 6.3 20.3l1.1-6.3L2.8 9.5l6.4-.9z"/>',
    heart: '<path d="M12 20s-7.5-4.6-9.2-9.2C1.6 7.4 3.9 4 7.3 4c2 0 3.6 1.1 4.7 2.7C13.1 5.1 14.7 4 16.7 4c3.4 0 5.7 3.4 4.5 6.8C19.5 15.4 12 20 12 20z"/>',
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    back: '<path d="M15 18l-6-6 6-6"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    nav: '<path d="M3 11l18-8-8 18-2-8z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5h.01"/>',
    wifioff: '<path d="M2 8.5a15 15 0 0 1 4-2.5M10 5.1A15 15 0 0 1 22 8.5M5 12.5a10 10 0 0 1 3.5-2M15.5 10.5A10 10 0 0 1 19 12.5M8.5 16a5 5 0 0 1 7 0M12 20h.01M3 3l18 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>',
    cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    locate: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'
  };
  const icon = (name, cls) => '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || "") + "</svg>";
  const starIcon = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true">' + P.star + "</svg>";
  const logoMark = '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M11 12.5a9 9 0 0 0 18 0" fill="none" stroke="var(--primary)" stroke-width="3.2" stroke-linecap="round"/><circle cx="20" cy="6" r="2.6" fill="var(--haldi)"/><path d="M6 17h28l-2.4 17.2A3 3 0 0 1 28.6 37H11.4a3 3 0 0 1-3-2.8z" fill="var(--primary)"/><path d="M15 26q5 4.5 10 0" fill="none" stroke="var(--haldi)" stroke-width="2.6" stroke-linecap="round"/></svg>';

  /* ---------- food art: stands in for real counter photography ---------- */
  function foodArt(cat, seed) {
    const r = mulberry(seed || 1);
    const bg = { bakery: ["#E9B872", "#C98A4B"], sweets: ["#F3D9B1", "#D9A066"], meals: ["#C9783A", "#8E4A22"], grocery: ["#BFD8A6", "#7FA65E"], cake: ["#F2C6C2", "#C9837E"] }[cat] || ["#E9B872", "#C98A4B"];
    let s = '<svg class="art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="g' + seed + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + bg[0] + '"/><stop offset="1" stop-color="' + bg[1] + '"/></linearGradient></defs><rect width="400" height="300" fill="url(#g' + seed + ')"/>';
    // paper / tray
    s += '<rect x="30" y="40" width="340" height="230" rx="18" fill="#FFF8EC" opacity=".55"/>';
    if (cat === "bakery") {
      for (let i = 0; i < 5; i++) {
        const x = 70 + (i % 3) * 110 + r() * 20, y = 100 + Math.floor(i / 3) * 90 + r() * 10;
        s += '<ellipse cx="' + x + '" cy="' + y + '" rx="52" ry="30" fill="#B8692C"/><ellipse cx="' + x + '" cy="' + (y - 6) + '" rx="46" ry="22" fill="#D68A43"/>';
        for (let k = -1; k <= 1; k++) s += '<path d="M' + (x + k * 18 - 6) + " " + (y - 18) + " q8 10 0 22" + '" stroke="#F3C27E" stroke-width="4" fill="none" stroke-linecap="round"/>';
      }
    } else if (cat === "sweets") {
      for (let row = 0; row < 3; row++) for (let col = 0; col < 5; col++) {
        const x = 80 + col * 60, y = 90 + row * 62, kind = (row + col + Math.floor(r() * 3)) % 3;
        const c = ["#FFFDF5", "#4A1420", "#F0C35A"][kind], c2 = ["#EFE7D6", "#2C0A12", "#D9A23A"][kind];
        s += '<circle cx="' + x + '" cy="' + (y + 3) + '" r="25" fill="' + c2 + '"/><circle cx="' + x + '" cy="' + y + '" r="24" fill="' + c + '"/><circle cx="' + (x - 8) + '" cy="' + (y - 9) + '" r="6" fill="#fff" opacity=".45"/>';
      }
    } else if (cat === "meals") {
      s += '<ellipse cx="200" cy="200" rx="150" ry="58" fill="#5B2A12"/><ellipse cx="200" cy="170" rx="140" ry="62" fill="#F4E3BE"/>';
      for (let i = 0; i < 140; i++) { const a = r() * 6.28, d = Math.sqrt(r()); s += '<rect x="' + (200 + Math.cos(a) * d * 125) + '" y="' + (170 + Math.sin(a) * d * 50) + '" width="7" height="3" rx="1.5" fill="' + (r() > .7 ? "#E3A33C" : "#FFF6DF") + '" transform="rotate(' + Math.round(r() * 180) + ' ' + (200 + Math.cos(a) * d * 125) + ' ' + (170 + Math.sin(a) * d * 50) + ')"/>'; }
      s += '<ellipse cx="160" cy="160" rx="26" ry="16" fill="#8B3E1C"/><ellipse cx="240" cy="178" rx="24" ry="15" fill="#9A4A22"/><circle cx="205" cy="150" r="13" fill="#FFF3D1"/><circle cx="205" cy="150" r="6" fill="#F2B33D"/>';
    } else if (cat === "cake") {
      s += '<path d="M70 210 L200 120 L330 210 Z" fill="#5A2A1A"/><rect x="70" y="210" width="260" height="20" fill="#5A2A1A"/><path d="M70 190 L200 100 L330 190 L330 210 L70 210 Z" fill="#FBEFE4"/><path d="M70 172 L200 82 L330 172 L330 190 L70 190Z" fill="#7A3B22"/><path d="M200 82 L330 172" stroke="#F6D1CC" stroke-width="10"/>';
      for (let i = 0; i < 4; i++) s += '<circle cx="' + (150 + i * 30) + '" cy="' + (110 + i * 18) + '" r="8" fill="#C62F3A"/>';
    } else {
      for (let i = 0; i < 9; i++) { const x = 70 + (i % 5) * 65 + r() * 10, y = 105 + Math.floor(i / 5) * 85 + r() * 10, c = ["#E14B3B", "#F2B33D", "#6EA84C", "#F07F2E"][i % 4]; s += '<circle cx="' + x + '" cy="' + y + '" r="' + (26 + r() * 8) + '" fill="' + c + '"/><path d="M' + x + ' ' + (y - 26) + ' q6 -10 14 -10" stroke="#3E6B2A" stroke-width="4" fill="none"/>'; }
    }
    return s + "</svg>";
  }
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  /* ---------- mock data (fictional shops) ---------- */
  const bags = [
    { id: 1, shop: "Moyna Bakery", shopBn: "ময়না বেকারি", area: "Dhanmondi 27", areaBn: "ধানমন্ডি ২৭", cat: "bakery", rating: 4.7, reviews: 212, dist: 0.6, start: 20 * 60 + 30, end: 21 * 60 + 30, best: 23 * 60, price: 150, was: 450, left: 3, halal: true, licence: "TRAD/DNCC/041823/2024", x: 38, y: 44, allergens: ["gluten", "dairy", "egg"], items: "4–6 items: bread loaves, buns, a pastry or two", itemsBn: "৪–৬টি আইটেম: পাউরুটি, বান, এক-দুটি পেস্ট্রি", pickup: "Show your code at the left counter, near the cake fridge.", pickupBn: "বাম দিকের কাউন্টারে, কেক ফ্রিজের পাশে কোড দেখান।", addr: "House 12, Road 27 (old), Dhanmondi", addrBn: "বাড়ি ১২, রোড ২৭ (পুরাতন), ধানমন্ডি", q: 4.8, qty: 4.5, staff: 4.8 },
    { id: 2, shop: "Dhanmondi Mishti Ghor", shopBn: "ধানমন্ডি মিষ্টি ঘর", area: "Dhanmondi 8/A", areaBn: "ধানমন্ডি ৮/এ", cat: "sweets", rating: 4.8, reviews: 341, dist: 0.9, start: 20 * 60, end: 21 * 60, best: 24 * 60 + 9 * 60, price: 180, was: 520, left: 1, halal: true, licence: "TRAD/DSCC/018845/2023", x: 54, y: 30, allergens: ["dairy", "nuts"], items: "About 1 kg mixed mishti: roshogolla, kalojam, sandesh", itemsBn: "প্রায় ১ কেজি মিশ্র মিষ্টি: রসগোল্লা, কালোজাম, সন্দেশ", pickup: "Ask for 'Bachao bag' at the till.", pickupBn: "ক্যাশে 'বাঁচাও ব্যাগ' চাইবেন।", addr: "Road 8/A, Satmasjid Road, Dhanmondi", addrBn: "রোড ৮/এ, সাতমসজিদ রোড, ধানমন্ডি", q: 4.9, qty: 4.6, staff: 4.7 },
    { id: 3, shop: "Kacchi Corner", shopBn: "কাচ্চি কর্নার", area: "Mohammadpur", areaBn: "মোহাম্মদপুর", cat: "meals", rating: 4.5, reviews: 128, dist: 1.8, start: 21 * 60 + 30, end: 22 * 60 + 15, best: 23 * 60 + 30, price: 220, was: 600, left: 4, halal: true, licence: "TRAD/DNCC/052210/2024", x: 18, y: 26, allergens: ["dairy"], items: "2 portions of kacchi or tehari, plus a side", itemsBn: "২ প্লেট কাচ্চি বা তেহারি, সাথে একটি সাইড", pickup: "Pickup from the takeaway window on the left.", pickupBn: "বাম দিকের টেকঅ্যাওয়ে জানালা থেকে নিন।", addr: "Tajmahal Road, Mohammadpur", addrBn: "তাজমহল রোড, মোহাম্মদপুর", q: 4.6, qty: 4.7, staff: 4.2 },
    { id: 4, shop: "Bread & Bun Café", shopBn: "ব্রেড অ্যান্ড বান ক্যাফে", area: "Gulshan 2", areaBn: "গুলশান ২", cat: "cake", rating: 4.6, reviews: 96, dist: 5.4, start: 21 * 60, end: 22 * 60, best: 24 * 60 + 10 * 60, price: 250, was: 800, left: 2, halal: false, licence: "TRAD/DNCC/073391/2024", x: 84, y: 18, allergens: ["gluten", "dairy", "egg", "nuts"], items: "2–3 cake slices or a small cake, plus cookies", itemsBn: "২–৩ স্লাইস কেক বা ছোট একটি কেক, সাথে কুকিজ", pickup: "Code at the barista counter.", pickupBn: "বারিস্তা কাউন্টারে কোড দেখান।", addr: "Road 55, Gulshan 2", addrBn: "রোড ৫৫, গুলশান ২", q: 4.7, qty: 4.3, staff: 4.8 },
    { id: 5, shop: "Shapla Super Shop", shopBn: "শাপলা সুপার শপ", area: "Dhanmondi 15", areaBn: "ধানমন্ডি ১৫", cat: "grocery", rating: 4.3, reviews: 64, dist: 1.2, start: 20 * 60 + 45, end: 21 * 60 + 45, best: 24 * 60 + 20 * 60, price: 120, was: 380, left: 6, halal: true, licence: "TRAD/DSCC/027764/2023", x: 30, y: 66, allergens: [], items: "Fruit and vegetables, maybe bread or yogurt", itemsBn: "ফল ও সবজি, সাথে পাউরুটি বা দই থাকতে পারে", pickup: "Customer service desk at the entrance.", pickupBn: "ঢোকার মুখে কাস্টমার সার্ভিস ডেস্কে।", addr: "Road 15/A, Dhanmondi", addrBn: "রোড ১৫/এ, ধানমন্ডি", q: 4.2, qty: 4.6, staff: 4.1 },
    { id: 6, shop: "Lalmatia Paratha House", shopBn: "লালমাটিয়া পরোটা হাউস", area: "Lalmatia", areaBn: "লালমাটিয়া", cat: "meals", rating: 4.4, reviews: 77, dist: 1.4, start: 21 * 60 + 15, end: 22 * 60, best: 23 * 60, price: 130, was: 360, left: 0, halal: true, licence: "TRAD/DNCC/060012/2024", x: 26, y: 40, allergens: ["gluten"], items: "4 parathas with bhaji and egg", itemsBn: "৪টি পরোটা, ভাজি আর ডিম", pickup: "Front counter.", pickupBn: "সামনের কাউন্টারে।", addr: "Block D, Lalmatia", addrBn: "ব্লক ডি, লালমাটিয়া", q: 4.4, qty: 4.5, staff: 4.3 },
    { id: 7, shop: "Gulshan Sweet Palace", shopBn: "গুলশান সুইট প্যালেস", area: "Gulshan 1", areaBn: "গুলশান ১", cat: "sweets", rating: 4.6, reviews: 150, dist: 4.9, start: 20 * 60 + 15, end: 21 * 60 + 15, best: 24 * 60 + 8 * 60, price: 200, was: 560, left: 5, halal: true, licence: "TRAD/DNCC/039901/2023", x: 76, y: 34, allergens: ["dairy", "nuts"], items: "Mixed mishti box, around 12 pieces", itemsBn: "মিশ্র মিষ্টির বাক্স, প্রায় ১২ পিস", pickup: "Ask at the packing counter.", pickupBn: "প্যাকিং কাউন্টারে বলুন।", addr: "Gulshan Avenue, Gulshan 1", addrBn: "গুলশান এভিনিউ, গুলশান ১", q: 4.7, qty: 4.5, staff: 4.6 },
    { id: 8, shop: "Tokai Bakehouse", shopBn: "টোকাই বেকহাউস", area: "Mohammadpur", areaBn: "মোহাম্মদপুর", cat: "bakery", rating: 4.2, reviews: 41, dist: 2.1, start: 21 * 60 + 45, end: 22 * 60 + 30, best: 24 * 60 + 9 * 60, price: 100, was: 300, left: 3, halal: true, licence: "TRAD/DNCC/081120/2024", x: 12, y: 54, allergens: ["gluten", "egg"], items: "Buns, toast biscuits and a loaf", itemsBn: "বান, টোস্ট বিস্কুট আর একটি পাউরুটি", pickup: "Main counter.", pickupBn: "মূল কাউন্টারে।", addr: "Ring Road, Mohammadpur", addrBn: "রিং রোড, মোহাম্মদপুর", q: 4.1, qty: 4.4, staff: 4.2 }
  ];

  Object.assign(dict.en, {
    left: "{n} left", soldOut: "Sold out", bestBefore: "Best before {t}", tomorrow: "tomorrow", km: "km",
    verified: "Licence verified", halal: "Halal", save: "Save {p}%", fav: "Save to favourites", was: "was",
    cat_bakery: "Bakery", cat_sweets: "Sweets", cat_meals: "Meals", cat_grocery: "Grocery", cat_cake: "Café & cake"
  });
  Object.assign(dict.bn, {
    left: "{n}টি বাকি", soldOut: "শেষ", bestBefore: "{t} পর্যন্ত ভালো", tomorrow: "কাল", km: "কিমি",
    verified: "লাইসেন্স যাচাইকৃত", halal: "হালাল", save: "{p}% সাশ্রয়", fav: "পছন্দের তালিকায় রাখুন", was: "আগে",
    cat_bakery: "বেকারি", cat_sweets: "মিষ্টি", cat_meals: "খাবার", cat_grocery: "গ্রোসারি", cat_cake: "ক্যাফে ও কেক"
  });

  const shopName = (b) => lang === "bn" ? b.shopBn : b.shop;
  const areaName = (b) => lang === "bn" ? b.areaBn : b.area;
  const pct = (b) => Math.round((1 - b.price / b.was) * 100);
  const bestText = (b) => t("bestBefore", { t: (b.best >= 1440 ? t("tomorrow") + " " : "") + clock(b.best) });
  const bestSoon = (b) => b.best - nowMin() < 180;
  const leftBadge = (b) => '<span class="badge badge-left ' + (b.left <= 1 ? "low" : "") + '">' + (b.left === 0 ? t("soldOut") : t("left", { n: n(b.left) })) + "</span>";
  const priceHtml = (b) => '<span class="price"><span class="now num">' + tk(b.price) + '</span><span class="was num"><span class="sr-only">' + t("was") + " </span>" + tk(b.was) + '</span><span class="badge badge-save">' + t("save", { p: n(pct(b)) }) + "</span></span>";
  function bagCard(b, href) {
    return '<article class="bag-card' + (b.left === 0 ? " soldout" : "") + '">' +
      '<div class="photo">' + foodArt(b.cat, b.id) + leftBadge(b) + "</div>" +
      '<button class="icon-btn fav" aria-pressed="false" aria-label="' + t("fav") + '" data-fav="' + b.id + '">' + icon("heart") + "</button>" +
      '<div class="body"><div class="shop"><h3><a class="stretch" href="' + href + '">' + shopName(b) + "</a></h3>" +
      '<span class="rating">' + starIcon + n(b.rating) + ' <span class="count">(' + n(b.reviews) + ")</span></span></div>" +
      '<div class="meta"><span>' + icon("clock") + windowText(b.start, b.end) + "</span><span>" + icon("pin") + n(b.dist) + " " + t("km") + " · " + areaName(b) + "</span></div>" +
      '<div class="foot"><span class="badge badge-best' + (bestSoon(b) ? " soon" : "") + '">' + icon("clock") + bestText(b) + "</span>" + priceHtml(b) + "</div></div></article>";
  }
  document.addEventListener("click", (e) => {
    const f = e.target.closest("[data-fav]");
    if (f) f.setAttribute("aria-pressed", String(f.getAttribute("aria-pressed") !== "true"));
  });

  window.B = { shopName, areaName, pct, bestText, bestSoon, leftBadge, priceHtml, bagCard, t, n, tk, apply, setLang, initLangToggle, onLang: (fn) => listeners.push(fn), add: (en, bn) => { Object.assign(dict.en, en); Object.assign(dict.bn, bn); }, get lang() { return lang; }, nowMin, clock, windowText, dur, icon, starIcon, logoMark, foodArt, bags, mulberry };
})();
