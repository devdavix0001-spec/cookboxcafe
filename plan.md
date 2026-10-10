# Cookbox Cafe React rebuild

## Scope
Rebuild the Cookbox Cafe ordering experience as a React web app using the live site’s business details, menu items, pricing, Lagos delivery areas, opening hours and WhatsApp number. Apply the attached audit’s highest-return changes: mobile app shell, reduced scrolling, clearer delivery/trust information, persistent basket, guest-friendly ordering, crawlable metadata, and PWA foundations.

## Design
- **Movement:** Warm editorial food-market modernism: bold type, tactile cream surfaces, golden accents and real food photography.
- **Principles:** order-first clarity; rich food imagery; one-thumb interactions; trustworthy local detail.
- **Color philosophy:** Cookbox yellow is the ownable action color; black provides appetite and contrast; cream keeps the interface warm rather than clinical.
- **Layout paradigm:** mobile ordering shell with replace-in-place category browsing, horizontal discovery rails and a persistent basket rather than one long menu page.
- **Signature elements:** CBX folded-corner mark, gold action controls, rounded food cards and compact status strips.
- **Interaction:** basket persists in localStorage; product add actions are immediate and reversible; category tabs replace the visible list; WhatsApp handoff carries the order summary.
- **Animation:** short functional transitions only: hero crossfade, add-to-basket toast and basket sheet rise.
- **Typography:** Space Grotesk for expressive headings and DM Sans for readable product/checkout copy.
- **Brand essence:** fresh Nigerian comfort food for busy Lagos customers who want a warm meal without guesswork. Personality: warm, direct, local.
- **Voice:** “Warm meals, boxed with love.” / “Choose your soup, swallow and protein — we’ll handle the rest.”
- **Wordmark:** compact CBX badge paired with a two-line Cookbox Cafe lockup.
- **Signature color:** Cookbox Gold `#F4B51B`.

## Structure
- `src/App.tsx`: app shell, route-like screen state, menu catalog, basket state and WhatsApp checkout handoff.
- `src/index.css`: responsive visual system, desktop/mobile navigation, product cards and basket sheet.
- `public/manifest.webmanifest`: installable PWA metadata and shortcuts.
- `public/robots.txt`, `public/sitemap.xml`, `public/manus-routes.json`: crawlable route declarations.
- `index.html`: canonical metadata, description, theme color and title.

## Intentional phase boundary
This delivery is a frontend-first implementation. Paystack, server-side payment verification, account identity, notifications and private receipt storage are documented by the audit as the next backend phases; the UI leaves a clear path for those additions without pretending a browser redirect is payment confirmation.
