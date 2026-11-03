# RunAgri — React + TypeScript website

This is the responsive, multi-page website for RunAgri Nigeria Limited. Source is now **Next.js App Router, React 19 and TypeScript** rather than hand-authored HTML pages. Marketing pages are rendered on the server for crawlability; interactive navigation and contact enquiries run in client components.

## Product scope
RunAgri connects prospective agricultural commodity supply and industrial demand. Priority commodities: wheat, sorghum and barley. We do not fabricate prices, verification status, clients, stock levels, certifications or delivery guarantees.

## Pages
`/` · `/about` · `/commodities` · `/commodities/wheat` · `/commodities/sorghum` · `/commodities/barley` · `/buyers` · `/suppliers` · `/process` · `/faq` · `/contact` · `/privacy`.

Old `.html` URLs redirect to equivalent routes via `next.config.ts`.

## Development
Use Node.js 22+.
```sh
npm install
npm run dev
npm run typecheck
npm run build
```

## Deployment
GitHub repository: `SMT-cmd/Runagri`. Vercel project: `runagri`. Set framework preset to **Next.js**; push to `main` to deploy.

## Contact form / email
The contact form uses `/api/enquiry` to send to **frontdesk@runagri.com**. Configure in Vercel:
- `RESEND_API_KEY`: Resend API key
- `ENQUIRY_FROM_EMAIL`: email sender on a domain verified in Resend
- `ENQUIRY_TO_EMAIL` (optional): receiving address; defaults to `frontdesk@runagri.com`.

When email is not configured or delivery fails, the frontend *does not* claim success; it offers a prefilled email-app link. Required field validation, consent, a hidden spam-trap field and origin checks are included. Add provider-side abuse limits or CAPTCHA for higher-volume launches. Never commit API keys.

The inline brief-completeness guide uses deterministic browser-side suggestions, **not an AI model** and does not transfer form input to external AI. This makes it free and private by default.

## Discoverability
Server-rendered public pages, per-route metadata/canonical tags, Open Graph, robots.txt, generated XML sitemap, `/llms.txt`, Organization/WebSite/FAQ/Service JSON-LD and internal links. These support conventional SEO and AI answer discovery, but do not guarantee placement or rankings. Submit and monitor the custom domain in Google Search Console and Bing Webmaster Tools when authorized. `https://runagri.com` must be configured as the canonical custom domain.

## Visual assets
Commodity/field photographs are remote illustrative Unsplash imagery; review suitability and any required licensing before formal client handoff. The text wordmark/favicon are provisional pending an approved RunAgri identity.

© RunAgri Nigeria Limited
