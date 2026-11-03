# RunAgri Nigeria Limited — website

Multi-page, responsive B2B agricultural commodity website for RunAgri Nigeria Limited. Built with semantic HTML, shared CSS, accessible vanilla JavaScript and an optional Vercel serverless enquiry endpoint. No frontend framework, package installation, paid build tooling or analytics are required.

## Pages
- Home, About, Commodities, Buyers, Suppliers, Our Process, FAQs, Contact, Privacy
- Commodity detail pages: Wheat, Sorghum, Barley
- 404 error page, XML sitemap and robots.txt

## Local preview
Run a static server from this directory, for example `python3 -m http.server 8000`, then open `http://localhost:8000`. Navigation works locally. The live enquiry API works when deployed as a Vercel Node.js function; local static preview will show an honest email fallback.

## Deployment
Import `SMT-cmd/Runagri` into Vercel as an **Other** (no-framework) project using the repository root. The static site needs no build command or output directory. Vercel serves the HTML pages and `api/enquiry.js` endpoint. Project `vercel.json` enables clean URLs and basic response headers.

## Enquiry configuration
Configure these Vercel environment variables and redeploy:
- `RESEND_API_KEY`: API key for the sender's Resend account
- `ENQUIRY_FROM_EMAIL`: a sender address on a domain verified in Resend, for example `enquiries@runagri.com` once verified
- `ENQUIRY_TO_EMAIL` (optional): destination inbox; defaults to `david@runagri.com`

The API validates required fields and user consent, checks a honeypot, avoids inline HTML injection, blocks cross-origin POSTs and sends via Resend. Without credentials or if delivery fails, the UI explicitly reports the failure and offers a prefilled email link; it **does not falsely claim the enquiry was sent**. Consider additional managed anti-spam/rate limiting if volume rises. Avoid including secrets in Git.

## Content & imagery
Business positioning and email are taken from the provided original RunAgri site. No invented performance statistics, partnerships, testimonials or supply guarantees. Commodity photography currently uses remote Unsplash URLs as replaceable illustrative imagery; obtain approved/licensed brand photography before a public handoff. The brand symbol is a new provisional design pending any official RunAgri logo.

## Verification
Check all pages on mobile, tablet and desktop, main navigation, page link targets, keyboard navigation, reduced motion, sitemap, API 400/405/503 handling and a successful enquiry only after verified Resend credentials are configured.

RunAgri Nigeria Limited · Trade · Source · Connect
