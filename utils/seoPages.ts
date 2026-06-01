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

export const SITE_URL = 'https://www.barcode-mint.com'

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

const excelTool: RelatedTool = {
  title: 'Barcode Generator for Excel',
  description: 'Paste rows from Excel or Google Sheets and generate barcodes from spreadsheet columns.',
  path: '/barcode-generator-for-excel'
}

const labelTool: RelatedTool = {
  title: 'Barcode Label Generator',
  description: 'Create printable barcode labels with simple product and inventory templates.',
  path: '/barcode-label-generator'
}

const printableTool: RelatedTool = {
  title: 'Printable Barcode Generator',
  description: 'Export barcode labels as print-ready US Letter or A4 PDF sheets.',
  path: '/printable-barcode-generator'
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
    relatedTools: [code128Tool, upcATool, ean13Tool, bulkTool, excelTool, labelTool]
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
    relatedTools: [homeTool, upcATool, ean13Tool, bulkTool, excelTool, labelTool]
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
    relatedTools: [homeTool, code128Tool, ean13Tool, bulkTool, excelTool, labelTool]
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
    relatedTools: [homeTool, code128Tool, upcATool, bulkTool, excelTool, labelTool]
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
    relatedTools: [homeTool, code128Tool, upcATool, ean13Tool, excelTool, labelTool]
  },
  excel: {
    path: '/barcode-generator-for-excel',
    title: 'Barcode Generator for Excel | Create Barcodes from Spreadsheets',
    description:
      'Paste your Excel or Google Sheets product list and generate barcodes in bulk. Map barcode values, label text, and extra text from spreadsheet columns.',
    h1: 'Barcode Generator for Excel',
    subtitle: 'Paste your Excel or Google Sheets product list and generate barcodes in bulk.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU001',
    sections: [
      {
        title: 'Paste rows from Excel or Google Sheets',
        body: 'Copy spreadsheet rows and paste them directly into the tool. Tab-delimited rows from spreadsheet apps and comma-separated rows are parsed automatically.'
      },
      {
        title: 'Simple column mapping',
        body: 'Column 1 is used as the barcode value, column 2 as label text, and column 3 as extra text for product notes such as price or variant.'
      },
      {
        title: 'Check spreadsheet rows before exporting',
        body: 'Each row is validated against the selected barcode type so invalid product codes are marked before you export a printable PDF.'
      }
    ],
    faqs: [
      {
        question: 'Can I upload an Excel file?',
        answer: 'No. For the MVP, copy rows from Excel or Google Sheets and paste them into the browser-based tool.'
      },
      {
        question: 'Which columns does the Excel barcode generator use?',
        answer: 'The first column is Barcode Value, the second column is Label Text, and the third column is Extra Text.'
      },
      {
        question: 'Are spreadsheet rows uploaded to a server?',
        answer: 'No. The pasted rows are parsed and validated in your browser.'
      }
    ],
    relatedTools: [homeTool, bulkTool, labelTool, code128Tool, upcATool]
  },
  label: {
    path: '/barcode-label-generator',
    title: 'Barcode Label Generator | Print Barcode Labels Online',
    description:
      'Create printable barcode labels for products, inventory, shelves, and small business workflows. Choose a basic label template and export PDF sheets.',
    h1: 'Barcode Label Generator',
    subtitle: 'Create printable barcode labels for products, inventory, shelves, and small business workflows.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU001',
    sections: [
      {
        title: 'Design simple barcode labels',
        body: 'Choose Simple, Product, or Inventory templates and preview the barcode label before exporting a PDF sheet.'
      },
      {
        title: 'Basic label sizes',
        body: 'The MVP supports 2 x 1 inch and 3 x 2 inch labels on US Letter or A4 paper.'
      },
      {
        title: 'Printable PDF sheets',
        body: 'Valid barcode labels can be exported as a basic print-ready PDF with repeated labels on the selected paper size.'
      }
    ],
    faqs: [
      {
        question: 'Which label templates are available?',
        answer: 'The MVP includes Simple, Product, and Inventory barcode label templates.'
      },
      {
        question: 'Can I choose A4 paper?',
        answer: 'Yes. You can export label sheets for US Letter or A4 paper.'
      },
      {
        question: 'Does this include Avery templates?',
        answer: 'No. Advanced Avery templates are outside the MVP scope.'
      }
    ],
    relatedTools: [printableTool, homeTool, bulkTool, excelTool, code128Tool]
  },
  printable: {
    path: '/printable-barcode-generator',
    title: 'Printable Barcode Generator | Export Barcode Labels as PDF',
    description:
      'Create printable barcodes and barcode labels as PDF for products and inventory. Choose label size, paper size, and a basic label template.',
    h1: 'Printable Barcode Generator',
    subtitle: 'Create printable barcodes and barcode labels as PDF for products and inventory.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU001',
    sections: [
      {
        title: 'Export barcode labels as PDF',
        body: 'Create a barcode label preview, then export repeated labels on US Letter or A4 paper.'
      },
      {
        title: 'Choose a print-friendly layout',
        body: 'Use 2 x 1 inch labels for compact SKU labels or 3 x 2 inch labels when product or location text needs more room.'
      },
      {
        title: 'Browser-based label generation',
        body: 'The barcode and label PDF are generated in your browser without uploading your barcode value.'
      }
    ],
    faqs: [
      {
        question: 'Can I export a printable PDF?',
        answer: 'Yes. Valid barcode labels can be exported as a basic PDF label sheet.'
      },
      {
        question: 'Which paper sizes are supported?',
        answer: 'The printable generator supports US Letter and A4 paper in the MVP.'
      },
      {
        question: 'Should I use Fit to page when printing?',
        answer: 'No. For best results, print at 100% scale and disable Fit to page.'
      }
    ],
    relatedTools: [labelTool, homeTool, bulkTool, excelTool, code128Tool]
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
