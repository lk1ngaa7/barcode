# Deployment Checklist

## Cloudflare Pages

Use the static Nuxt output for the MVP.

```text
Build command: pnpm generate
Build output directory: dist
Node.js version: 20+
```

No Cloudflare Workers, D1, KV, R2, API routes, login system, or server-side barcode processing are required for the MVP.

## Pre-Deploy Verification

Run these checks before deploying:

```bash
pnpm typecheck
pnpm generate
```

Confirm:

- `dist` is created.
- `/sitemap.xml` is present in `dist`.
- `/robots.txt` is present in `dist`.
- Public tool pages render without severe console errors.
- Barcode values are generated in the browser and are not uploaded.

## Analytics

The MVP includes anonymous event hooks for feature usage measurement:

```text
barcode_generate
barcode_type_change
barcode_validation_error
download_png
download_svg
export_pdf
bulk_paste
bulk_generate
excel_paste_detected
label_template_select
related_tool_click
```

Analytics payloads must not include barcode values, label text, product names, spreadsheet cell contents, or other user-entered content. Event payloads should stay limited to metadata such as page path, barcode type, row counts, selected template, output format, value length, and error category.

The client analytics hook is non-blocking. If no analytics provider is installed, the tool still works normally and emits a local `barcode:analytics` browser event for QA.

## Custom Domain and HTTPS

Current production domain:

```text
https://www.barcode-mint.com
```

After the first Cloudflare Pages deployment:

1. Add the production custom domain in Cloudflare Pages.
2. Confirm HTTPS is active for the custom domain.
3. Confirm the canonical URL strategy matches the production domain before launch.
4. Open the homepage, sitemap, robots file, and main tool pages on the production domain.

## Google Search Console

After production HTTPS is available:

1. Add the production domain property in Google Search Console.
2. Verify ownership using the DNS method or another approved method.
3. Submit `/sitemap.xml`.
4. Use URL Inspection on the homepage and main tool pages.
5. Confirm pages are not blocked by `/robots.txt`.

## IndexNow

Crawler Hints is enabled in Cloudflare for automatic IndexNow hints.

The project also includes a manual IndexNow submission script for deployments that add, update, or delete SEO pages:

```bash
pnpm indexnow
```

The script reads URLs from `public/sitemap.xml`, verifies the URLs match the sitemap host, reads the key from `public/indexnow-key.txt`, and posts the URL list to `https://api.indexnow.org/indexnow`.

The public key file must stay reachable at:

```text
https://www.barcode-mint.com/indexnow-key.txt
```

## Launch Smoke Test

Check these production URLs after deployment:

```text
/
/code-128-barcode-generator
/upc-a-barcode-generator
/ean-13-barcode-generator
/bulk-barcode-generator
/barcode-generator-for-excel
/barcode-label-generator
/printable-barcode-generator
/privacy
/terms
/sitemap.xml
/robots.txt
```

For the main tool pages, confirm:

- A valid barcode can be previewed.
- Invalid input shows a clear error.
- PNG, SVG, or PDF exports work where supported.
- No severe console error appears during normal use.
- Related Tools navigation works.
