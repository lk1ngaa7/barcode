# Data Matrix Research for v1.2

## Current State

The current Barcode Mint implementation uses local TypeScript utilities for one-dimensional barcode generation:

- Code 128
- UPC-A
- EAN-13
- Code 39
- ITF / Interleaved 2 of 5

The project does not currently use a barcode generation dependency such as `bwip-js`. Data Matrix is a two-dimensional barcode format and is not supported by the existing encoder utilities.

## Decision

Data Matrix is not implemented in v1.2.

Reason:

- The existing generator cannot produce real Data Matrix symbols.
- Adding Data Matrix safely requires a mature 2D barcode encoder.
- Creating a page without real Data Matrix output would violate the v1.2 PRD.

## Future Option

Evaluate a lightweight browser-compatible encoder such as `bwip-js` in a separate task. Before shipping Data Matrix, verify:

- Static Nuxt generation still passes.
- Cloudflare Pages deployment remains compatible.
- PNG export works from the real Data Matrix output.
- SVG export is shown only if the selected encoder supports real vector output.
- `/data-matrix-generator` is added to the sitemap only after the feature is real.
