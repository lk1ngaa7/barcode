# Codex 执行任务：优化 barcode-mint.com 的 SEO 内链与页面差异化

## 一、背景

当前网站：`https://www.barcode-mint.com/`

这是一个英文 Barcode 工具站，刚上线约一周。GSC 已经出现少量曝光，国家全部来自美国，说明方向是对的。

当前 GSC 热门 query 包括：

* `print bar codes`
* `barcode generator and print`
* `barcode label generator`
* `print a barcode`
* `print barcodes`
* `generate sku barcode`
* `generate and print barcodes`
* `barcode generator sheet`
* `barcodes maken en printen`

但目前这些 query 在 GSC 中全部对应首页 `/`，说明 Google 还没有把这些搜索意图分配到更精准的内页。

本次任务目标：

> 让首页承担总入口作用，同时通过强内链和页面差异化，把 print / label / SKU / Excel sheet / bulk 等 query 分流到更精准的页面。

请直接修改代码，不要只给建议。

---

## 二、总体要求

请先阅读当前项目结构，确认使用的框架、路由方式、组件结构、sitemap 生成方式，然后再实施。

要求：

1. 保持当前网站整体 UI 风格，不要大改设计。
2. 不要加入广告。
3. 不要加入登录、会员、后台功能。
4. 不要破坏现有 Barcode Generator 核心功能。
5. 页面继续面向英文用户。
6. 所有新增和修改的页面都要适配移动端。
7. 所有页面必须有合理的 `title`、`description`、`H1`、canonical。
8. 更新 sitemap，确保新增页面可被 Google 发现。
9. SEO 内容不要做成长篇垃圾文本，要短段落、小标题、列表、FAQ、工具优先。
10. 所有页面首屏必须保留工具可用性，不能把 SEO 文案堆在工具上方。

---

## 三、首页修改：新增强内链模块

### 位置

在首页工具区域下方、SEO 内容区上方，新增一个强内链模块。

模块标题：

```txt
Choose the right barcode tool
```

模块副标题可以使用：

```txt
Start with the barcode tool that matches what you want to create, print, or export.
```

### 卡片内容

新增 5 个卡片，卡片锚文本必须是精准关键词，不要使用 `Learn more` 这种弱锚文本。

#### 1. Printable Barcode Generator

链接：

```txt
/printable-barcode-generator
```

说明：

```txt
Generate and print barcodes online as PNG, SVG, or PDF.
```

#### 2. Barcode Label Generator

链接：

```txt
/barcode-label-generator
```

说明：

```txt
Create printable barcode labels for products, SKUs, inventory, and retail items.
```

#### 3. SKU Barcode Generator

链接：

```txt
/sku-barcode-generator
```

说明：

```txt
Create Code 128 barcodes for custom SKU and inventory codes.
```

#### 4. Barcode Generator for Excel

链接：

```txt
/barcode-generator-for-excel
```

说明：

```txt
Paste rows from Excel or Google Sheets and generate barcodes in bulk.
```

#### 5. Bulk Barcode Generator

链接：

```txt
/bulk-barcode-generator
```

说明：

```txt
Generate multiple barcodes from a list of values and export them for printing.
```

### 首页内链要求

* 卡片标题本身就是链接。
* 不要只在 footer 放链接。
* 首页 header / nav 如果合适，也可以增加 `Printable`、`Labels`、`Bulk` 等入口，但不要让导航变复杂。
* 移动端卡片可以单列展示。
* 桌面端可以 2–3 列网格展示。

---

## 四、新增页面：/printable-barcode-generator

### 页面目标

承接以下 query：

```txt
print bar codes
print a barcode
print barcodes
barcode generator and print
generate and print barcodes
printable barcode generator
```

### URL

```txt
/printable-barcode-generator
```

### Meta Title

```txt
Free Printable Barcode Generator - Generate and Print Barcodes Online
```

### Meta Description

```txt
Generate printable barcodes online for products, SKUs, and inventory. Download PNG or SVG files, or export barcodes as print-ready PDF.
```

### H1

```txt
Free Printable Barcode Generator
```

### Subtitle

```txt
Generate barcodes online and print them as PNG, SVG, or PDF files. No sign-up required.
```

### 首屏工具默认状态

这个页面打开后，默认应该是：

* Single Barcode 模式
* Barcode Type 默认 Code 128
* 输入 placeholder 示例：`SKU-001`
* 下载按钮突出：

  * Download PNG
  * Download SVG
  * Export PDF
  * Print Barcode / Print PDF，如果现有功能支持

如果当前组件没有直接打印按钮，不要强行做复杂打印系统，可以优先使用现有 PDF 导出能力，并在文案中强调 print-ready PDF。

### 页面内容模块

工具下方增加这些内容块：

#### How to print a barcode online

用 3–5 步说明：

1. Choose a barcode type.
2. Enter your barcode value.
3. Preview the barcode.
4. Download PNG, SVG, or PDF.
5. Print at 100% scale for best results.

#### Printable barcode formats

说明 PNG / SVG / PDF 分别适合什么场景：

* PNG: quick image download
* SVG: scalable barcode for design tools
* PDF: best for printing barcode labels or sheets

#### Printing tips

覆盖这些语义：

```txt
print at 100% scale
disable fit to page
use high contrast black bars on white background
test scan before printing many labels
```

### FAQ

至少包含 5 个 FAQ：

```txt
Can I print a barcode from this generator?
What is the best file format for printing barcodes?
Can I export a barcode as PDF?
Why should I print barcodes at 100% scale?
Can I generate and print barcodes without signing up?
```

FAQ 内容要围绕 printable，不要直接复用首页 FAQ。

---

## 五、新增页面：/sku-barcode-generator

### 页面目标

承接以下 query：

```txt
generate sku barcode
sku barcode generator
create sku barcode
inventory sku barcode
barcode for sku
```

### URL

```txt
/sku-barcode-generator
```

### Meta Title

```txt
Free SKU Barcode Generator - Create Barcodes for Inventory and Products
```

### Meta Description

```txt
Create SKU barcodes online for products, inventory, and warehouse labels. Use Code 128 for custom SKU values and export as PNG, SVG, or PDF.
```

### H1

```txt
Free SKU Barcode Generator
```

### Subtitle

```txt
Create Code 128 barcodes for custom SKU values, product codes, and inventory labels.
```

### 首屏工具默认状态

这个页面打开后：

* Barcode Type 默认 Code 128
* 输入框 placeholder 使用：

```txt
SKU-001
```

* 可以预填一个示例值，或者保留空输入，但提示文案必须围绕 SKU。
* 如果有 Label Text 字段，placeholder 使用：

```txt
Black T-Shirt
```

### 页面核心说明

必须讲清楚：

* SKU 不是一种 barcode 类型，而是商家自己的库存编码。
* 对于 `SKU-001`、`ITEM-XL-2026`、`BLACK-TSHIRT-M` 这类自定义编码，推荐使用 Code 128。
* UPC-A / EAN-13 更适合零售商品标准码。
* SKU barcode 适合 inventory labels、warehouse labels、product labels、small business stock tracking。

### 内容模块

#### What is a SKU barcode?

说明 SKU barcode 的用途。

#### Best barcode type for SKUs

明确推荐：

```txt
Code 128 is usually the best barcode type for custom SKU values because it supports letters, numbers, and symbols.
```

#### SKU barcode examples

增加示例列表：

```txt
SKU-001
ITEM-2026-XL
BLACK-TSHIRT-M
WAREHOUSE-A-1001
```

#### Bulk SKU barcode generation

引导到：

```txt
/bulk-barcode-generator
/barcode-generator-for-excel
/barcode-label-generator
```

### FAQ

至少包含 5 个 FAQ：

```txt
What barcode type should I use for SKUs?
Can a SKU contain letters and numbers?
Can I create SKU barcode labels?
Can I generate SKU barcodes in bulk?
Should I use Code 128, UPC, or EAN for SKUs?
```

FAQ 必须围绕 SKU，不要复用首页 FAQ。

---

## 六、强化页面：/barcode-label-generator

### 目标

承接以下 query：

```txt
barcode label generator
printable barcode labels
product barcode labels
sku barcode labels
inventory barcode labels
barcode label sheet
```

### Meta Title

如果当前不够精准，请改为：

```txt
Free Barcode Label Generator - Create and Print Barcode Labels
```

### Meta Description

```txt
Create printable barcode labels for products, SKUs, and inventory. Generate barcode label sheets for US Letter or A4 paper and export as PDF.
```

### H1

```txt
Free Barcode Label Generator
```

### Subtitle

```txt
Create printable barcode labels for products, SKUs, inventory, and retail items. Export label sheets as PDF for US Letter or A4 paper.
```

### 首屏工具默认状态

这个页面打开后，必须默认进入：

```txt
Label Sheet 模式
```

而不是普通 Single Barcode 模式。

如果当前组件支持 tabs，请设置默认 tab 为 Label Sheet。

如果当前没有该能力，请尽量扩展组件 props，例如：

```ts
defaultMode="label"
```

或者使用当前项目中等价的方式实现。

### 页面内容重点

工具下方内容必须覆盖：

```txt
barcode label generator
printable barcode labels
product barcode labels
SKU barcode labels
inventory barcode labels
US Letter barcode labels
A4 barcode labels
export labels as PDF
print at 100% scale
```

### FAQ

至少包含 5 个 FAQ：

```txt
Can I print barcode labels on US Letter paper?
Can I create barcode labels for SKUs?
Can I export barcode labels as PDF?
What barcode type should I use for inventory labels?
Can I paste values from Excel to create labels?
```

FAQ 必须围绕 label 场景，不要复用首页 FAQ。

---

## 七、强化页面：/barcode-generator-for-excel

### 目标

承接以下 query：

```txt
barcode generator sheet
barcode generator for Excel
barcode generator for Google Sheets
spreadsheet barcode generator
paste rows from Excel
bulk barcode generator
```

### Meta Title

如果当前不够精准，请改为：

```txt
Barcode Generator for Excel - Paste Spreadsheet Rows and Create Barcodes
```

### Meta Description

```txt
Paste product codes or SKUs from Excel or Google Sheets and generate barcodes in bulk. Export barcode images or printable PDF sheets online.
```

### H1

```txt
Barcode Generator for Excel
```

### Subtitle

```txt
Paste your Excel or Google Sheets product list and generate barcodes in bulk.
```

### 首屏工具默认状态

这个页面打开后，必须默认进入：

```txt
Bulk / Excel Paste 模式
```

而不是普通 Single Barcode 模式。

如果当前组件支持 tabs，请设置默认 tab 为 Bulk Barcodes。

如果当前没有该能力，请扩展组件 props，例如：

```ts
defaultMode="bulk"
```

### 页面内容增强

增加一个示例表格：

| Barcode Value | Label Text    |
| ------------- | ------------- |
| SKU-001       | Black T-Shirt |
| SKU-002       | White Mug     |
| SKU-003       | Product Box   |

增加说明文案：

```txt
Copy and paste rows directly from Excel or Google Sheets. The first column should contain the barcode value, and the second column can be used as optional label text.
```

### 内容模块

#### How to generate barcodes from Excel

步骤：

1. Prepare your product codes or SKUs in Excel.
2. Copy the rows from your spreadsheet.
3. Paste them into the bulk barcode input.
4. Review valid and invalid rows.
5. Export the barcodes as PDF, PNG, or SVG.

#### Excel and Google Sheets support

覆盖这些语义：

```txt
Excel barcode generator
Google Sheets barcode generator
spreadsheet barcode generator
barcode generator sheet
bulk barcode generator
```

### FAQ

至少包含 5 个 FAQ：

```txt
Can I paste barcode values from Excel?
Can I use Google Sheets with this barcode generator?
What column format should I use?
Can I generate barcodes in bulk from a spreadsheet?
Can I export spreadsheet barcodes as PDF?
```

FAQ 必须围绕 Excel / spreadsheet，不要复用首页 FAQ。

---

## 八、强化页面：/bulk-barcode-generator

如果当前 `/bulk-barcode-generator` 内容较弱，也请顺手强化，但不要做大重构。

### 页面目标

承接：

```txt
bulk barcode generator
generate multiple barcodes
batch barcode generator
multiple barcode generator
```

### 要求

* 默认进入 Bulk Barcodes 模式。
* 强调一行一个值。
* 强调可以从 Excel / Google Sheets 粘贴。
* 增加到 `/barcode-generator-for-excel` 和 `/barcode-label-generator` 的内链。

---

## 九、组件层面的要求

如果当前 BarcodeGenerator 组件所有页面都显示同一个默认模式，请改造为支持以下 props：

```ts
defaultMode?: 'single' | 'bulk' | 'label'
defaultBarcodeType?: 'code128' | 'upc' | 'ean13'
defaultValue?: string
placeholder?: string
context?: 'home' | 'printable' | 'sku' | 'label' | 'excel' | 'bulk'
```

实际命名可以结合当前项目风格调整，但功能上要支持：

| 页面                             | defaultMode | defaultBarcodeType | placeholder    |
| ------------------------------ | ----------- | ------------------ | -------------- |
| `/`                            | `single`    | `code128`          | `SKU-001`      |
| `/printable-barcode-generator` | `single`    | `code128`          | `SKU-001`      |
| `/sku-barcode-generator`       | `single`    | `code128`          | `SKU-001`      |
| `/barcode-label-generator`     | `label`     | `code128`          | `SKU-001`      |
| `/barcode-generator-for-excel` | `bulk`      | `code128`          | 多行 SKU 示例      |
| `/bulk-barcode-generator`      | `bulk`      | `code128`          | 多行 SKU 示例      |
| `/code-128-barcode-generator`  | `single`    | `code128`          | `SKU-001`      |
| `/upc-barcode-generator`       | `single`    | `upc`              | `03600029145`  |
| `/ean-13-barcode-generator`    | `single`    | `ean13`            | `590123412345` |

---

## 十、内链要求

请在相关页面之间增加自然内链：

### `/printable-barcode-generator`

链接到：

```txt
/barcode-label-generator
/bulk-barcode-generator
/barcode-generator-for-excel
```

### `/sku-barcode-generator`

链接到：

```txt
/code-128-barcode-generator
/bulk-barcode-generator
/barcode-label-generator
/barcode-generator-for-excel
```

### `/barcode-label-generator`

链接到：

```txt
/sku-barcode-generator
/printable-barcode-generator
/barcode-generator-for-excel
/bulk-barcode-generator
```

### `/barcode-generator-for-excel`

链接到：

```txt
/bulk-barcode-generator
/barcode-label-generator
/sku-barcode-generator
```

锚文本必须自然且精准，例如：

```txt
SKU Barcode Generator
Printable Barcode Generator
Barcode Label Generator
Barcode Generator for Excel
Bulk Barcode Generator
Code 128 Barcode Generator
```

不要全部写成 `click here` 或 `learn more`。

---

## 十一、sitemap / SEO 技术要求

请检查并更新 sitemap，确保包含：

```txt
/
 /printable-barcode-generator
 /sku-barcode-generator
 /barcode-label-generator
 /barcode-generator-for-excel
 /bulk-barcode-generator
 /code-128-barcode-generator
 /upc-barcode-generator
 /ean-13-barcode-generator
```

要求：

1. 新增页面必须出现在 sitemap。
2. 每个页面必须有 canonical。
3. 每个页面必须有唯一 title。
4. 每个页面必须有唯一 description。
5. 每个页面只能有一个 H1。
6. 不要添加 noindex。
7. 不要破坏 robots.txt。
8. 如果项目已有 structured data / FAQ schema，请为新增 FAQ 正确接入；如果没有，不强制新增复杂 schema，但页面内容要结构清晰。

---

## 十二、验收标准

完成后请自检以下内容：

### 功能验收

* 首页工具仍然可用。
* Single Barcode 仍然可以生成和下载。
* Bulk Barcodes 仍然可以使用。
* Label Sheet 模式仍然可以使用。
* 新增页面不会 404。
* 新增页面移动端布局正常。

### SEO 验收

* 首页出现 `Choose the right barcode tool` 模块。
* `/printable-barcode-generator` 已创建。
* `/sku-barcode-generator` 已创建。
* `/barcode-label-generator` 默认进入 Label Sheet 模式。
* `/barcode-generator-for-excel` 默认进入 Bulk / Excel Paste 模式。
* `/bulk-barcode-generator` 默认进入 Bulk 模式。
* sitemap 包含新增页面。
* 每个页面 title / description / H1 唯一。
* 页面之间有精准内链。
* FAQ 内容不重复堆砌，必须和页面意图相关。

### 构建验收

请执行项目可用的检查命令，例如：

```bash
npm run lint
npm run typecheck
npm run build
```

如果项目没有这些命令，请执行当前项目实际可用的等价命令。

最后输出：

1. 修改了哪些文件。
2. 新增了哪些页面。
3. sitemap 是否已更新。
4. 运行了哪些检查命令。
5. 是否有遗留问题。

