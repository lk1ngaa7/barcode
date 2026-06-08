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
    items?: string[]
    links?: RelatedTool[]
    table?: {
      headers: string[]
      rows: string[][]
    }
  }>
  faqs: FaqItem[]
  relatedTools: RelatedTool[]
  featuredTools?: RelatedTool[]
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

const code39Tool: RelatedTool = {
  title: 'Code 39 Barcode Generator',
  description: 'Create Code 39 barcodes for inventory, industrial labels, and logistics.',
  path: '/code-39-barcode-generator'
}

const itfTool: RelatedTool = {
  title: 'ITF Barcode Generator',
  description: 'Generate Interleaved 2 of 5 barcodes for cartons, shipping boxes, and packaging.',
  path: '/itf-barcode-generator'
}

const bulkTool: RelatedTool = {
  title: 'Bulk Barcode Generator',
  description: 'Generate multiple barcodes from a list of values and export them for printing.',
  path: '/bulk-barcode-generator'
}

const excelTool: RelatedTool = {
  title: 'Barcode Generator for Excel',
  description: 'Paste rows from Excel or Google Sheets and generate barcodes in bulk.',
  path: '/barcode-generator-for-excel'
}

const labelTool: RelatedTool = {
  title: 'Barcode Label Generator',
  description: 'Create printable barcode labels for products, SKUs, inventory, and retail items.',
  path: '/barcode-label-generator'
}

const printableTool: RelatedTool = {
  title: 'Printable Barcode Generator',
  description: 'Generate and print barcodes online as PNG, SVG, or PDF.',
  path: '/printable-barcode-generator'
}

const skuTool: RelatedTool = {
  title: 'SKU Barcode Generator',
  description: 'Create Code 128 barcodes for custom SKU and inventory codes.',
  path: '/sku-barcode-generator'
}

export const toolPages = {
  home: {
    path: '/',
    title: 'Free Barcode Generator for Products, Inventory, and Labels | Barcode Mint',
    description:
      'Create free barcodes online for products, inventory, and labels. Generate Code 128, UPC-A, and EAN-13 barcodes and download as PNG, SVG, or PDF.',
    h1: 'Free Barcode Generator for Products, Inventory, and Labels',
    subtitle:
      'Create single or bulk barcodes online. Import SKUs from Excel and export printable barcode labels as PNG, SVG, or PDF.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU-001',
    featuredTools: [
      {
        title: 'Printable Barcode Generator',
        description: 'Generate and print barcodes online as PNG, SVG, or PDF.',
        path: '/printable-barcode-generator'
      },
      {
        title: 'Barcode Label Generator',
        description: 'Create printable barcode labels for products, SKUs, inventory, and retail items.',
        path: '/barcode-label-generator'
      },
      {
        title: 'SKU Barcode Generator',
        description: 'Create Code 128 barcodes for custom SKU and inventory codes.',
        path: '/sku-barcode-generator'
      },
      {
        title: 'Barcode Generator for Excel',
        description: 'Paste rows from Excel or Google Sheets and generate barcodes in bulk.',
        path: '/barcode-generator-for-excel'
      },
      {
        title: 'Bulk Barcode Generator',
        description: 'Generate multiple barcodes from a list of values and export them for printing.',
        path: '/bulk-barcode-generator'
      }
    ],
    sections: [
      {
        title: 'How to use this barcode generator',
        body: 'Choose a barcode type, enter your value, confirm the preview, then download a print-ready PNG, SVG, or PDF.'
      },
      {
        title: 'Supported barcode types',
        body: 'Use Code 128 or Code 39 for custom SKUs and inventory labels, UPC-A for US retail products, EAN-13 for international product codes, and ITF for cartons or packaging.'
      },
      {
        title: 'Printable barcode labels',
        body: 'Exports use a white background and clear barcode bars so the files are suitable for basic product and inventory label printing.'
      },
      {
        title: 'Common ways to use Barcode Mint',
        body: 'Create product SKU labels, warehouse inventory labels, retail UPC and EAN barcodes, Excel-based bulk barcode batches, and printable barcode label sheets.'
      }
    ],
    faqs: [
      {
        question: 'What barcode types can I generate?',
        answer: 'You can generate Code 128, UPC-A, EAN-13, Code 39, and ITF barcodes from the main tool.'
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
    relatedTools: [printableTool, labelTool, skuTool, bulkTool, excelTool, code128Tool, upcATool, ean13Tool]
  },
  code128: {
    path: '/code-128-barcode-generator',
    title: 'Free Code 128 Barcode Generator | Barcode Mint',
    description:
      'Generate Code 128 barcodes online for SKUs, inventory labels, and product codes. Preview instantly and download as PNG, SVG, or PDF.',
    h1: 'Free Code 128 Barcode Generator',
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
    relatedTools: [skuTool, homeTool, upcATool, ean13Tool, code39Tool, itfTool, bulkTool, excelTool, labelTool]
  },
  sku: {
    path: '/sku-barcode-generator',
    title: 'Free SKU Barcode Generator - Create Barcodes for Inventory and Products',
    description:
      'Create SKU barcodes online for products, inventory, and warehouse labels. Use Code 128 for custom SKU values and export as PNG, SVG, or PDF.',
    h1: 'Free SKU Barcode Generator',
    subtitle: 'Create Code 128 barcodes for custom SKU values, product codes, and inventory labels.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU-001',
    sections: [
      {
        title: 'What is a SKU barcode?',
        body: 'A SKU barcode is a scannable version of your own stock keeping unit. It helps small businesses, warehouses, and retail teams track products, shelves, assets, and internal inventory without turning the SKU itself into a retail UPC or EAN code.'
      },
      {
        title: 'Best barcode type for SKUs',
        body: 'Code 128 is usually the best barcode type for custom SKU values because it supports letters, numbers, and symbols.',
        items: [
          'Use Code 128 for SKU-001, ITEM-XL-2026, BLACK-TSHIRT-M, and similar internal values.',
          'Use UPC-A for standard 12-digit US retail product codes.',
          'Use EAN-13 for standard 13-digit international retail product codes.'
        ],
        links: [code128Tool]
      },
      {
        title: 'SKU barcode examples',
        body: 'These are common SKU and inventory code patterns that work well as Code 128 barcodes.',
        items: ['SKU-001', 'ITEM-2026-XL', 'BLACK-TSHIRT-M', 'WAREHOUSE-A-1001']
      },
      {
        title: 'Bulk SKU barcode generation',
        body: 'For product catalogs, warehouse labels, or SKU sheets, paste many SKU values at once and export printable barcode labels or spreadsheet-based batches.',
        links: [bulkTool, excelTool, labelTool]
      }
    ],
    faqs: [
      {
        question: 'What barcode type should I use for SKUs?',
        answer: 'Code 128 is usually the best choice for SKU barcodes because it supports letters, numbers, dashes, underscores, and other common SKU characters.'
      },
      {
        question: 'Can a SKU contain letters and numbers?',
        answer: 'Yes. Many SKU values mix letters and numbers, such as SKU-001 or BLACK-TSHIRT-M. Use Code 128 for these custom alphanumeric values.'
      },
      {
        question: 'Can I create SKU barcode labels?',
        answer: 'Yes. Generate a SKU barcode, then use the Barcode Label Generator to create product, inventory, or warehouse labels as printable PDF sheets.'
      },
      {
        question: 'Can I generate SKU barcodes in bulk?',
        answer: 'Yes. Use the Bulk Barcode Generator for one SKU per line, or the Barcode Generator for Excel when your SKUs are stored in a spreadsheet.'
      },
      {
        question: 'Should I use Code 128, UPC, or EAN for SKUs?',
        answer: 'Use Code 128 for your own SKU or inventory codes. Use UPC-A or EAN-13 only when you have standard numeric retail product codes.'
      }
    ],
    relatedTools: [code128Tool, bulkTool, labelTool, excelTool, printableTool]
  },
  upcA: {
    path: '/upc-a-barcode-generator',
    title: 'Free UPC-A Barcode Generator | Barcode Mint',
    description:
      'Create UPC-A barcodes online for 12-digit US retail product codes. Calculate check digits and download PNG, SVG, or PDF files.',
    h1: 'Free UPC-A Barcode Generator',
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
    relatedTools: [homeTool, code128Tool, ean13Tool, code39Tool, itfTool, bulkTool, excelTool, labelTool]
  },
  ean13: {
    path: '/ean-13-barcode-generator',
    title: 'Free EAN-13 Barcode Generator | Barcode Mint',
    description:
      'Create EAN-13 barcodes online for international product codes. Validate or calculate check digits and download PNG, SVG, or PDF.',
    h1: 'Free EAN-13 Barcode Generator',
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
    relatedTools: [homeTool, code128Tool, upcATool, code39Tool, itfTool, bulkTool, excelTool, labelTool]
  },
  code39: {
    path: '/code-39-barcode-generator',
    title: 'Free Code 39 Barcode Generator | Barcode Mint',
    description:
      'Create Code 39 barcodes online for inventory, industrial labels, and logistics. Free browser-based barcode generator with PNG and SVG downloads.',
    h1: 'Free Code 39 Barcode Generator',
    subtitle:
      'Create Code 39 barcodes online for inventory, industrial labels, and logistics. Download PNG, SVG, or PDF files.',
    trustNote: commonTrustNote,
    defaultType: 'code39',
    defaultValue: 'SKU-001',
    sections: [
      {
        title: 'Code 39 for inventory and logistics',
        body: 'Code 39 is commonly used for inventory, industrial labels, and logistics. It supports uppercase letters, numbers, spaces, and a limited set of symbols.'
      },
      {
        title: 'Supported Code 39 characters',
        body: 'Use uppercase A-Z, numbers, spaces, and these symbols: - . $ / + %. Lowercase input is converted to uppercase before preview and download.'
      },
      {
        title: 'Download printable files',
        body: 'Generate a live preview in your browser and download the Code 39 barcode as a high-resolution PNG or scalable SVG.'
      }
    ],
    faqs: [
      {
        question: 'What is Code 39 used for?',
        answer: 'Code 39 is commonly used for inventory, industrial labels, logistics, asset tags, and simple alphanumeric tracking codes.'
      },
      {
        question: 'Can Code 39 encode lowercase letters?',
        answer: 'This tool converts lowercase input to uppercase because standard Code 39 supports uppercase letters, numbers, spaces, and a limited symbol set.'
      },
      {
        question: 'Which symbols does Code 39 support?',
        answer: 'Code 39 supports spaces and these symbols in this tool: - . $ / + %.'
      },
      {
        question: 'Can I download Code 39 as SVG?',
        answer: 'Yes. Valid Code 39 values can be downloaded as SVG or PNG from the browser.'
      }
    ],
    relatedTools: [homeTool, code128Tool, itfTool, bulkTool, excelTool, labelTool]
  },
  itf: {
    path: '/itf-barcode-generator',
    title: 'Free ITF Barcode Generator | Interleaved 2 of 5 | Barcode Mint',
    description:
      'Generate ITF and Interleaved 2 of 5 barcodes online for cartons, shipping boxes, and warehouse packaging. Free PNG and SVG downloads.',
    h1: 'Free ITF Barcode Generator',
    subtitle:
      'Generate ITF and Interleaved 2 of 5 barcodes online for cartons, shipping boxes, and warehouse packaging.',
    trustNote: commonTrustNote,
    defaultType: 'itf',
    defaultValue: '123456',
    sections: [
      {
        title: 'ITF for cartons and packaging',
        body: 'ITF, also known as Interleaved 2 of 5, is commonly used for cartons, shipping boxes, and warehouse packaging. It encodes numeric values only.'
      },
      {
        title: 'Use an even number of digits',
        body: 'ITF usually requires an even number of digits because pairs of digits are interleaved into the barcode pattern.'
      },
      {
        title: 'Browser-based exports',
        body: 'Validate the numeric value locally in your browser, then download a PNG or SVG barcode file for printing and packaging workflows.'
      }
    ],
    faqs: [
      {
        question: 'What is ITF used for?',
        answer: 'ITF is commonly used for cartons, shipping boxes, warehouse packaging, and numeric logistics codes.'
      },
      {
        question: 'Can ITF encode letters?',
        answer: 'No. ITF encodes numeric values only. Use Code 128 or Code 39 for letters and SKU-style values.'
      },
      {
        question: 'Why does ITF need an even number of digits?',
        answer: 'Interleaved 2 of 5 encodes digits in pairs, so an odd number of digits should usually be fixed by adding a leading zero or checking the source code.'
      },
      {
        question: 'Can I download ITF as SVG?',
        answer: 'Yes. Valid ITF values can be downloaded as SVG or PNG from the browser.'
      }
    ],
    relatedTools: [homeTool, code128Tool, code39Tool, bulkTool, excelTool, labelTool]
  },
  bulk: {
    path: '/bulk-barcode-generator',
    title: 'Bulk Barcode Generator | Create Multiple Barcodes Online',
    description:
      'Paste multiple barcode values and generate up to 100 Code 128, UPC-A, or EAN-13 barcodes online. Create batches from lists, Excel rows, or SKU values.',
    h1: 'Bulk Barcode Generator',
    subtitle:
      'Generate multiple barcodes from a list of values. Paste one value per line, review invalid rows, and export a printable PDF.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU-001',
    sections: [
      {
        title: 'Generate many barcodes at once',
        body: 'Paste one SKU, inventory ID, UPC-A value, or EAN-13 value per line and generate a batch preview without uploading your data.',
        items: [
          'Use one barcode value per line.',
          'Generate up to 100 rows at a time.',
          'Fix invalid rows before exporting the final PDF.'
        ]
      },
      {
        title: 'Paste from Excel or Google Sheets',
        body: 'You can paste a simple list here, or use the Barcode Generator for Excel when your spreadsheet also includes label text, prices, variants, or extra columns.',
        links: [excelTool]
      },
      {
        title: 'Export a basic printable PDF',
        body: 'Valid rows can be exported into a simple US Letter PDF with barcode values shown under each barcode. For product or inventory label layouts, use the Barcode Label Generator.',
        links: [labelTool]
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
    relatedTools: [excelTool, labelTool, skuTool, printableTool, code128Tool, homeTool]
  },
  excel: {
    path: '/barcode-generator-for-excel',
    title: 'Barcode Generator for Excel - Paste Spreadsheet Rows and Create Barcodes',
    description:
      'Paste product codes or SKUs from Excel or Google Sheets and generate barcodes in bulk. Export barcode images or printable PDF sheets online.',
    h1: 'Barcode Generator for Excel',
    subtitle: 'Paste your Excel or Google Sheets product list and generate barcodes in bulk.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU-001',
    sections: [
      {
        title: 'Paste rows from Excel or Google Sheets',
        body: 'Copy and paste rows directly from Excel or Google Sheets. The first column should contain the barcode value, and the second column can be used as optional label text.',
        table: {
          headers: ['Barcode Value', 'Label Text'],
          rows: [
            ['SKU-001', 'Black T-Shirt'],
            ['SKU-002', 'White Mug'],
            ['SKU-003', 'Product Box']
          ]
        }
      },
      {
        title: 'How to generate barcodes from Excel',
        body: 'Prepare your spreadsheet rows, paste them into the bulk barcode input, review the validation result, and export only the valid rows.',
        items: [
          'Prepare your product codes or SKUs in Excel.',
          'Copy the rows from your spreadsheet.',
          'Paste them into the bulk barcode input.',
          'Review valid and invalid rows.',
          'Export valid rows as a PDF sheet or download individual SVG files.'
        ],
        links: [bulkTool]
      },
      {
        title: 'Excel and Google Sheets support',
        body: 'This spreadsheet barcode generator supports tab-delimited rows from Excel, copied rows from Google Sheets, and comma-separated rows for simple product lists.',
        items: [
          'Column 1 becomes the Barcode Value.',
          'Column 2 becomes optional Label Text.',
          'Column 3 becomes optional Extra Text.'
        ],
        links: [labelTool, skuTool]
      }
    ],
    faqs: [
      {
        question: 'Can I paste barcode values from Excel?',
        answer: 'Yes. Copy rows from Excel and paste them directly into the browser-based tool. The first column is treated as the barcode value.'
      },
      {
        question: 'Can I use Google Sheets with this barcode generator?',
        answer: 'Yes. Copy rows from Google Sheets and paste them into the page. Tab-delimited spreadsheet rows are parsed automatically in your browser.'
      },
      {
        question: 'What column format should I use?',
        answer: 'Use column 1 for Barcode Value, column 2 for optional Label Text, and column 3 for optional Extra Text such as price, variant, or location.'
      },
      {
        question: 'Can I generate barcodes in bulk from a spreadsheet?',
        answer: 'Yes. Paste up to 100 spreadsheet rows, choose the barcode type, and generate a validated batch preview before export.'
      },
      {
        question: 'Can I export spreadsheet barcodes as PDF?',
        answer: 'Yes. Valid spreadsheet rows can be exported as a basic printable PDF sheet. Invalid rows need to be fixed before they are included.'
      }
    ],
    relatedTools: [bulkTool, labelTool, skuTool, printableTool, code128Tool]
  },
  label: {
    path: '/barcode-label-generator',
    title: 'Free Barcode Label Generator - Create and Print Barcode Labels',
    description:
      'Create printable barcode labels for products, SKUs, and inventory. Generate barcode label sheets for US Letter or A4 paper and export as PDF.',
    h1: 'Free Barcode Label Generator',
    subtitle:
      'Create printable barcode labels for products, SKUs, inventory, and retail items. Export label sheets as PDF for US Letter or A4 paper.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU-001',
    sections: [
      {
        title: 'Create printable barcode labels',
        body: 'Use this barcode label generator for product barcode labels, SKU barcode labels, inventory barcode labels, and retail item labels that need a clean scannable code plus readable text.',
        items: [
          'Simple labels for a barcode value.',
          'Product labels with product names and SKUs.',
          'Inventory labels with item and location text.'
        ],
        links: [skuTool]
      },
      {
        title: 'US Letter and A4 label sheets',
        body: 'Choose US Letter or A4 paper, select a 2 x 1 inch or 3 x 2 inch label size, and export labels as PDF for office printers.',
        links: [printableTool]
      },
      {
        title: 'Print settings for barcode labels',
        body: 'For best scanning results, print barcode label sheets at 100% scale, disable Fit to page, and test one sheet before printing many labels.',
        links: [excelTool, bulkTool]
      }
    ],
    faqs: [
      {
        question: 'Can I print barcode labels on US Letter paper?',
        answer: 'Yes. Choose US Letter as the paper size, export the label sheet as PDF, and print at 100% scale.'
      },
      {
        question: 'Can I create barcode labels for SKUs?',
        answer: 'Yes. Code 128 is recommended for SKU barcode labels because it supports letters, numbers, dashes, and common SKU characters.'
      },
      {
        question: 'Can I export barcode labels as PDF?',
        answer: 'Yes. Valid barcode labels can be exported as a PDF sheet for US Letter or A4 paper.'
      },
      {
        question: 'What barcode type should I use for inventory labels?',
        answer: 'Use Code 128 for most inventory labels and SKU labels. Use UPC-A or EAN-13 only for standard retail product codes.'
      },
      {
        question: 'Can I paste values from Excel to create labels?',
        answer: 'Yes. Use the Barcode Generator for Excel when your pasted rows include barcode values, label text, or extra product details.'
      }
    ],
    relatedTools: [skuTool, printableTool, excelTool, bulkTool, code128Tool]
  },
  printable: {
    path: '/printable-barcode-generator',
    title: 'Free Printable Barcode Generator - Generate and Print Barcodes Online',
    description:
      'Generate printable barcodes online for products, SKUs, and inventory. Download PNG or SVG files, or export barcodes as print-ready PDF.',
    h1: 'Free Printable Barcode Generator',
    subtitle: 'Generate barcodes online and print them as PNG, SVG, or PDF files. No sign-up required.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU-001',
    sections: [
      {
        title: 'How to print a barcode online',
        body: 'Create a barcode in the browser, download the file format that matches your workflow, and print with scaling turned off.',
        items: [
          'Choose a barcode type.',
          'Enter your barcode value.',
          'Preview the barcode.',
          'Download PNG, SVG, or PDF.',
          'Print at 100% scale for best results.'
        ]
      },
      {
        title: 'Printable barcode formats',
        body: 'Choose PNG, SVG, or PDF depending on how you plan to print or reuse the barcode.',
        items: [
          'PNG: quick image download for documents and simple labels.',
          'SVG: scalable barcode for design tools and print layouts.',
          'PDF: best for printing barcode labels or sheets.'
        ],
        links: [labelTool]
      },
      {
        title: 'Printing tips',
        body: 'Use high contrast black bars on a white background, print at 100% scale, disable Fit to page, and test scan one barcode before printing many labels.',
        links: [bulkTool, excelTool]
      }
    ],
    faqs: [
      {
        question: 'Can I print a barcode from this generator?',
        answer: 'Yes. Generate a valid barcode, download PNG or SVG, or export a print-ready PDF and print it from your browser or PDF viewer.'
      },
      {
        question: 'What is the best file format for printing barcodes?',
        answer: 'PDF is usually best for direct printing, SVG is best for scalable design layouts, and PNG is useful for quick image downloads.'
      },
      {
        question: 'Can I export a barcode as PDF?',
        answer: 'Yes. Use the Export PDF button after the barcode value is valid.'
      },
      {
        question: 'Why should I print barcodes at 100% scale?',
        answer: 'Printer scaling can stretch or compress barcode bars. Printing at 100% scale helps keep the barcode easier for scanners to read.'
      },
      {
        question: 'Can I generate and print barcodes without signing up?',
        answer: 'Yes. Barcode Mint works in your browser and does not require sign-up or login.'
      }
    ],
    relatedTools: [labelTool, bulkTool, excelTool, skuTool, code128Tool]
  }
} satisfies Record<string, ToolPageContent>

export function absoluteUrl(path: string, siteUrl = SITE_URL): string {
  return new URL(path, siteUrl).toString()
}

export function buildToolPageSchema(page: ToolPageContent, siteUrl = SITE_URL): unknown[] {
  const pageSchemas: unknown[] = [
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

  if (page.path === '/') {
    pageSchemas.push(
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Barcode Mint',
        url: absoluteUrl('/', siteUrl)
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Barcode Mint',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: absoluteUrl('/', siteUrl),
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      }
    )
  }

  return pageSchemas
}
