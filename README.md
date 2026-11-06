# Meme Sniper Bot — Exchange-style landing page (SEO edition)

Responsive, exchange-inspired landing page for Meme Sniper Bot, with expanded on-page SEO and crawl metadata

## Included
- Responsive landing page and exchange-style product preview
- Illustrative candlestick chart, order book, market summary and token watchlist demo
- Searchable, filterable and sortable sample token table
- Working ZIP password copy interaction
- Descriptive title and meta description
- Canonical URL, robots directives, hreflang, Open Graph and X/Twitter card metadata
- 1200 × 630 social preview image (`assets/og-image.png`)
- JSON-LD graph for Organization, WebSite and SoftwareApplication
- `robots.txt`, XML sitemap and web app manifest
- Semantic product explanation and expanded FAQ content

## Important accuracy notes
- Chart, ticker, order-book and token-table values are illustrative sample data, not live market quotes.
- No exchange API or live market feed is connected to this landing page.
- Product feature descriptions are intentionally limited to the information supplied for the project. Do not add claims about supported exchanges, chains, audited security, profitability, execution speed, or specific integrations unless verified against the actual application.
- No reviews, ratings, awards, user counts, or testimonials are fabricated or marked up

## Canonical URL — verify before publishing
The current canonical and sitemap URL is set to:
`https://stratumgreawning7.github.io/MemeCoin-Sniper-Bot-Website/`

If the final public site uses another domain or repository path, update **all** absolute URLs in `index.html`, `robots.txt`, `sitemap.xml`, and JSON-LD before deployment. A canonical URL must point to the actual preferred public URL, not a guessed or staging URL.

## Publish and indexing checklist
1. Publish the contents of this folder to the root of the GitHub Pages repository.
2. Open the canonical URL in a private browser and confirm HTTPS, page content, CSS, scripts, favicon and `assets/og-image.png` all load successfully.
3. In Google Search Console, add/verify the site property, inspect the homepage URL, test the live URL, and submit `/MemeCoin-Sniper-Bot-Website/sitemap.xml`.
4. In Bing Webmaster Tools, verify the site and submit the sitemap.
5. Check that the canonical URL, rendered page title, description and social preview match the deployed site.
6. Recheck Core Web Vitals and mobile usability after deployment. Fix actual field or lab issues rather than adding arbitrary SEO scripts.

## Run locally
Open `index.html` in a browser. A local static server is recommended for testing paths and metadata.
