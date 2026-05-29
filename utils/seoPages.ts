import type { BarcodeType } from './barcodeTypes'

export interface FaqItem {
  question: string
  answer: string
}

export interface RelatedTool {
  title: string
  description: string
  path: string
}

export interface ToolPageContent {
  path: string
  title: string
  description: string
  h1: string
  subtitle: string
  trustNote: string
  defaultType: BarcodeType
  defaultValue: string
  sections: Array<{
    title: string
    body: string
  }>
  faqs: FaqItem[]
  relatedTools: RelatedTool[]
}

export const SITE_URL = 'https://barcode-generator.pages.dev'

const commonTrustNote = 'No sign-up required · Works in your browser · PNG, SVG, PDF'

const homeTool: RelatedTool = {
  title: 'Free Barcode Generator',
  description: 'Create Code 128, UPC-A, and EAN-13 barcodes online.',
  path: '/'
}

const code128Tool: RelatedTool = {
  title: 'Code 128 Barcode Generator',
  description: 'Best for SKUs, inventory IDs, and internal product codes.',
  path: '/code-128-barcode-generator'
}

const upcATool: RelatedTool = {
  title: 'UPC-A Barcode Generator',
  description: 'Create 12-digit retail product barcodes for US products.',
  path: '/upc-a-barcode-generator'
}

const ean13Tool: RelatedTool = {
  title: 'EAN-13 Barcode Generator',
  description: 'Generate 13-digit international retail product barcodes.',
  path: '/ean-13-barcode-generator'
}

const bulkTool: RelatedTool = {
  title: 'Bulk Barcode Generator',
  description: 'Paste up to 100 values and generate barcode previews in one batch.',
  path: '/bulk-barcode-generator'
}

export const toolPages = {
  home: {
    path: '/',
    title: 'Free Barcode Generator | Create Barcode Labels Online',
    description:
      'Create free barcodes online for products, inventory, and labels. Generate Code 128, UPC-A, and EAN-13 barcodes and download as PNG, SVG, or PDF.',
    h1: 'Free Barcode Generator for Products, Inventory, and Labels',
    subtitle:
      'Create single or bulk barcodes online. Import SKUs from Excel and export printable barcode labels as PNG, SVG, or PDF.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU-001',
    sections: [
      {
        title: 'How to use this barcode generator',
        body: 'Choose a barcode type, enter your value, confirm the preview, then download a print-ready PNG, SVG, or PDF.'
      },
      {
        title: 'Supported barcode types',
        body: 'Use Code 128 for custom SKUs and inventory labels, UPC-A for US retail products, and EAN-13 for international product codes.'
      },
      {
        title: 'Printable barcode labels',
        body: 'Exports use a white background and clear barcode bars so the files are suitable for basic product and inventory label printing.'
      }
    ],
    faqs: [
      {
        question: 'Can I generate a barcode without signing up?',
        answer: 'Yes. The generator works in your browser and does not require an account.'
      },
      {
        question: 'Which barcode type should I use for SKUs?',
        answer: 'Code 128 is usually best for custom SKUs, inventory IDs, and values that include letters or symbols.'
      },
      {
        question: 'Can I download the barcode for printing?',
        answer: 'Yes. Valid barcodes can be downloaded as PNG, SVG, or a basic printable PDF.'
      }
    ],
    relatedTools: [code128Tool, upcATool, ean13Tool, bulkTool]
  },
  code128: {
    path: '/code-128-barcode-generator',
    title: 'Code 128 Barcode Generator | Free Online Barcode Tool',
    description:
      'Generate Code 128 barcodes online for SKUs, inventory labels, and product codes. Preview instantly and download as PNG, SVG, or PDF.',
    h1: 'Code 128 Barcode Generator',
    subtitle:
      'Generate Code 128 barcodes for SKUs, inventory labels, and product codes. Download as PNG, SVG, or PDF.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU-001',
    sections: [
      {
        title: 'Best for SKUs and inventory labels',
        body: 'Code 128 supports letters, numbers, spaces, and common symbols, making it a practical choice for internal product and inventory codes.'
      },
      {
        title: 'How to create a Code 128 barcode',
        body: 'Enter a value such as SKU-001, review the live preview, then download the barcode as PNG, SVG, or PDF.'
      },
      {
        title: 'When to choose another barcode',
        body: 'Use UPC-A for 12-digit US retail product codes or EAN-13 for 13-digit international retail product codes.'
      }
    ],
    faqs: [
      {
        question: 'What is Code 128 best used for?',
        answer: 'Code 128 is best for SKUs, inventory labels, asset IDs, cartons, and internal tracking codes.'
      },
      {
        question: 'Can Code 128 include letters?',
        answer: 'Yes. Code 128 supports letters, numbers, spaces, and common symbols up to 80 characters in this tool.'
      },
      {
        question: 'Is Code 128 the same as UPC-A?',
        answer: 'No. Code 128 is flexible for custom values, while UPC-A is a strict 12-digit retail product barcode.'
      }
    ],
    relatedTools: [homeTool, upcATool, ean13Tool, bulkTool]
  },
  upcA: {
    path: '/upc-a-barcode-generator',
    title: 'UPC-A Barcode Generator | Free Online UPC Barcode Tool',
    description:
      'Create UPC-A barcodes online for 12-digit US retail product codes. Calculate check digits and download PNG, SVG, or PDF files.',
    h1: 'UPC-A Barcode Generator',
    subtitle: 'Create UPC-A barcodes online and download them as PNG, SVG, or PDF.',
    trustNote: commonTrustNote,
    defaultType: 'upc-a',
    defaultValue: '03600029145',
    sections: [
      {
        title: 'Create 12-digit UPC-A barcodes',
        body: 'UPC-A is commonly used for retail products in the United States and requires numeric input only.'
      },
      {
        title: 'Check digit support',
        body: 'Enter 11 digits to calculate the final check digit automatically, or enter all 12 digits to validate the barcode.'
      },
      {
        title: 'Use Code 128 for custom SKUs',
        body: 'If your value contains letters, dashes, or other symbols, switch to Code 128 instead of UPC-A.'
      }
    ],
    faqs: [
      {
        question: 'Can this tool calculate a UPC-A check digit?',
        answer: 'Yes. Enter the first 11 digits and the tool will calculate the 12th check digit.'
      },
      {
        question: 'Why does UPC-A reject letters?',
        answer: 'UPC-A is a numeric retail barcode format, so letters and symbols are not valid UPC-A values.'
      },
      {
        question: 'Can I download a UPC-A barcode as SVG?',
        answer: 'Yes. After the UPC-A value is valid, you can download PNG, SVG, or PDF.'
      }
    ],
    relatedTools: [homeTool, code128Tool, ean13Tool, bulkTool]
  },
  ean13: {
    path: '/ean-13-barcode-generator',
    title: 'EAN-13 Barcode Generator | Free Online EAN Barcode Tool',
    description:
      'Create EAN-13 barcodes online for international product codes. Validate or calculate check digits and download PNG, SVG, or PDF.',
    h1: 'EAN-13 Barcode Generator',
    subtitle: 'Create EAN-13 barcodes online for international product codes.',
    trustNote: commonTrustNote,
    defaultType: 'ean-13',
    defaultValue: '590123412345',
    sections: [
      {
        title: 'Generate international product barcodes',
        body: 'EAN-13 is a 13-digit retail barcode format used for products in many markets outside the United States.'
      },
      {
        title: 'Automatic EAN-13 check digit',
        body: 'Enter 12 digits to calculate the 13th check digit automatically, or enter 13 digits to validate the full code.'
      },
      {
        title: 'Download print-ready files',
        body: 'Once the EAN-13 value is valid, export the barcode as PNG, SVG, or a basic printable PDF.'
      }
    ],
    faqs: [
      {
        question: 'How many digits does EAN-13 require?',
        answer: 'EAN-13 requires 13 numeric digits. You can enter 12 digits and let the tool calculate the final check digit.'
      },
      {
        question: 'Is EAN-13 different from UPC-A?',
        answer: 'Yes. UPC-A is a 12-digit format commonly used in the United States, while EAN-13 uses 13 digits for international retail products.'
      },
      {
        question: 'Can EAN-13 contain letters?',
        answer: 'No. EAN-13 only supports numeric digits. Use Code 128 for custom alphanumeric values.'
      }
    ],
    relatedTools: [homeTool, code128Tool, upcATool, bulkTool]
  },
  bulk: {
    path: '/bulk-barcode-generator',
    title: 'Bulk Barcode Generator | Generate Up to 100 Barcodes Online',
    description:
      'Paste multiple barcode values and generate up to 100 Code 128, UPC-A, or EAN-13 barcodes online. Preview valid rows and export a printable PDF.',
    h1: 'Bulk Barcode Generator',
    subtitle:
      'Paste one barcode value per line, validate up to 100 rows, preview each barcode, and export a basic printable PDF.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU001',
    sections: [
      {
        title: 'Generate many barcodes at once',
        body: 'Paste one SKU, inventory ID, UPC-A value, or EAN-13 value per line and generate a batch preview without uploading your data.'
      },
      {
        title: 'Fix invalid rows quickly',
        body: 'Each row is checked against the selected barcode type, with clear error messages for values that need to be corrected.'
      },
      {
        title: 'Export a basic printable PDF',
        body: 'Valid rows can be exported into a simple US Letter PDF with barcode values shown under each barcode.'
      }
    ],
    faqs: [
      {
        question: 'How many barcodes can I generate at once?',
        answer: 'This bulk generator supports up to 100 barcode values at a time for the MVP.'
      },
      {
        question: 'What format should I paste?',
        answer: 'Paste one barcode value per line, such as SKU001, SKU002, and SKU003.'
      },
      {
        question: 'What happens to invalid rows?',
        answer: 'Invalid rows are marked with an error message. Valid rows can still be previewed and exported.'
      }
    ],
    relatedTools: [homeTool, code128Tool, upcATool, ean13Tool]
  }
} satisfies Record<string, ToolPageContent>

export function absoluteUrl(path: string, siteUrl = SITE_URL): string {
  return new URL(path, siteUrl).toString()
}

export function buildToolPageSchema(page: ToolPageContent, siteUrl = SITE_URL): unknown[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: page.h1,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: absoluteUrl(page.path, siteUrl),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: absoluteUrl('/', siteUrl)
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.h1,
          item: absoluteUrl(page.path, siteUrl)
        }
      ]
    }
  ]
}
