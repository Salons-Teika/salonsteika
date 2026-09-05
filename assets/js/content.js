/* ===========================================================================
   Salons Teika — all editable content lives in this file.
   Prices, testimonials and the three translations. Nothing here touches
   layout; edit freely and the page picks it up on next load.
   =========================================================================== */

/* ── Interface strings ──────────────────────────────────────────────────── */
window.I18N = {
  lv: {
    nav: { services: 'Pakalpojumi', about: 'Par Salonu', work: 'Darbi', reviews: 'Atsauksmes', contact: 'Kontakti' },
    cta: 'Sazināties',
    menuAria: 'Izvēlne',
    hero: {
      headline: 'Profesionāla matu kopšana tepat Teikā.',
      sub: '20+ gadu pieredze · Individuāla pieeja'
    },
    services: {
      heading: 'Pakalpojumi',
      intro: 'Matu griezumi, krāsošana, procedūras un veidošana sievietēm, vīriešiem un bērniem.',
      note: 'Cenas ir aptuvenas un var mainīties atkarībā no matu garuma, biezuma un izvēlētā pakalpojuma.'
    },
    about: {
      heading: 'Mūsu Stāsts',
      lead: 'Neliela un mājīga frizētava Teikā ar individuālu pieeju katram klientam.',
      body: 'Salons Teika atrodas Džutas ielā 10 un piedāvā matu griešanu, krāsošanu, veidošanu un matu kopšanas procedūras. Salona friziere Ilze Štrause nozarē strādā vairāk nekā 20 gadus, apvienojot profesionālu pieredzi ar individuālu pieeju katram klientam.',
      f1: '20+ Gadu Pieredze', f2: 'Teika, Rīga', f3: 'Individuāla Pieeja'
    },
    work: { heading: 'Mūsu Darbi', imgAria: 'Skatīt Instagram' },
    reviews: { heading: 'Klientu Atsauksmes', prevAria: 'Iepriekšējās atsauksmes', nextAria: 'Nākamās atsauksmes' },
    contact: {
      heading: 'Kontakti', addressLabel: 'Adrese', phoneLabel: 'Tālrunis',
      hoursLabel: 'Darba Laiks', hours: 'Pēc pieraksta',
      openMap: 'Atvērt Kartē', popLabel: 'Zvaniet mums'
    }
  },

en: {
    nav: { services: 'Services', about: 'About', work: 'Our Work', reviews: 'Reviews', contact: 'Contact' },
    cta: 'Get in touch',
    menuAria: 'Menu',
    hero: {
      headline: 'Professional hair care right here in Teika.',
      sub: '20+ years of experience · Individual approach'
    },
    services: {
      heading: 'Services',
      intro: 'Haircuts, colouring, treatments and styling for women, men and children.',
      note: 'Prices are approximate and may vary depending on hair length, thickness and the chosen service.'
    },
    about: {
      heading: 'Our Story',
      lead: 'A small, cosy hair salon in Teika with an individual approach to every client.',
      body: 'Salons Teika is located at Džutas iela 10 and offers haircuts, colouring, styling and hair care treatments. The salon’s hairdresser Ilze Štrause has worked in the industry for more than 20 years, combining professional experience with an individual approach to every client.',
      f1: '20+ Years of Experience', f2: 'Teika, Riga', f3: 'Individual Approach'
    },
    work: { heading: 'Our Work', imgAria: 'View on Instagram' },
    reviews: { heading: 'Client Reviews', prevAria: 'Previous reviews', nextAria: 'Next reviews' },
    contact: {
      heading: 'Contact', addressLabel: 'Address', phoneLabel: 'Phone',
      hoursLabel: 'Opening Hours', hours: 'By appointment',
      openMap: 'Open in Maps', popLabel: 'Call us'
    }
  }
};

/* ── Price list — edit here only ────────────────────────────────────────── */
window.SERVICES = [
  {
    name: { lv: 'Krāsošana', en: 'Colouring' },
    items: [
      { n: { lv: 'Balayage, Ombré',            en: 'Balayage, Ombré' },        p: '€120–200' },
      { n: { lv: 'Šķipsnas',              en: 'Highlights' },             p: '€70–120' },
      { n: { lv: 'Šķipsnas (pus galva)',  en: 'Highlights (half head)' }, p: '€50–70' },
      { n: { lv: 'Matu krāsošana',        en: 'Hair colouring' },         p: '€50–100' },
      { n: { lv: 'Sakņu balināšana',        en: 'Root bleaching' },         p: '€50–60' },
      { n: { lv: 'Sakņu krāsošana',       en: 'Root colouring' },         p: '€40–50' }
    ]
  },
  {
    name: { lv: 'Matu Procedūras', en: 'Hair Treatments' },
    items: [
      { n: { lv: 'Keratīns',                  en: 'Keratin' },     p: '€80–150' },
      { n: { lv: 'Botokss',         en: 'Hair botox' },  p: '€60–100' },
      { n: { lv: 'Matu spīdumi (Tinsel)', en: 'Hair tinsel' }, p: '€15' }
    ]
  },
  {
    name: { lv: 'Matu Griešana', en: 'Haircuts' },
    items: [
      { n: { lv: 'Sievietēm', en: 'Women' },    p: '€30' },
      { n: { lv: 'Vīriešiem', en: 'Men' },      p: '€20' },
      { n: { lv: 'Bērniem', en: 'Children' }, p: '€20' }
    ]
  },
  {
    name: { lv: 'Frizūras', en: 'Styling' },
    items: [
      { n: { lv: 'Afro lokas', en: 'Afro curls' }, p: '€40' },
      { n: { lv: 'Lokas',      en: 'Curls' },      p: '€30' },
      { n: { lv: 'Viļņi',       en: 'Waves' },      p: '€30' }
    ]
  }
];

/* ── Testimonials — edit here only. Add or remove entries freely. ───────── */
window.TESTIMONIALS = [
  {
    name: 'Dārta',
    lv: 'Pie Ilzes eju jau vairākus gadus. Vienmēr saprot, ko vēlos, un rezultāts ir lielisks.',
    en: 'I’ve been going to Ilze for several years. She always understands what I want and the result is great.'
  },
  {
    name: 'Andris',
    lv: 'Mierīga atmosfēra, profesionāla attieksme un vienmēr kvalitatīvs rezultāts.',
    en: 'A calm atmosphere, a professional attitude and consistently great results.'
  },
  {
    name: 'Samanta',
    lv: 'Mājīga vieta, patīkama atmosfēra un ļoti profesionāla attieksme.',
    en: 'A cosy place with a pleasant atmosphere and a very professional attitude.'
  },
  {
    name: 'Laura',
    lv: 'Beidzot atradu frizieri, pie kura nav jāuztraucas par rezultātu. Vienmēr patīk.',
    en: 'I finally found a hairdresser I never have to worry about. I love the result every time.'
  },
  {
    name: 'Jānis',
    lv: 'Atnācu tikai uz griezumu, bet tagad braucu pie Ilzes regulāri. Ļoti patīk attieksme.',
    en: 'I initially came in just for a haircut, but now I visit Ilze regularly. I really appreciate the personal approach.'
  },
  {
    name: 'Santa',
    lv: 'Ilze vienmēr pasaka godīgi, kas maniem matiem derēs un kas nē.',
    en: 'Ilze is always honest about what will work for my hair and what won’t.'
  },
  {
    name: 'Edvards',
    lv: 'Ātri, precīzi un vienmēr labs griezums. Tieši tas, ko vajag.',
    en: 'Quick, precise and always a great cut. Exactly what I need.'
  }
];

/* ── Gallery — `link` is the Instagram post for that shot; null = profile ─ */
window.GALLERY = [
  { id: 'gallery-01', alt: { lv: 'Frizūra — Salons Teika darbs 1', en: 'Hairstyle — Salons Teika work 1' }, link: null },
  { id: 'gallery-02', alt: { lv: 'Frizūra — Salons Teika darbs 2', en: 'Hairstyle — Salons Teika work 2' }, link: null },
  { id: 'gallery-03', alt: { lv: 'Frizūra — Salons Teika darbs 3', en: 'Hairstyle — Salons Teika work 3' }, link: null },
  { id: 'gallery-04', alt: { lv: 'Frizūra — Salons Teika darbs 4', en: 'Hairstyle — Salons Teika work 4' }, link: null },
  { id: 'gallery-05', alt: { lv: 'Frizūra — Salons Teika darbs 5', en: 'Hairstyle — Salons Teika work 5' }, link: null }
];

/* ── Salon details ─────────────────────────────────────────────────────── */
window.SALON = {
  phone: '+371 271 88 399',
  phoneHref: 'tel:+37127188399',
  instagram: 'https://www.instagram.com/salonsteika/',
  facebook: 'https://www.facebook.com/salonsteika/?locale=lv_LV',
  tiktok: 'https://www.tiktok.com/@salonsteika',
  flags: { lv: '🇱🇻', en: '🇬🇧' }
};
