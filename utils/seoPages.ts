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

const garmentTool: RelatedTool = {
  title: 'Garment Barcode Generator',
  description: 'Create clothing barcode labels for SKUs, sizes, colors, and apparel inventory.',
  path: '/garment-barcode-generator'
}

const mrpTool: RelatedTool = {
  title: 'MRP Sticker with Barcode Generator',
  description: 'Create printable price stickers with product names, MRP, and barcodes.',
  path: '/mrp-sticker-with-barcode-generator'
}

const lpnTool: RelatedTool = {
  title: 'LPN Barcode Generator',
  description: 'Generate warehouse LPN barcodes for pallets, cartons, bins, and inventory units.',
  path: '/lpn-barcode-generator'
}

const inventoryLabelTool: RelatedTool = {
  title: 'Inventory Barcode Label Generator',
  description: 'Create inventory barcode labels for products, stock rooms, and warehouse items.',
  path: '/inventory-barcode-label-generator'
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
      garmentTool,
      mrpTool,
      lpnTool,
      inventoryLabelTool,
      skuTool,
      excelTool,
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
    relatedTools: [garmentTool, mrpTool, lpnTool, inventoryLabelTool, printableTool, labelTool, skuTool, bulkTool, excelTool, code128Tool, upcATool, ean13Tool]
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
    relatedTools: [skuTool, garmentTool, inventoryLabelTool, lpnTool, homeTool, upcATool, ean13Tool, code39Tool, itfTool, bulkTool, excelTool, labelTool]
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
    relatedTools: [code128Tool, garmentTool, inventoryLabelTool, lpnTool, bulkTool, labelTool, excelTool, printableTool]
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
    relatedTools: [lpnTool, inventoryLabelTool, excelTool, labelTool, skuTool, printableTool, code128Tool, homeTool]
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
    relatedTools: [garmentTool, inventoryLabelTool, lpnTool, bulkTool, labelTool, skuTool, printableTool, code128Tool]
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
    relatedTools: [garmentTool, mrpTool, inventoryLabelTool, skuTool, printableTool, excelTool, bulkTool, code128Tool]
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
    relatedTools: [mrpTool, inventoryLabelTool, garmentTool, labelTool, bulkTool, excelTool, skuTool, code128Tool]
  },
  garment: {
    path: '/garment-barcode-generator',
    title: 'Free Garment Barcode Generator for Clothing Labels | Barcode Mint',
    description:
      'Generate barcodes for clothing SKUs, sizes, colors, and apparel inventory labels. Create printable garment label sheets and export PDF, PNG, SVG, or ZIP files.',
    h1: 'Free Garment Barcode Generator for Clothing Labels',
    subtitle:
      'Generate barcodes for clothing SKUs, sizes, colors, and apparel inventory labels. Create printable label sheets for garments, products, and stock rooms.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'TSHIRT-BLK-M',
    sections: [
      {
        title: 'How to create garment barcode labels',
        body: 'Enter a clothing SKU, product name, color, size, and style number, then preview a garment label before exporting PNG, SVG, ZIP, or a printable PDF sheet.'
      },
      {
        title: 'Best barcode type for clothing SKUs',
        body: 'Code 128 is recommended for garment labels because apparel SKUs often include letters, numbers, dashes, colors, and sizes.',
        links: [code128Tool, skuTool]
      },
      {
        title: 'Clothing barcode label use cases',
        body: 'Use garment barcode labels for stock rooms, product packaging, size variants, handmade apparel, pop-up shops, and small retail inventory.',
        items: ['T-shirt size labels', 'Color and style labels', 'Back room inventory labels', 'Marketplace product organization']
      },
      {
        title: 'Bulk clothing barcode generation',
        body: 'Paste clothing SKU rows from Excel or Google Sheets to generate multiple labels with product names, colors, sizes, and style numbers.',
        links: [excelTool, bulkTool, labelTool]
      }
    ],
    faqs: [
      {
        question: 'What is a garment barcode?',
        answer: 'A garment barcode is a scannable code used on clothing labels, tags, or inventory stickers to identify a SKU, size, color, or style.'
      },
      {
        question: 'What barcode type should I use for clothing SKUs?',
        answer: 'Use Code 128 for most clothing SKUs because it supports letters, numbers, dashes, and variant codes such as TSHIRT-BLK-M.'
      },
      {
        question: 'Can I create barcode labels for clothing sizes and colors?',
        answer: 'Yes. The garment template includes product name, style, color, size, barcode image, and barcode value.'
      },
      {
        question: 'Can I paste clothing SKUs from Excel?',
        answer: 'Yes. Paste rows with barcode value, product name, color, size, style, and optional price from Excel or Google Sheets.'
      },
      {
        question: 'Can I print garment barcode labels as PDF?',
        answer: 'Yes. Valid garment rows can be exported as printable PDF label sheets for US Letter or A4 paper.'
      },
      {
        question: 'Do I need a UPC barcode for clothing products?',
        answer: 'Not for internal inventory labels. UPC or EAN codes may be required by some retailers, but this tool does not issue official GS1 product identifiers.'
      }
    ],
    relatedTools: [skuTool, labelTool, excelTool, printableTool, bulkTool]
  },
  mrp: {
    path: '/mrp-sticker-with-barcode-generator',
    title: 'Free MRP Sticker with Barcode Generator - Create Printable Price Labels',
    description:
      'Create printable MRP stickers with barcodes for products, SKUs, and price labels. Add product name, price, and barcode, then export as PDF.',
    h1: 'Free MRP Sticker with Barcode Generator',
    subtitle:
      'Create printable MRP stickers with product names, prices, pack details, and barcodes. Export price label sheets as PDF, PNG, SVG, or ZIP.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'SKU-001',
    sections: [
      {
        title: 'What is an MRP sticker with barcode?',
        body: 'An MRP sticker with barcode is a printable price label that combines a product identifier, price information, and a scannable barcode.'
      },
      {
        title: 'How to create an MRP barcode sticker',
        body: 'Enter a SKU, product name, MRP or price, optional sale price, pack size, and batch. Preview the sticker, then export a printable PDF sheet.'
      },
      {
        title: 'Barcode type for price stickers',
        body: 'Code 128 works well for internal product SKUs and price stickers. Use UPC-A or EAN-13 only when you already have official numeric retail product codes.',
        links: [code128Tool, skuTool]
      },
      {
        title: 'Printing price stickers',
        body: 'Print at 100% scale, disable Fit to page, and test one sticker before printing a full sheet. This tool helps create printable barcode price stickers. Please make sure your product labels meet the pricing and labeling rules that apply in your market.'
      }
    ],
    faqs: [
      {
        question: 'Can I create an MRP sticker with a barcode online?',
        answer: 'Yes. Enter product and price fields in the browser, preview the sticker, and export printable files.'
      },
      {
        question: 'Can I add product name and price to the sticker?',
        answer: 'Yes. The MRP template supports product name, MRP or price, optional sale price, pack size, batch, barcode, and barcode value.'
      },
      {
        question: 'Can I export MRP barcode stickers as PDF?',
        answer: 'Yes. Valid sticker rows can be exported as PDF label sheets for US Letter or A4 paper.'
      },
      {
        question: 'What barcode type should I use for price stickers?',
        answer: 'Use Code 128 for custom SKU price stickers. Use UPC-A or EAN-13 only for standard numeric retail product codes you already own.'
      },
      {
        question: 'Can I paste product and price data from Excel?',
        answer: 'Yes. Paste product rows with barcode value, product name, MRP, sale price, pack size, and optional batch.'
      },
      {
        question: 'Are these labels compliant for retail use?',
        answer: 'This tool creates printable sticker files only. You are responsible for checking the pricing and labeling rules that apply in your market.'
      }
    ],
    relatedTools: [labelTool, printableTool, skuTool, excelTool, bulkTool]
  },
  lpn: {
    path: '/lpn-barcode-generator',
    title: 'Free LPN Barcode Generator for Warehouse and Inventory Labels',
    description:
      'Generate LPN barcodes for warehouse labels, pallets, cartons, and inventory tracking. Create Code 128 LPN labels and export printable PDF sheets.',
    h1: 'Free LPN Barcode Generator',
    subtitle:
      'Generate LPN barcodes for warehouse labels, pallets, cartons, and inventory tracking. Create Code 128 LPN labels and export printable PDF sheets.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'LPN-000001',
    sections: [
      {
        title: 'What is an LPN barcode?',
        body: 'An LPN barcode represents a license plate number used to identify pallets, cartons, bins, or inventory handling units in a warehouse.'
      },
      {
        title: 'Best barcode type for LPN labels',
        body: 'Code 128 is a practical choice for LPN values because it supports prefixes such as LPN- and compact warehouse identifiers.',
        links: [code128Tool]
      },
      {
        title: 'LPN barcode examples',
        body: 'Use the sequence generator to create LPN-000001 through LPN-000100, or paste existing warehouse values from a spreadsheet.',
        items: ['LPN-000001', 'LPN-000002', 'LPN-000003']
      },
      {
        title: 'Warehouse label printing tips',
        body: 'Use larger labels for pallets and cartons, print at 100% scale, and test scan the output before applying labels in an active warehouse.',
        links: [inventoryLabelTool, bulkTool]
      }
    ],
    faqs: [
      {
        question: 'What does LPN mean in warehouse labels?',
        answer: 'LPN usually means license plate number, a unique identifier for a pallet, carton, bin, or handling unit.'
      },
      {
        question: 'What barcode type should I use for LPN barcodes?',
        answer: 'Code 128 is recommended for LPN barcodes because it supports alphanumeric warehouse prefixes and compact label printing.'
      },
      {
        question: 'Can I generate multiple LPN barcodes at once?',
        answer: 'Yes. Use the LPN sequence generator or paste up to 100 LPN values from a spreadsheet.'
      },
      {
        question: 'Can I create pallet and carton barcode labels?',
        answer: 'Yes. The LPN template supports warehouse or location text and a pallet, carton, or bin unit type.'
      },
      {
        question: 'Can I export LPN labels as PDF?',
        answer: 'Yes. Valid LPN rows can be exported as printable PDF label sheets.'
      },
      {
        question: 'Can I paste LPN values from Excel?',
        answer: 'Yes. Paste LPN value, warehouse or location, unit type, and optional batch from Excel or Google Sheets.'
      }
    ],
    relatedTools: [inventoryLabelTool, bulkTool, excelTool, labelTool, skuTool]
  },
  inventoryLabel: {
    path: '/inventory-barcode-label-generator',
    title: 'Free Inventory Barcode Label Generator for Products and Stock',
    description:
      'Create printable inventory barcode labels for products, SKUs, stock rooms, and warehouse items. Generate labels in bulk and export as PDF.',
    h1: 'Free Inventory Barcode Label Generator',
    subtitle:
      'Create printable inventory barcode labels for products, SKUs, stock rooms, and warehouse items. Generate labels in bulk and export as PDF.',
    trustNote: commonTrustNote,
    defaultType: 'code128',
    defaultValue: 'INV-1001',
    sections: [
      {
        title: 'How to create inventory barcode labels',
        body: 'Enter an inventory code, item name, location, quantity, and category, then preview and export barcode labels for stock rooms and warehouse shelves.'
      },
      {
        title: 'Inventory barcode examples',
        body: 'Inventory labels often use Code 128 values with internal prefixes, item numbers, or shelf identifiers.',
        items: ['INV-1001', 'INV-1002', 'SHELF-03-BOX-8']
      },
      {
        title: 'Inventory vs SKU vs LPN barcode comparison',
        body: 'SKU barcodes identify sellable products, inventory barcodes identify internal stock or assets, and LPN barcodes identify warehouse handling units.',
        table: {
          headers: ['Label type', 'Common use', 'Example'],
          rows: [
            ['SKU', 'Product variant', 'TSHIRT-BLK-M'],
            ['Inventory', 'Stock room item', 'INV-1001'],
            ['LPN', 'Pallet or carton', 'LPN-000001']
          ]
        }
      },
      {
        title: 'Bulk inventory barcode labels',
        body: 'Paste rows from Excel or Google Sheets to create many inventory labels with item names, locations, quantities, and categories.',
        links: [excelTool, bulkTool, labelTool]
      }
    ],
    faqs: [
      {
        question: 'What is an inventory barcode label?',
        answer: 'An inventory barcode label is a scannable label used to identify products, supplies, shelves, stock room items, or warehouse assets.'
      },
      {
        question: 'What barcode type should I use for inventory labels?',
        answer: 'Code 128 is usually best for inventory labels because it supports letters, numbers, dashes, and internal item codes.'
      },
      {
        question: 'Can I create inventory barcode labels in bulk?',
        answer: 'Yes. Paste up to 100 rows from Excel or Google Sheets and export the valid rows as label sheets.'
      },
      {
        question: 'Can I add item names and locations to labels?',
        answer: 'Yes. The inventory template supports item name, location, quantity, category, barcode image, and barcode value.'
      },
      {
        question: 'Can I export inventory labels as PDF?',
        answer: 'Yes. Valid inventory rows can be exported as printable PDF label sheets.'
      },
      {
        question: 'What is the difference between SKU, inventory, and LPN barcodes?',
        answer: 'SKU barcodes identify product variants, inventory barcodes identify internal stock or assets, and LPN barcodes identify warehouse handling units such as pallets or cartons.'
      }
    ],
    relatedTools: [lpnTool, skuTool, excelTool, bulkTool, labelTool]
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
