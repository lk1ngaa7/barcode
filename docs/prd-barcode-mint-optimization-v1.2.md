# barcode-mint.com 功能优化 PRD（Codex 可执行版）

> 版本：v1.2
> 执行对象：Codex / Claude Code
> 项目：barcode-mint.com
> 执行策略：在现有项目基础上增量优化，不允许重写整站
> 明确排除：robots.txt 已正常，本次不要修改 robots.txt，除非自动化测试发现它缺失或返回异常

---

# 0. 给 Codex 的执行说明

你现在要优化一个已经上线的 Barcode 工具站：barcode-mint.com。

当前站点已经有：

* 首页 `/`
* `/code-128-barcode-generator`
* `/upc-barcode-generator`
* `/ean-13-barcode-generator`
* `/bulk-barcode-generator`
* `/barcode-generator-for-excel`
* `/barcode-label-generator`
* 隐私页 / 条款页
* sitemap
* robots.txt 已正常，不要作为本次任务处理

本次任务不是重新设计网站，也不是重构为新项目，而是在现有代码基础上完成以下优化：

1. 强化真实工具能力
2. 强化下载闭环
3. 强化 Excel / Bulk / Label 场景
4. 强化首屏信任感，但不得使用虚假数据和虚假评价
5. 扩展部分条码类型
6. 增加基础结构化数据，但不得承诺富摘要
7. 保持现有蓝白灰专业工具站风格

执行前必须先阅读现有项目结构，确认技术栈、路由方式、组件结构、条码生成库、下载逻辑、SEO 配置方式，然后再改代码。

不要做以下事情：

* 不要重写整站
* 不要引入重型 UI 组件库
* 不要引入登录系统
* 不要加入广告
* 不要加入虚假用户评价
* 不要加入虚假使用人数
* 不要改 robots.txt
* 不要把工具区下移到 SEO 文案后面
* 不要破坏现有 URL
* 不要删除现有已上线页面
* 不要使用服务端保存用户输入的 barcode value
* 不要上传用户输入数据到服务器

---

# 1. 产品目标

barcode-mint.com 是一个面向欧美用户的在线条码工具站。

核心定位：

```txt
Free online barcode tools for products, SKUs, inventory, Excel lists, and printable labels.
```

用户打开页面后的核心任务是：

1. 选择条码类型
2. 输入或粘贴条码值
3. 看到预览
4. 看到校验状态
5. 下载 PNG / SVG / PDF
6. 或生成可打印标签页

本次优化的目标不是做营销型 SaaS 首页，而是把它做成一个更专业、更可信、更完整的工具站。

---

# 2. 本次执行范围

## 2.1 P0：必须完成

P0 是本次必须交付的核心功能。

### P0-1：统一下载能力

目标：

所有单条码页面必须支持 PNG 和 SVG 下载。Label / Bulk 场景支持 PDF 导出。

涉及页面：

* `/`
* `/code-128-barcode-generator`
* `/upc-barcode-generator`
* `/ean-13-barcode-generator`
* `/bulk-barcode-generator`
* `/barcode-generator-for-excel`
* `/barcode-label-generator`

要求：

1. 单条码模式显示：

   * `Download PNG`
   * `Download SVG`

2. Label Sheet 模式显示：

   * `Export PDF`
   * `Download PNG`
   * `Download SVG`

3. Bulk 模式显示：

   * `Generate Barcodes`
   * `Export PDF`
   * `Clear`

4. 输入非法时：

   * 下载按钮禁用
   * 显示明确提示：

     ```txt
     Fix the barcode value before downloading.
     ```

5. PNG 要高清：

   * 使用 2x 或更高 canvas scale
   * 导出图片不能明显模糊
   * 文件背景白色
   * 条码周围保留 quiet zone

6. SVG 要保持矢量：

   * 不允许把 raster 图片嵌进 SVG
   * SVG 文件打开后应该是可缩放的矢量条码

7. PDF 用于：

   * Bulk PDF
   * Label Sheet PDF
   * 单条码页不要强行提供 PDF，除非已有逻辑稳定

验收标准：

* 每个单条码页面都能下载 PNG
* 每个单条码页面都能下载 SVG
* 无效输入时按钮禁用
* 下载文件名可读，例如：

  * `barcode-code-128-SKU001.png`
  * `barcode-ean-13-5901234123457.svg`
* 下载后的条码与页面预览内容一致
* PNG 放大到 150% 仍然清晰
* SVG 在浏览器中打开正常
* 不引入服务端依赖

---

### P0-2：Excel CSV 模板下载

目标：

增强 `/barcode-generator-for-excel` 的搜索意图匹配。用户搜索 Excel barcode generator 时，不只是想粘贴文本，也想知道 Excel 表格应该怎么排。

涉及页面：

* `/barcode-generator-for-excel`
* `/bulk-barcode-generator`

新增静态文件：

```txt
/public/templates/barcode-template.csv
```

CSV 内容要求：

```csv
barcode_value,label_text,extra_text
SKU001,Black T-Shirt,Size M
SKU002,White Mug,Shelf A-12
5901234123457,Sample EAN-13 Product,Retail
```

要求：

1. CSV 使用 UTF-8 with BOM，确保 Excel 双击打开不乱码。
2. 在 Excel 页面粘贴区域上方或旁边增加按钮：

   ```txt
   Download CSV Template
   ```
3. 在 Bulk 页面也增加同样入口。
4. 按钮旁边增加一句解释：

   ```txt
   Use this template to prepare barcode values, label text, and extra text in Excel or Google Sheets.
   ```

验收标准：

* 点击按钮可直接下载 CSV
* Excel 打开后列对齐正确
* Google Sheets 导入后列对齐正确
* 模板含表头和 3 行示例
* 页面不依赖后端生成文件

---

### P0-3：Excel / Bulk 粘贴解析体验优化

目标：

让用户从 Excel / Google Sheets 复制数据后，能够清楚知道系统解析了多少行、多少有效、多少错误。

涉及页面：

* `/barcode-generator-for-excel`
* `/bulk-barcode-generator`

输入规则：

支持以下格式：

```txt
SKU001
SKU002
SKU003
```

也支持从 Excel / Google Sheets 复制的 tab 分隔内容：

```txt
SKU001    Black T-Shirt    Size M
SKU002    White Mug        Shelf A-12
```

字段映射：

```txt
Column 1: Barcode Value
Column 2: Label Text
Column 3: Extra Text
```

粘贴后显示解析摘要：

```txt
3 rows detected
3 valid
0 errors
```

如果有错误，显示：

```txt
5 rows detected
3 valid
2 errors
```

错误行要在预览表中标红，并显示具体原因。

错误提示示例：

```txt
Row 2: UPC-A only supports 12 numeric digits.
Row 4: Barcode value is empty.
Row 5: EAN-13 requires 13 numeric digits, or 12 digits if check digit is auto-generated.
```

限制：

* 本次最多支持 100 行
* 超过 100 行时不崩溃，显示提示：

  ```txt
  You pasted more than 100 rows. This free browser tool currently supports up to 100 barcodes at once.
  ```

验收标准：

* 一行一个值可以正确解析
* Excel 复制出来的 tab 分隔内容可以正确解析
* 空行自动忽略
* 错误行明确标识
* 批量预览不会导致页面卡死
* 超过 100 行时给出明确提示

---

### P0-4：Label Sheet 打印体验强化

目标：

`/barcode-label-generator` 是站点的核心差异化页面，必须更像一个真正的可打印标签工具，而不是普通条码生成器的变体。

涉及页面：

* `/barcode-label-generator`
* 首页 Label Sheet tab

Label Sheet 模式字段顺序调整为：

1. Label Template
2. Paper Size
3. Label Size
4. Barcode Type
5. Barcode Value
6. Label Text
7. Quantity / Repeat Count
8. Export Actions

默认值：

```txt
Template: Simple
Paper Size: US Letter
Label Size: 2 x 1 inch
Barcode Type: Code 128
Barcode Value: SKU001
Quantity: 30
```

Label Template：

* Simple
* Product
* Inventory

Paper Size：

* US Letter
* A4

Label Size：

* 2 x 1 inch
* 3 x 2 inch

新增字段：

```txt
Quantity
```

规则：

* 最小值：1
* 最大值：100
* 默认：30
* 非法时显示：

  ```txt
  Enter a quantity between 1 and 100.
  ```

打印说明卡片：

在 Export PDF 按钮下方显示：

```txt
Printing tips
- Print at 100% scale.
- Disable "Fit to page".
- Use US Letter or A4 paper based on your selected paper size.
- Test with one sheet before printing large batches.
```

Privacy 提示：

```txt
Your label data is processed in your browser. We never upload your barcode values.
```

验收标准：

* Label 页面首屏能看到 Label Preview
* Export PDF 正常生成
* PDF 使用用户选择的 paper size
* PDF 使用用户选择的 label size
* PDF 根据 quantity 重复生成标签
* 打印说明清楚可见
* 移动端无横向溢出

---

### P0-5：首屏信任信息优化，但不得造假

目标：

增强“免费、无需注册、本地处理”的信任感，但不得使用虚假用户数、虚假评价、虚假公司背书。

涉及页面：

* 首页
* 所有工具页

Header / Hero 附近保留或增加 trust note：

```txt
No sign-up required · Works in your browser · PNG, SVG, PDF
```

增加 privacy-first 提示：

```txt
Privacy-first: your barcode values stay in your browser.
```

在工具区附近增加小型 trust card：

```txt
Browser-based barcode generation
Your barcode values are processed locally in your browser. Nothing is uploaded or stored.
```

不要使用：

```txt
Join thousands of businesses...
```

不要使用虚构评价：

```txt
Alex K., E-commerce Seller
Sarah M., Logistics Manager
David L., Small Business Owner
```

可以增加真实 use cases 区块，放在 SEO 内容区前或 FAQ 前：

标题：

```txt
Common ways to use Barcode Mint
```

内容：

```txt
- Product SKU labels
- Warehouse inventory labels
- Retail UPC and EAN barcodes
- Excel-based bulk barcode generation
- Printable barcode label sheets
```

验收标准：

* 首屏能看到 no sign-up / browser-based / privacy-first 中至少两个信任点
* 不出现虚假数字
* 不出现虚假用户评价
* 不出现不可验证的“trusted by”文案
* 文案专业，不要过度营销

---

### P0-6：下载按钮视觉增强

目标：

让下载按钮更像核心操作按钮，提高用户完成任务的路径清晰度。

要求：

1. 主按钮颜色使用：

   ```txt
   background: #1D4ED8
   hover: #1E40AF
   text: #FFFFFF
   ```

2. 次按钮使用白底描边：

   ```txt
   background: #FFFFFF
   border: #D1D5DB
   text: #111827
   ```

3. 按钮高度不低于 44px。

4. 移动端按钮纵向排列。

5. 按钮文字必须明确，不要只写 `Download`。

6. 可选：按钮左侧加 download icon，但不要引入重型 icon 库。如果项目已经有 icon 方案，可以复用；否则用纯文字即可。

验收标准：

* 按钮对比度达到 WCAG AA
* 移动端可点击区域 >= 44px
* 无效输入时按钮 disabled 样式明显
* 所有按钮有清晰文本

---

### P0-7：移动端和可访问性专项修复

目标：

保证工具站在手机上可用。

移动端要求：

* 输入框高度至少 44px
* 按钮高度至少 44px
* 下载按钮纵向排列
* 条码预览不能横向溢出
* 条码不能被压缩变形
* 工具区必须在首屏附近
* 页面不出现严重横向滚动
* Header 不要占用过多高度

可访问性要求：

* 所有 input 必须有 label
* 错误提示和输入框有关联
* 错误提示使用 `aria-live="polite"`
* 按钮有明确文本
* 颜色不能作为唯一状态表达
* 支持键盘 Tab 操作
* Tab 顺序合理
* 条码预览区域有 `aria-label`

验收标准：

* Chrome DevTools 移动端宽度 375px 下无横向滚动
* iPhone 尺寸下按钮可正常点击
* 错误输入时屏幕阅读器能读到错误变化
* 键盘可以完成核心操作流程

---

## 2.2 P1：建议本次一起完成

P1 是本次强烈建议完成的功能。如果时间有限，可以拆成第二个 commit，但不要删除需求。

---

### P1-1：新增 Code 39 条码类型

目标：

扩展长尾关键词入口，并覆盖工业、库存、物流等场景。

新增页面：

```txt
/code-39-barcode-generator
```

新增条码类型：

```txt
Code 39
```

说明文案：

```txt
Code 39 is commonly used for inventory, industrial labels, and logistics. It supports uppercase letters, numbers, spaces, and a limited set of symbols.
```

校验规则：

* 支持 A-Z
* 支持 0-9
* 支持空格
* 支持 `- . $ / + %`
* 不支持小写字母，输入小写时自动转大写或给出提示
* 空输入时报错

示例值：

```txt
SKU-001
ABC123
ITEM 1001
```

错误提示：

```txt
Code 39 supports uppercase letters, numbers, spaces, and these symbols: - . $ / + %
```

页面 SEO：

Title：

```txt
Free Code 39 Barcode Generator | Barcode Mint
```

Meta description：

```txt
Create Code 39 barcodes online for inventory, industrial labels, and logistics. Free browser-based barcode generator with PNG and SVG downloads.
```

H1：

```txt
Free Code 39 Barcode Generator
```

验收标准：

* 新 URL 可访问
* sitemap 包含新 URL
* Related Tools 中出现 Code 39 页面入口
* Barcode Type selector 中出现 Code 39
* PNG / SVG 下载正常
* 校验规则正确

---

### P1-2：新增 ITF / Interleaved 2 of 5 条码类型

目标：

覆盖物流外箱、仓储、包装场景。

新增页面：

```txt
/itf-barcode-generator
```

新增条码类型：

```txt
ITF
```

说明文案：

```txt
ITF, also known as Interleaved 2 of 5, is commonly used for cartons, shipping boxes, and warehouse packaging. It encodes numeric values only.
```

校验规则：

* 仅支持数字
* 通常要求偶数位数字
* 空输入时报错
* 奇数位时提示：

```txt
ITF usually requires an even number of digits. Add a leading zero or check your packaging code.
```

示例值：

```txt
123456
00123456
```

页面 SEO：

Title：

```txt
Free ITF Barcode Generator | Interleaved 2 of 5 | Barcode Mint
```

Meta description：

```txt
Generate ITF and Interleaved 2 of 5 barcodes online for cartons, shipping boxes, and warehouse packaging. Free PNG and SVG downloads.
```

H1：

```txt
Free ITF Barcode Generator
```

验收标准：

* 新 URL 可访问
* sitemap 包含新 URL
* Related Tools 中出现 ITF 页面入口
* Barcode Type selector 中出现 ITF
* PNG / SVG 下载正常
* 奇数位数字提示明确

---

### P1-3：Data Matrix 技术预研和安全接入

目标：

Data Matrix 是重要的二维条码类型，但现有一维条码库可能不支持。不得为了赶进度写假功能。

执行要求：

1. 先检查现有 barcode 生成库是否支持 Data Matrix。
2. 如果现有库支持，则实现：

   ```txt
   /data-matrix-generator
   ```
3. 如果现有库不支持，则调研是否可以轻量引入 `bwip-js` 或其他成熟库。
4. 如果新增依赖会明显增加包体或破坏 Cloudflare 部署，则只提交技术预研文档和 TODO，不要强行上线假页面。
5. 不允许创建一个页面但实际生成不了 Data Matrix。

如果实现 Data Matrix，页面要求：

URL：

```txt
/data-matrix-generator
```

H1：

```txt
Free Data Matrix Generator
```

说明文案：

```txt
Create Data Matrix codes online for parts, electronics, healthcare, and small item labels.
```

验收标准：

* 能真实生成 Data Matrix
* PNG 下载正常
* SVG 如库支持则提供；不支持则明确隐藏 SVG 按钮
* 页面不能出现错误承诺
* sitemap 只有在功能真实可用时才加入该 URL

---

## 2.3 P2：本次可不做，但代码结构要为后续预留

P2 不要求本次实现，但不要把代码写死，避免后续扩展困难。

---

### P2-1：条码尺寸自定义

后续目标：

在 Single Barcode 模式中加入 Advanced Options：

```txt
Size
- Small
- Medium
- Large
```

或者：

```txt
Width
Height
Scale
```

本次要求：

* 生成逻辑不要把宽高写死到无法配置
* 下载逻辑应能接收尺寸参数
* 预览组件应支持未来传入 size options

---

### P2-2：Quiet Zone 设置

后续目标：

允许用户选择条码左右空白区：

```txt
Quiet Zone: Standard / Large
```

本次要求：

* 生成函数中保留 quiet zone 参数位置
* 默认 quiet zone 必须足够，避免扫码失败

---

### P2-3：博客内容页

本次不要一次生成 10 篇 AI 文章。

后续优先内容：

```txt
/how-to-generate-barcodes-in-excel
/code-128-vs-code-39
/upc-a-vs-ean-13
/how-to-print-barcode-labels-at-home
```

本次只需要保证 Related Tools 和 SEO 内容区的结构方便未来加内链。

---

# 3. 页面级需求

## 3.1 首页 `/`

首页目标：

用户打开首页后，不滚动或少量滚动即可完成条码生成。

Hero 文案建议：

H1：

```txt
Free Barcode Generator for Products, Inventory, and Labels
```

Subtitle：

```txt
Create single or bulk barcodes online. Import SKUs from Excel and export printable barcode labels as PNG, SVG, or PDF.
```

Trust note：

```txt
No sign-up required · Works in your browser · PNG, SVG, PDF
```

Privacy note：

```txt
Privacy-first: your barcode values stay in your browser.
```

首页首屏结构：

桌面端：

```txt
Header

Hero
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

移动端：

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

首页 SEO 内容区顺序：

1. How to use the barcode generator
2. Supported barcode types
3. Bulk barcode generation
4. Barcode labels and printable PDFs
5. Common ways to use Barcode Mint
6. FAQ
7. Related tools

---

## 3.2 `/barcode-generator-for-excel`

页面目标：

精准匹配 “barcode generator for excel” 搜索意图。

H1：

```txt
Barcode Generator for Excel
```

Subtitle：

```txt
Paste your Excel or Google Sheets product list and generate barcodes in bulk.
```

首屏工具区必须包含：

* CSV Template 下载按钮
* 粘贴框
* 字段映射说明
* 解析摘要
* 错误行提示
* Generate Barcodes
* Export PDF

字段映射说明：

```txt
Column 1: Barcode Value
Column 2: Label Text
Column 3: Extra Text
```

粘贴说明：

```txt
Paste one value per line, or copy rows directly from Excel or Google Sheets.
```

验收标准：

* Excel 复制三列内容后能解析
* 错误行显示清楚
* 可生成批量预览
* 可导出 PDF
* CSV 模板可下载

---

## 3.3 `/barcode-label-generator`

页面目标：

成为一个真正可用的 printable barcode label generator。

H1：

```txt
Barcode Label Generator
```

Subtitle：

```txt
Design printable barcode labels for products, inventory, shelves, and assets.
```

首屏必须包含：

* Label Template
* Paper Size
* Label Size
* Barcode Type
* Barcode Value
* Quantity
* Label Preview
* Export PDF

右侧或下方说明：

```txt
Export a printable PDF with repeated barcode labels.
```

打印提示：

```txt
For best results, print at 100% scale and disable "Fit to page".
```

验收标准：

* 选择 US Letter / A4 后 PDF 尺寸正确
* Quantity 控制标签数量
* Label Preview 与导出内容一致
* 移动端不横向溢出

---

## 3.4 单条码页面

涉及：

```txt
/code-128-barcode-generator
/upc-barcode-generator
/ean-13-barcode-generator
/code-39-barcode-generator
/itf-barcode-generator
```

每个页面必须有：

* 独立 H1
* 独立 meta title
* 独立 meta description
* 默认选中对应 barcode type
* 对应类型的示例输入
* 对应类型的校验规则
* PNG / SVG 下载
* FAQ
* Related tools

不要所有页面共用完全一样的 SEO 文案。

---

# 4. 结构化数据需求

本次加入结构化数据，但只作为语义增强，不承诺 Google 一定展示富摘要。

## 4.1 必须实现

### 首页

添加：

```txt
Organization
WebApplication
```

### 工具页

添加：

```txt
SoftwareApplication
BreadcrumbList
```

### 博客页

本次如没有实现博客，则不用添加 Article。

## 4.2 可选实现

如果页面可见内容中已有 FAQ，可以添加：

```txt
FAQPage
```

但要求：

* JSON-LD 内容必须和页面可见 FAQ 一致
* 不允许添加页面上不存在的问答
* 不要把 FAQ rich result 当成验收目标
* 不要为了 Schema 堆砌无意义 FAQ

## 4.3 不建议本次实现

不要添加：

```txt
Review
AggregateRating
HowTo
```

原因：

* 当前没有真实用户评价
* 不要造假评分
* HowTo 富结果不作为当前 SEO 目标

验收标准：

* JSON-LD 能被 Schema Validator 正常解析
* 页面源码中能看到结构化数据
* 不出现虚假评分、虚假评论、虚假使用人数
* 不因 Schema 报错影响页面构建

---

# 5. SEO 要求

## 5.1 Title 模板

首页：

```txt
Free Barcode Generator for Products, Inventory, and Labels | Barcode Mint
```

Code 128：

```txt
Free Code 128 Barcode Generator | Barcode Mint
```

UPC-A：

```txt
Free UPC-A Barcode Generator | Barcode Mint
```

EAN-13：

```txt
Free EAN-13 Barcode Generator | Barcode Mint
```

Code 39：

```txt
Free Code 39 Barcode Generator | Barcode Mint
```

ITF：

```txt
Free ITF Barcode Generator | Interleaved 2 of 5 | Barcode Mint
```

Excel：

```txt
Barcode Generator for Excel | Paste SKUs and Export Barcodes
```

Label：

```txt
Barcode Label Generator | Printable Barcode Labels PDF
```

Bulk：

```txt
Bulk Barcode Generator | Create Multiple Barcodes Online
```

## 5.2 Meta Description 要求

每个页面 meta description 必须：

* 120-160 字符左右
* 包含页面主关键词
* 说明免费、浏览器运行、下载格式
* 不要重复堆砌关键词

## 5.3 Canonical

每个页面必须有 canonical，指向自身正式 URL。

## 5.4 Sitemap

新增页面后更新 sitemap：

必须包含：

```txt
/code-39-barcode-generator
/itf-barcode-generator
```

如果 Data Matrix 已真实实现，则包含：

```txt
/data-matrix-generator
```

如果 Data Matrix 未实现，不要加入 sitemap。

---

# 6. 埋点需求

如果项目中已有 analytics 方案，则增加事件埋点。
如果项目中没有 analytics 方案，则实现一个轻量封装函数，不强行接第三方服务，先用统一函数占位，方便以后接 Cloudflare Web Analytics / Plausible / GA4。

事件名称：

```txt
barcode_generate
barcode_validation_error
download_png
download_svg
export_pdf
download_csv_template
bulk_parse
label_pdf_export
barcode_type_change
```

事件参数：

```txt
page
barcode_type
mode
valid
row_count
error_count
format
```

要求：

* 不要上报用户输入的 barcode value
* 不要上报 label text
* 不要上报 extra text
* 只上报类型、数量、格式、是否成功

验收标准：

* 每个核心按钮点击时调用埋点函数
* 不泄露用户输入内容
* 没有 analytics 配置时页面不报错

---

# 7. 技术实现要求

## 7.1 代码组织

Codex 需要先检查现有项目结构，然后优先复用现有组件。

建议抽象或复用以下模块：

```txt
BarcodeGenerator
BarcodeTypeSelector
BarcodeInput
BarcodePreview
DownloadActions
ValidationMessage
BulkBarcodeInput
BulkBarcodeTable
LabelTemplateSelector
LabelPreview
PdfExportPanel
SeoContentBlock
FaqBlock
RelatedTools
```

如果现有项目已有类似组件，不要重复创建同名功能组件。

## 7.2 条码类型配置

建议使用统一配置表管理条码类型：

```ts
type BarcodeTypeConfig = {
  id: string
  label: string
  route: string
  description: string
  placeholder: string
  example: string
  validate: (value: string) => ValidationResult
  normalize?: (value: string) => string
  seoTitle: string
  seoDescription: string
}
```

至少包含：

```txt
code128
upca
ean13
code39
itf
```

Data Matrix 只有真实实现后再加入。

## 7.3 校验逻辑

校验函数必须独立于 UI，方便单元测试。

ValidationResult 建议结构：

```ts
type ValidationResult = {
  valid: boolean
  normalizedValue?: string
  message: string
  level: 'success' | 'warning' | 'error'
}
```

## 7.4 下载逻辑

下载逻辑必须独立封装，避免散落在各页面。

建议函数：

```ts
downloadBarcodePng(options)
downloadBarcodeSvg(options)
exportBarcodePdf(options)
exportLabelSheetPdf(options)
downloadCsvTemplate()
```

## 7.5 Cloudflare Pages 兼容性

如果项目部署在 Cloudflare Pages，必须保证：

* 不依赖 Node.js server runtime
* 不使用需要服务端文件写入的逻辑
* 静态 CSV 放 public 目录
* 前端导出在浏览器中完成
* 构建命令正常运行

---

# 8. 测试要求

Codex 完成后必须执行项目现有检查命令。

按项目实际情况执行：

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

如果项目没有某个命令，不要强行创建无意义命令，但需要在最终回复里说明。

## 8.1 手工验收路径

需要至少手工验证以下 URL：

```txt
/
 /code-128-barcode-generator
 /upc-barcode-generator
 /ean-13-barcode-generator
 /barcode-generator-for-excel
 /bulk-barcode-generator
 /barcode-label-generator
 /code-39-barcode-generator
 /itf-barcode-generator
```

如果实现 Data Matrix，再验证：

```txt
/data-matrix-generator
```

## 8.2 核心用例

### Code 128

输入：

```txt
SKU001
```

期望：

* valid
* preview 正常
* PNG 下载正常
* SVG 下载正常

### UPC-A

输入：

```txt
036000291452
```

期望：

* valid
* preview 正常
* PNG / SVG 正常

输入：

```txt
ABC123
```

期望：

* invalid
* 提示 UPC-A only supports 12 numeric digits

### EAN-13

输入：

```txt
5901234123457
```

期望：

* valid

输入：

```txt
590123
```

期望：

* invalid
* 提示 EAN-13 requires 13 numeric digits

### Code 39

输入：

```txt
SKU-001
```

期望：

* valid

输入：

```txt
sku-001
```

期望：

* 自动转成 SKU-001 或显示可理解提示

### ITF

输入：

```txt
123456
```

期望：

* valid

输入：

```txt
12345
```

期望：

* warning 或 invalid
* 提示 ITF usually requires an even number of digits

### Excel 粘贴

输入：

```txt
SKU001	Black T-Shirt	Size M
SKU002	White Mug	Shelf A-12
5901234123457	Sample EAN-13 Product	Retail
```

期望：

* 3 rows detected
* 3 valid
* 0 errors

### Label PDF

输入：

```txt
Barcode Value: SKU001
Quantity: 30
Paper: US Letter
Label Size: 2 x 1 inch
```

期望：

* PDF 正常导出
* 生成 30 个标签
* 打印提示显示

---

# 9. 最终交付要求

Codex 完成后，需要输出：

1. 修改文件列表
2. 新增文件列表
3. 新增路由列表
4. 新增依赖列表，如有
5. 已执行的检查命令和结果
6. 未完成项说明
7. Data Matrix 是否实现；如果未实现，说明原因
8. 是否修改 robots.txt；正常情况下应为“未修改”

最终不能只说“完成了”，必须说明具体改了什么。

---

# 10. 本次成功标准

本次优化完成后，站点必须达到：

* 首页和所有工具页仍可正常访问
* 现有 URL 不被破坏
* robots.txt 不被改坏
* 单条码页面支持 PNG / SVG 下载
* Excel 页面支持 CSV 模板下载
* Excel / Bulk 支持粘贴解析摘要和错误行提示
* Label 页面支持更清晰的打印 PDF 流程
* 首屏能看到免费、无需注册、浏览器本地处理等信任信息
* 不出现虚假评价、虚假数据、虚假评分
* 新增 Code 39 和 ITF 页面
* sitemap 包含真实可访问的新页面
* 移动端无严重横向滚动
* 构建通过
* 不上传用户输入内容

