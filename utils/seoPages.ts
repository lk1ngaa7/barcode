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
  description: 'Design product and inventory barcode labels with template fields.',
  path: '/barcode-label-generator'
}

const printableTool: RelatedTool = {
  title: 'Printable Barcode Generator',
  description: 'Create print-ready barcode PDFs for US Letter or A4 paper.',
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
        question: 'What barcode types can I generate?',
        answer: 'You can generate Code 128, UPC-A, and EAN-13 barcodes from the main tool.'
      },
      {
        question: 'Is this barcode generator free to use?',
        answer: 'Yes. The tool is free to use and does not require sign-up or login.'
      },
      {
        question: 'Are barcode values uploaded to a server?',
        answer: 'No. Barcode values are processed in your browser and are not uploaded to our servers.'
      },
      {
        question: 'Can I create barcode labels from this page?',
        answer: 'Yes. You can generate a barcode here, then use the label and printable tools for label layouts and PDF sheets.'
      },
      {
        question: 'Should I use Code 128, UPC-A, or EAN-13?',
        answer: 'Use Code 128 for custom SKUs and inventory IDs, UPC-A for 12-digit US retail product codes, and EAN-13 for 13-digit international product codes.'
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
        question: 'Can Code 128 encode letters and numbers?',
        answer: 'Yes. Code 128 supports letters, numbers, spaces, and common symbols up to 80 characters in this tool.'
      },
      {
        question: 'Is Code 128 good for SKU barcodes?',
        answer: 'Yes. Code 128 is usually the best choice for custom SKUs because it can encode alphanumeric values such as SKU-001.'
      },
      {
        question: 'Can I use Code 128 for inventory labels?',
        answer: 'Yes. Code 128 is well suited for inventory labels, asset tags, shelf labels, cartons, and internal tracking codes.'
      },
      {
        question: 'What is the difference between Code 128 and Code 39?',
        answer: 'Code 128 is more compact and supports a broader character set, while Code 39 is older and commonly used for simpler alphanumeric labels.'
      },
      {
        question: 'Can standard barcode scanners read Code 128?',
        answer: 'Most modern barcode scanners can read Code 128, but you should test printed labels with the scanner and software used in your workflow.'
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
        question: 'How many digits are in a UPC-A barcode?',
        answer: 'A standard UPC-A barcode has 12 numeric digits, including the final check digit.'
      },
      {
        question: 'Can I generate a UPC-A barcode from 11 digits?',
        answer: 'Yes. Enter the first 11 digits and the tool will calculate the 12th check digit automatically.'
      },
      {
        question: 'What is a UPC-A check digit?',
        answer: 'The check digit is the final digit of a UPC-A code. It is calculated from the first 11 digits and helps scanners detect typing or printing errors.'
      },
      {
        question: 'Do I need a GS1 prefix for UPC-A barcodes?',
        answer: 'This tool can create the barcode image, but it does not assign official UPC numbers or GS1 company prefixes. For formal retail use, use a valid UPC from GS1 or a compliant source accepted by your retailer.'
      },
      {
        question: 'Can I use my own SKU as a UPC-A barcode?',
        answer: 'Usually no. UPC-A only supports 12 numeric digits. Use Code 128 for custom SKUs that contain letters, dashes, or internal numbering.'
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
        question: 'How many digits are in an EAN-13 barcode?',
        answer: 'An EAN-13 barcode has 13 numeric digits, including the final check digit.'
      },
      {
        question: 'Can I generate an EAN-13 barcode from 12 digits?',
        answer: 'Yes. Enter the first 12 digits and the tool will calculate the 13th check digit automatically.'
      },
      {
        question: 'What is an EAN-13 check digit?',
        answer: 'The check digit is the final digit of an EAN-13 code. It is calculated from the first 12 digits and helps catch invalid product codes.'
      },
      {
        question: 'What is the difference between EAN-13 and UPC-A?',
        answer: 'UPC-A is a 12-digit format commonly used in the United States, while EAN-13 uses 13 digits for international retail products.'
      },
      {
        question: 'Where are EAN-13 barcodes used?',
        answer: 'EAN-13 is commonly used for retail products in Europe and many other international markets outside the United States.'
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
        question: 'Can I generate multiple barcodes at once?',
        answer: 'Yes. Paste one value per line, choose a barcode type, and generate a batch preview in the browser.'
      },
      {
        question: 'How many barcodes can I generate in one batch?',
        answer: 'This bulk generator supports up to 100 barcode values at a time for the MVP.'
      },
      {
        question: 'Can I paste barcode values from Excel?',
        answer: 'Yes. You can paste one value per line here, or use the Excel barcode generator when you need label text and extra spreadsheet columns.'
      },
      {
        question: 'Can I export bulk barcodes as PDF?',
        answer: 'Yes. Valid rows can be exported as a basic printable PDF, while invalid rows need to be fixed or skipped.'
      },
      {
        question: 'What happens if one row has an invalid barcode value?',
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
        question: 'Can I paste data from Excel or Google Sheets?',
        answer: 'Yes. Copy rows from Excel or Google Sheets and paste them directly into the browser-based tool.'
      },
      {
        question: 'Which Excel column is used as the barcode value?',
        answer: 'Column 1 is used as the Barcode Value. Column 2 becomes Label Text, and column 3 becomes Extra Text.'
      },
      {
        question: 'Do I need to upload an Excel file?',
        answer: 'No. The MVP does not upload xlsx files. Copy the spreadsheet rows and paste them into the page instead.'
      },
      {
        question: 'Is my spreadsheet data uploaded to your server?',
        answer: 'No. The pasted rows are parsed and validated in your browser.'
      },
      {
        question: 'Can I create barcode labels from Excel rows?',
        answer: 'Yes. Spreadsheet rows can include barcode values, label text, and extra text that can be exported in a basic printable PDF.'
      }
    ],
    relatedTools: [homeTool, bulkTool, labelTool, code128Tool, upcATool]
  },
  label: {
    path: '/barcode-label-generator',
    title: 'Barcode Label Generator | Design Product & Inventory Labels',
    description:
      'Create product and inventory barcode labels with product names, SKUs, prices, locations, label sizes, and simple label templates.',
    h1: 'Barcode Label Generator',
    subtitle:
      'Design barcode labels for products, inventory, shelves, and assets with template fields such as product name, SKU, price, and location.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU001',
    sections: [
      {
        title: 'Design product and inventory labels',
        body: 'Choose Simple, Product, or Inventory templates based on what the label needs to show, such as a SKU, product name, or stock location.'
      },
      {
        title: 'Add label details',
        body: 'Use product or item names for product labels and location text for inventory labels, shelf labels, asset tags, and small warehouse workflows.'
      },
      {
        title: 'Pick a simple label layout',
        body: 'Use compact 2 x 1 inch labels for SKUs and small packaging, or 3 x 2 inch labels when product or location text needs more room.'
      }
    ],
    faqs: [
      {
        question: 'What can I include on a barcode label?',
        answer: 'A label can include a barcode value, product or item name, and location text depending on the selected template.'
      },
      {
        question: 'Can I create product barcode labels?',
        answer: 'Yes. Use the Product template to show a product name, barcode, and barcode value on the label.'
      },
      {
        question: 'Can I create inventory barcode labels?',
        answer: 'Yes. Use the Inventory template to show an item name, barcode, location text, and barcode value.'
      },
      {
        question: 'Can I add product names or prices to the label?',
        answer: 'You can add product names in the label field. For price or variant text, use the spreadsheet workflow where extra text can come from a separate column.'
      },
      {
        question: 'What label size should I use for products?',
        answer: 'Use 2 x 1 inch for compact SKU labels and 3 x 2 inch when the label needs more room for product or inventory text.'
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
    title: 'Printable Barcode Generator | Create Print-Ready Barcode PDFs',
    description:
      'Generate print-ready barcode PDFs for US Letter or A4 paper. Choose barcode type, label size, and print at 100% scale for clear scanning.',
    h1: 'Printable Barcode Generator',
    subtitle:
      'Create barcode PDF sheets for printing on US Letter or A4, with clear print settings and 100% scale guidance.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU001',
    sections: [
      {
        title: 'Create print-ready barcode PDFs',
        body: 'Generate repeated barcode labels on a PDF sheet so you can print barcodes from a browser without installing label software.'
      },
      {
        title: 'Use US Letter or A4 paper',
        body: 'Choose the paper size before exporting so the PDF is prepared for common office printers and print workflows.'
      },
      {
        title: 'Print at 100% scale',
        body: 'For clearer scans, print the PDF at 100% scale and disable Fit to page so barcode bars are not resized unexpectedly.'
      }
    ],
    faqs: [
      {
        question: 'How do I print a barcode from a PDF?',
        answer: 'Generate a valid barcode, export the PDF, open it in your PDF viewer, and print it using the selected paper size.'
      },
      {
        question: 'Should I print barcodes at 100% scale?',
        answer: 'Yes. Print at 100% scale and disable Fit to page so the barcode is not stretched or compressed.'
      },
      {
        question: 'Can I export barcodes for US Letter or A4 paper?',
        answer: 'Yes. The printable generator supports US Letter and A4 paper in the MVP.'
      },
      {
        question: 'Why does my printed barcode look blurry?',
        answer: 'Blurry barcodes are often caused by printer scaling, low-quality print settings, or resizing the PDF. Use 100% scale and a clean print mode when possible.'
      },
      {
        question: 'Can I print multiple barcodes on one page?',
        answer: 'Yes. The PDF export repeats the barcode label across the selected paper size when the barcode value is valid.'
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
