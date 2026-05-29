# Barcode 工具站 MVP UI/UX 设计指导

## 1. 产品定位

这是一个面向欧美用户的 Barcode Generator 工具站。

MVP 目标不是做炫酷视觉，而是做一个：

- 打开就能用
- 首屏就能生成条码
- 下载路径清晰
- 移动端可用
- 支持后续扩展 Bulk / Label / Excel / PDF / Avery

产品气质：

Clean, fast, practical, trustworthy.

不要做成：

- AI SaaS 风
- 炫酷科技风
- 重后台系统风
- 广告站风
- 过度营销 landing page

---

## 2. MVP 核心原则

### 2.1 工具优先

用户搜索 barcode generator 的第一目的，是马上生成条码。

首页首屏必须包含：

- Barcode Type 选择
- Barcode Value 输入框
- 条码预览
- 校验提示
- 下载按钮

不要首屏放大段 SEO 文案。

### 2.2 可信、清晰、可打印

Barcode 是业务工具，视觉上要表达：

- 准确
- 稳定
- 专业
- 可打印
- 可商用

避免过度渐变、动画、玻璃拟态、重阴影。

### 2.3 降低用户理解成本

不同条码类型必须给简短说明：

- Code 128 — Best for SKUs and inventory
- UPC-A — 12-digit retail product barcode
- EAN-13 — 13-digit international product barcode

输入错误时，要告诉用户：

1. 为什么错
2. 正确规则是什么
3. 是否建议切换条码类型

---

## 3. MVP 页面范围

MVP 只做这些页面：

1. `/`  
   Free Barcode Generator

2. `/code-128-barcode-generator`  
   默认 Code 128

3. `/upc-a-barcode-generator`  
   默认 UPC-A

4. `/ean-13-barcode-generator`  
   默认 EAN-13

5. `/bulk-barcode-generator`  
   默认 Bulk 模式

6. `/barcode-generator-for-excel`  
   默认 Excel paste / Bulk 模式

7. `/barcode-label-generator`  
   默认 Label Sheet 模式

---

## 4. 首页首屏结构

桌面端使用双栏布局：

```txt
Header

Hero Section
Left:
- H1
- Subtitle
- Trust note
- Tool Card

Right:
- Barcode Preview Card
- Download Actions
- Privacy Note
```

移动端使用单列布局：

```txt
Header
H1
Subtitle
Trust note
Tool Card
Preview
Download buttons
Privacy note
SEO content
FAQ
Related tools
Footer
```

---

## 5. Header

MVP Header 保持轻量。

内容：

- Logo
- Barcode Generator
- Bulk Generator
- Label Generator
- Guides

样式：

- height: 64px
- background: white
- border-bottom: 1px solid #E5E7EB

移动端可以隐藏导航，只保留 Logo 和菜单按钮。

---

## 6. Hero 文案

首页 H1：

```txt
Free Barcode Generator for Products, Inventory, and Labels
```

副标题：

```txt
Create single or bulk barcodes online. Import SKUs from Excel and export printable barcode labels as PNG, SVG, or PDF.
```

Trust note：

```txt
No sign-up required · Browser-based · PNG, SVG, PDF
```

---

## 7. 视觉风格

### 颜色

```txt
Primary: #2563EB
Primary hover: #1D4ED8
Success: #16A34A
Warning: #D97706
Error: #DC2626
Text primary: #111827
Text secondary: #4B5563
Border: #E5E7EB
Page background: #F9FAFB
Card background: #FFFFFF
```

### 字体

优先使用 system font：

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### 卡片

```txt
Card radius: 16px
Input radius: 10px
Button radius: 10px
Border: 1px solid #E5E7EB
Shadow: subtle
```

---

## 8. Tool Card

MVP Tool Card 包含 3 个 tab：

```txt
Single Barcode
Bulk Barcodes
Label Sheet
```

### Single Barcode

字段：

- Barcode Type
- Barcode Value
- Label Text optional
- Show text below barcode
- Advanced options 折叠

下载按钮：

- Download PNG
- Download SVG
- Export PDF

### Bulk Barcodes

字段：

- Paste SKUs or product codes
- 支持一行一个值
- 支持从 Excel / Google Sheets 复制粘贴
- 显示解析结果

提示文案：

```txt
You can paste one value per line, or copy rows directly from Excel or Google Sheets.
```

MVP 限制：

```txt
Generate up to 100 barcodes at once.
```

按钮：

- Generate Barcodes
- Export PDF
- Clear

MVP 不做 ZIP 下载。

### Label Sheet

当前实现状态：Task 07 已完成。

MVP 模板：

- Simple
- Product
- Inventory

Label Size：

- 2 x 1 inch
- 3 x 2 inch

Paper：

- US Letter
- A4

默认：

```txt
US Letter
2 x 1 inch
```

PDF 提示：

```txt
For best results, print at 100% scale and disable “Fit to page”.
```

已实现页面：

- `/barcode-label-generator`
- `/printable-barcode-generator`

已实现交互：

- 选择模板。
- 选择标签尺寸。
- 选择纸张。
- 输入 barcode value。
- 输入模板文字。
- 实时标签预览。
- 合法输入时导出 PDF。
- 非法输入时禁用 PDF 导出。

---

## 9. 表单规则

### Barcode Type

选项：

```txt
Code 128 — Best for SKUs and inventory
UPC-A — 12-digit retail product barcode
EAN-13 — 13-digit international product barcode
```

### Barcode Value placeholder

Code 128：

```txt
e.g. SKU-001
```

UPC-A：

```txt
e.g. 03600029145
```

EAN-13：

```txt
e.g. 590123412345
```

### Label Text

Label：

```txt
Label Text
```

Placeholder：

```txt
e.g. Black T-Shirt
```

说明：

```txt
Optional text shown above or below the barcode.
```

---

## 10. Validation UX

错误提示必须明确，不要只写 Invalid。

### 示例

UPC-A 输入字母：

```txt
UPC-A only supports 12 numeric digits. Use Code 128 for custom SKU values like “ABC123”.
```

EAN-13 输入 10 位：

```txt
EAN-13 requires 13 numeric digits, or 12 digits if you want us to calculate the check digit.
```

空输入：

```txt
Enter a barcode value to generate a preview.
```

成功提示：

```txt
Valid Code 128 barcode. Good for SKUs and inventory labels.
```

智能推荐：

```txt
This looks like a custom SKU. Code 128 is recommended.
```

```txt
This looks like a UPC-A barcode.
```

```txt
This looks like an EAN-13 barcode.
```

---

## 11. Preview Card

预览区要像最终输出物。

结构：

```txt
Preview
[white preview box]
Label Text
Barcode Image
Barcode Value
Status Message
Download Buttons
```

样式：

```txt
background: #F9FAFB
inner background: white
border: 1px dashed #D1D5DB
border-radius: 12px
padding: 24px
```

空状态：

```txt
Enter a barcode value to preview your barcode.
```

---

## 12. 下载按钮

Single 模式顺序：

```txt
Download PNG
Download SVG
Export PDF
```

Label 模式顺序：

```txt
Export PDF
Download PNG
Download SVG
```

输入不合法时，按钮禁用，并显示：

```txt
Fix the barcode value before downloading.
```

---

## 13. Excel Paste 规则

Excel 页面默认进入 Bulk 模式。

H1：

```txt
Barcode Generator for Excel
```

副标题：

```txt
Paste your Excel or Google Sheets product list and generate barcodes in bulk.
```

默认字段映射：

```txt
Column 1: Barcode Value
Column 2: Label Text
Column 3: Extra Text
```

粘贴后显示：

```txt
3 rows detected
3 valid
0 errors
```

错误行要明确标红。

---

## 14. SEO 内容区

SEO 内容放在工具下方。

顺序：

1. How to use
2. Supported barcode types
3. Bulk barcode generation
4. Printable barcode labels
5. FAQ
6. Related tools

不要做长墙文本。使用：

- 短段落
- 小标题
- 表格
- bullet list
- FAQ accordion

---

## 15. Related Tools

底部使用卡片，不要只放纯链接。

示例：

```txt
Code 128 Barcode Generator
Best for SKUs and inventory labels.

UPC-A Barcode Generator
Create 12-digit retail product barcodes.

Bulk Barcode Generator
Paste multiple SKUs and generate barcodes at once.
```

---

## 16. Footer

Footer 简洁即可。

内容：

- Logo
- Tools
- Guides
- Privacy
- Terms

Footer 文案：

```txt
Free online barcode tools for products, inventory, and labels.
```

---

## 17. 移动端要求

必须满足：

- 输入框高度至少 44px
- 按钮高度至少 44px
- 下载按钮纵向排列
- 预览不能横向溢出
- 条码不能被压缩变形
- 工具首屏可见
- 不出现严重横向滚动

不建议 MVP 做 sticky CTA。

---

## 18. 可访问性要求

必须满足：

- 所有 input 有 label
- 错误提示和输入框有关联
- 按钮有明确文本
- 颜色不能作为唯一状态表达
- 支持键盘操作
- Tab 顺序合理
- 预览图有 aria-label
- 错误提示使用 aria-live="polite"

---

## 19. MVP 暂不做

MVP 不做：

- 广告位
- Affiliate 推荐位
- Avery 模板选择
- ZIP 下载
- 复杂字段映射 UI
- 用户登录
- 保存历史记录
- 高级打印设置
- 复杂后台管理
- 重型 UI 组件库
- 炫酷动画

---

## 20. 组件优先级

### P0 必须实现

- SiteHeader
- SiteFooter
- BarcodeGenerator
- BarcodeTypeSelector
- BarcodeInput
- BarcodePreview
- ValidationMessage
- DownloadActions
- RelatedTools
- FaqBlock

### P1 MVP 可实现

- BulkBarcodeInput
- BulkBarcodeTable
- LabelTemplateSelector
- LabelPreview
- PdfExportPanel
- SpreadsheetPasteExample

### P2 暂不做

- AveryTemplateSelector
- AffiliateRecommendation
- StickyBackToToolButton
- AdvancedOptionsPanel

---

## 21. 给 Codex 的实现要求

请按以下规则实现：

- 使用 Nuxt
- 使用 Tailwind CSS
- 不使用重型 UI 组件库
- 工具区域必须在首屏
- 使用响应式 card-based layout
- 移动端优先保证可用性
- 所有输入项必须有 label
- 所有按钮必须有明确文本
- 校验状态必须清晰
- 下载按钮在无效输入时禁用
- SEO 内容放在工具下方
- 不要加入弹窗广告
- 不要把广告放进工具卡片内部
- 使用 semantic HTML
- 保证基础 accessibility

---

## 22. MVP 验收标准

用户打开页面后，必须能在 5 秒内完成：

1. 选择条码类型
2. 输入条码内容
3. 看到条码预览
4. 看到校验状态
5. 下载 PNG / SVG / PDF

MVP 成功标准：

- 首屏可直接生成条码
- 移动端体验正常
- 错误提示清楚
- 下载路径明确
- 支持 Single / Bulk / Label 三个基础模式
- 支持从 Excel / Google Sheets 粘贴数据
- 支持导出 PDF 标签
- 页面下方有基础 SEO 内容
- 整体视觉干净、可信、工具感强

核心体验目标：

用户不需要注册，不需要学习，不需要滚动，就能生成并下载一个可用条码。
