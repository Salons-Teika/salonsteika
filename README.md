# Salons Teika

Landing page for **Salons Teika**, a hair salon at Džutas iela 10, Rīga (Teika).

Built from the Claude Design mockup as a plain static site — no build step, no
framework, no runtime dependencies. Open `index.html` and it works.

## Layout

```
index.html              Full page markup (Latvian is in the HTML; see i18n below)
favicon.svg             Brand mark; favicon-48.png / apple-touch-icon.png are fallbacks
robots.txt, sitemap.xml
assets/
  css/site.css          All layout and component styles
  css/fonts.css         @font-face for the self-hosted subsets
  js/content.js         ← everything you'd want to edit: prices, reviews, translations
  js/site.js            Behaviour only: carousel, accordion, language switch, scroller
  fonts/                Cormorant Garamond + Poppins woff2 subsets
  img/                  9 WebP photos (hero ×3, portrait, gallery ×5)
```

## Editing content

Almost all copy lives in **`assets/js/content.js`**:

| What | Where |
| --- | --- |
| Prices and service categories | `window.SERVICES` |
| Client testimonials | `window.TESTIMONIALS` |
| Interface strings, all 3 languages | `window.I18N` |
| Gallery alt text and Instagram links | `window.GALLERY` |
| Phone, social URLs | `window.SALON` |

One exception: the Latvian price list and testimonials are **also** written
directly into `index.html`. That is deliberate — search engines and visitors
without JavaScript still see real prices and reviews, and `site.js` rebuilds
those blocks from `content.js` the moment the language changes. If you change a
price, change it in both places, or accept that the pre-JS paint is briefly
stale.

## Languages

Latvian, Russian and English. The picker is in the header (and the mobile
drawer). The chosen language persists in `localStorage`; a first-time visitor
gets their browser language when it is one of the three, otherwise Latvian.

Poppins ships no Cyrillic subset, so Russian body copy falls back to the
system UI font — same as the original design. Headings use Cormorant Garamond,
which does cover Cyrillic.

## Images

The nine photos came out of the design bundle as WebP at roughly display size
(~330×412 for gallery tiles, ~700×1100 for hero slides). Two of them carry a
hand-set crop from the design; those offsets are reproduced at the bottom of
`site.css` rather than baked into the files, so re-exporting a photo does not
silently lose its framing.

If higher-resolution originals exist, drop them into `assets/img/` under the
same filenames — nothing else needs to change.

## Fonts

Self-hosted rather than loaded from `fonts.gstatic.com`. The salon's clients
are in the EU and serving Google Fonts from Google's CDN hands every visitor's
IP address to a third party, which has been ruled a GDPR problem in Germany.
Subsets included: latin, latin-ext for both families, plus Cyrillic for
Cormorant. Vietnamese and Devanagari were dropped.

## Deploying

Hosted on **Cloudflare Pages**, deployed from this repository. There is no
build step — the folder is served as-is. Framework preset: *None*; build
command: empty; build output directory: `/` (the repository root).

Header and cache rules are duplicated in two host-specific files, kept in
sync: `_headers` (Cloudflare Pages, Netlify) and `vercel.json` (Vercel).
Both set the same three security headers and the same cache policy:

- `assets/fonts/*` — one year, immutable. Those filenames never change.
- `assets/img/*` — one day, then revalidate. Photo filenames are **not**
  content-hashed and the section above tells you to drop replacements in under
  the same name, so a hard cache would strand the old photo in browsers.
- `assets/css/*`, `assets/js/*`, `*.html` — always revalidate, same reasoning.
  ETags keep this cheap.

### Domain

The canonical domain is **www.salonsteika.com** — the `www` subdomain, not the
apex — set in `index.html` (canonical link, Open Graph, JSON-LD),
`sitemap.xml` and `robots.txt`. Those are the four places to update if it ever
changes.

The `www` is not a style choice. The domain is registered at **Wix**, and Wix
does not allow changing a domain's nameservers at all. Cloudflare Pages can
serve a domain whose DNS lives elsewhere, but only a **subdomain**, via a
CNAME — an apex domain requires the zone to sit on Cloudflare's nameservers.
So while the registration stays at Wix, `salonsteika.com` cannot point here
and `www.salonsteika.com` can.

Setup, in this order (reversing it yields a 522):

1. Add `www.salonsteika.com` under the Pages project's **Custom domains** tab.
2. In Wix DNS, add a CNAME: host `www` → `salonsteika.pages.dev`, DNS-only.

To get the apex working, the registration has to move off Wix to a registrar
that permits nameserver changes; then point the nameservers at Cloudflare, add
`salonsteika.com` as a second custom domain, and redirect it to `www`.

The site is a plain static folder, so it runs unchanged on Cloudflare Pages,
Netlify, Vercel or nginx. Two things to know if you move it:

- **Vercel's Hobby tier will not deploy this repo.** Hobby only accepts
  repositories owned by a personal account, and this one belongs to the
  `Salons-Teika` organization. Vercel offers a Pro trial instead.
- Vercel's Hobby tier is also non-commercial only, which a salon's business
  site is not. Cloudflare Pages has neither restriction.

## Not carried over from the design

- **Inline testimonial editing.** The mockup let you click a quote and type over
  it, saving to a sidecar JSON. That is a design-tool affordance; on a public
  site it would let any visitor appear to edit the page. Reviews are edited in
  `content.js`.
- **The `x-dc` runtime.** The mockup shipped React plus a template interpreter
  (~200 KB) to render a page that is entirely static. This version renders the
  same page with ~9 KB of vanilla JS.
