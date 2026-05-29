# Barcode 工具站 MVP PRD

## 1. 项目背景

本项目是一个面向欧美用户的在线 Barcode 工具站，主要服务小商家、电商卖家和库存管理人员。

当前搜索结果中，`barcode generator` 相关 SERP 主要由条码硬件厂商、工业公司、条码软件公司、电商 SaaS 附属工具页占据。多数页面不是专门的在线工具站，存在界面老旧、移动端体验一般、批量能力弱、标签打印流程不完整等问题。

本 MVP 的目标是先做一个体验更现代、更快、更聚焦的在线 barcode 工具，验证 SEO 和用户使用行为。

---

## 2. 产品定位

英文定位：

```text
Free Barcode Generator for Products, Inventory, and Labels
```

核心卖点：

```text
Create printable barcode labels from your product list in seconds.
```

中文理解：

```text
用户把商品或库存编码粘进来，几秒钟内生成条码，并导出可打印标签。
```

---

## 3. 目标用户

### 3.1 小商家 / 电商卖家

典型用户：

- Etsy seller
- Shopify seller
- Amazon seller
- eBay seller
- handmade product seller

典型需求：

- 给商品生成 SKU 条码
- 批量生成商品条码
- 从 Excel / Google Sheets 粘贴商品列表
- 下载 PNG / SVG
- 导出 PDF 标签
- 打印后贴到商品包装上

---

### 3.2 库存管理人员

典型用户：

- warehouse operator
- inventory manager
- office manager
- school administrator
- librarian

典型需求：

- 给货架、箱子、资产、文件生成条码
- 编码可能包含字母、数字、连字符
- 需要 Code 128
- 需要批量生成
- 需要打印标签

---

### 3.3 一次性轻用户

典型用户：

- 搜索 `barcode generator`
- 只想生成一个条码
- 不想注册
- 不想看复杂教程

典型需求：

- 打开即用
- 输入内容
- 看到预览
- 下载图片

---

## 4. MVP 目标

MVP 要验证：

1. Google 是否愿意收录页面。
2. 长尾关键词是否产生 impressions。
3. 用户是否真实生成条码。
4. 用户是否下载 PNG / SVG / PDF。
5. Bulk / Excel / Label 方向是否有使用行为。
6. 页面体验是否比现有竞品更顺滑。

---

## 5. MVP 页面范围

第一版必须上线以下页面：

```text
/
首页：Free Barcode Generator

/code-128-barcode-generator
Code 128 Barcode Generator

/upc-a-barcode-generator
UPC-A Barcode Generator

/ean-13-barcode-generator
EAN-13 Barcode Generator

/bulk-barcode-generator
Bulk Barcode Generator

/barcode-label-generator
Barcode Label Generator

/barcode-generator-for-excel
Barcode Generator for Excel

/printable-barcode-generator
Printable Barcode Generator

/privacy
Privacy Policy

/terms
Terms of Use
```

---

## 6. MVP 功能范围

### 6.1 单个条码生成

用户可以：

- 选择条码类型
- 输入 barcode value
- 实时预览条码
- 下载 PNG
- 下载 SVG
- 导出 PDF
- 复制 barcode value

支持类型：

- Code 128
- UPC-A
- EAN-13

默认类型：

```text
Code 128
```

默认示例：

```text
SKU-001
```

---

### 6.2 条码校验

必须支持：

#### Code 128

规则：

- 支持字母、数字和常见符号
- 长度 1-80 字符
- 适合 SKU、库存编号、内部编码

#### UPC-A

规则：

- 只支持数字
- 标准长度 12 位
- 输入 11 位时自动计算 check digit
- 输入 12 位时校验 check digit

#### EAN-13

规则：

- 只支持数字
- 标准长度 13 位
- 输入 12 位时自动计算 check digit
- 输入 13 位时校验 check digit

---

### 6.3 智能推荐

当用户输入内容后，系统给出推荐。

示例：

输入：

```text
SKU-001
```

提示：

```text
This looks like a custom SKU. Code 128 is recommended.
```

输入 12 位数字：

```text
This looks like a UPC-A barcode.
```

输入 13 位数字：

```text
This looks like an EAN-13 barcode.
```

---

### 6.4 PNG / SVG 下载

PNG 要求：

- 白底
- 清晰
- 可用于打印
- 文件名包含 barcode value

SVG 要求：

- 可独立打开
- 尽量保持矢量清晰
- 文件名包含 barcode value

文件名示例：

```text
barcode-SKU-001.png
barcode-SKU-001.svg
```

---

### 6.5 PDF 导出

MVP 支持基础 PDF：

- 单个条码 PDF
- 基础标签 PDF
- 简单批量 PDF

纸张支持：

- US Letter
- A4

默认：

```text
US Letter
```

打印提示：

```text
For best results, print at 100% scale and disable “Fit to page”.
```

---

### 6.6 Bulk Barcode Generator

用户可以粘贴多行内容：

```text
SKU001
SKU002
SKU003
```

也可以从 Excel / Google Sheets 复制表格：

```text
SKU001    Black T-Shirt    $19.99
SKU002    White Mug        $12.99
SKU003    Phone Case       $9.99
```

默认字段映射：

```text
第 1 列：Barcode Value
第 2 列：Label Text
第 3 列：Extra Text
```

限制：

```text
单次最多 100 条
```

超过限制时提示：

```text
You can generate up to 100 barcodes at once in this version.
```

---

### 6.7 Barcode Label Generator

当前实现状态：MVP 已完成。

MVP 支持 3 个基础标签模板：

#### Simple

```text
[Barcode]
SKU001
```

#### Product

```text
Black T-Shirt
[Barcode]
SKU001
```

#### Inventory

```text
Item: Black T-Shirt
[Barcode]
Location: Aisle 3 / Bin 12
SKU001
```

标签尺寸：

- 2 x 1 inch
- 3 x 2 inch

纸张：

- US Letter
- A4

已实现能力：

- `/barcode-label-generator` 用于创建基础可打印 barcode labels。
- `/printable-barcode-generator` 用于导出 printable barcode labels as PDF。
- 标签预览会显示条码、barcode value 和模板对应文字。
- PDF 导出支持 US Letter 和 A4。
- PDF 导出包含打印提示。

明确不包含：

- Avery 高级模板。
- 高级打印设置。
- 用户账号、云端保存或服务端处理。

---

### 6.8 Excel / Google Sheets 粘贴解析

页面：

```text
/barcode-generator-for-excel
```

用户可以直接粘贴表格内容。

解析规则：

- 优先识别 tab 分隔
- 其次识别逗号分隔
- 再识别换行
- 空行跳过
- 非法行标红

解析后显示：

- Barcode Value
- Label Text
- Extra Text
- Status

---

## 7. 页面 SEO 要求

当前实现状态：Task 08 已完成。

每个公开页面必须有：

- 唯一 title
- 唯一 meta description
- 唯一 H1
- canonical
- Open Graph title
- Open Graph description
- FAQ Schema
- SoftwareApplication Schema
- BreadcrumbList Schema
- Related Tools 内链

已实现能力：

- `public/sitemap.xml` 覆盖首页、所有工具页、Privacy 和 Terms。
- `public/robots.txt` 允许公开页面抓取，并声明 Sitemap。
- 8 个工具页均输出 canonical、Open Graph title、Open Graph description。
- 8 个工具页均输出 FAQ Schema、SoftwareApplication Schema、BreadcrumbList Schema。
- `/privacy` 和 `/terms` 均有唯一 title、description、H1、canonical。
- `/privacy` 明确说明 barcode 数据在浏览器处理、不上传、不保存输入，以及可能使用匿名统计。
- `/terms` 明确说明工具按现状提供、用户自行确认 barcode 适用性、不提供 GS1 UPC/EAN 注册、不保证所有零售系统接受。

---

## 8. 页面文案

### 首页

Title：

```text
Free Barcode Generator | Create Barcode Labels Online
```

Meta Description：

```text
Create free barcodes online for products, inventory, and labels. Generate Code 128, UPC-A, and EAN-13 barcodes and download as PNG, SVG, or PDF.
```

H1：

```text
Free Barcode Generator for Products, Inventory, and Labels
```

Subtitle：

```text
Create single or bulk barcodes online. Import SKUs from Excel and export printable barcode labels as PNG, SVG, or PDF.
```

Trust Note：

```text
No sign-up required · Works in your browser · PNG, SVG, PDF
```

Privacy Note：

```text
Your barcode data is processed in your browser and is not uploaded to our servers.
```

---

### Code 128 页面

URL：

```text
/code-128-barcode-generator
```

Title：

```text
Code 128 Barcode Generator | Free Online Barcode Tool
```

H1：

```text
Code 128 Barcode Generator
```

Subtitle：

```text
Generate Code 128 barcodes for SKUs, inventory labels, and product codes. Download as PNG, SVG, or PDF.
```

默认值：

```text
SKU-001
```

---

### UPC-A 页面

URL：

```text
/upc-a-barcode-generator
```

Title：

```text
UPC-A Barcode Generator | Free Online UPC Barcode Tool
```

H1：

```text
UPC-A Barcode Generator
```

Subtitle：

```text
Create UPC-A barcodes online and download them as PNG, SVG, or PDF.
```

默认值：

```text
03600029145
```

---

### EAN-13 页面

URL：

```text
/ean-13-barcode-generator
```

Title：

```text
EAN-13 Barcode Generator | Free Online EAN Barcode Tool
```

H1：

```text
EAN-13 Barcode Generator
```

Subtitle：

```text
Create EAN-13 barcodes online for international product codes.
```

默认值：

```text
590123412345
```

---

### Bulk 页面

URL：

```text
/bulk-barcode-generator
```

Title：

```text
Bulk Barcode Generator | Create Multiple Barcodes Online
```

H1：

```text
Bulk Barcode Generator
```

Subtitle：

```text
Paste multiple SKUs or product codes and generate barcodes in bulk.
```

---

### Label 页面

URL：

```text
/barcode-label-generator
```

Title：

```text
Barcode Label Generator | Print Barcode Labels Online
```

H1：

```text
Barcode Label Generator
```

Subtitle：

```text
Create printable barcode labels for products, inventory, shelves, and small business workflows.
```

---

### Excel 页面

URL：

```text
/barcode-generator-for-excel
```

Title：

```text
Barcode Generator for Excel | Create Barcodes from Spreadsheets
```

H1：

```text
Barcode Generator for Excel
```

Subtitle：

```text
Paste your Excel or Google Sheets product list and generate barcodes in bulk.
```

---

### Printable 页面

URL：

```text
/printable-barcode-generator
```

Title：

```text
Printable Barcode Generator | Export Barcode Labels as PDF
```

H1：

```text
Printable Barcode Generator
```

Subtitle：

```text
Create printable barcodes and barcode labels as PDF for products and inventory.
```

---

## 9. UI/UX 要求

页面风格：

- 干净
- 现代
- 工具优先
- 商业友好
- 移动端友好

首屏必须包括：

- H1
- 简短副标题
- 工具区域
- 条码预览
- 下载按钮
- 隐私提示

首页推荐 Tabs：

```text
Single Barcode
Bulk Barcodes
Label Sheet
```

不要把 SEO 内容放在工具前面。

---

## 10. 非功能需求

性能：

- Lighthouse Performance >= 90
- LCP < 2.5s
- CLS < 0.1
- 批量 100 条生成时间 < 3 秒

兼容：

- Chrome
- Safari
- Firefox
- Edge
- iOS Safari
- Android Chrome

隐私：

- 不上传用户输入
- 不保存 barcode value
- 不需要登录
- 在页面明确说明本地处理

---

## 11. MVP 不做

明确不做：

- 注册登录
- 付费功能
- API
- 数据库
- 云端保存
- 高级 Avery 模板
- 上传 xlsx 文件
- 条码扫描
- 多语言
- 后台 CMS

---

## 12. 成功指标

30 天：

- Google 收录 8+ 页面
- GSC impressions > 500
- 工具生成次数 > 100
- 下载次数 > 20

90 天：

- Google 收录 15+ 页面
- GSC impressions > 5,000
- 至少 5 个长尾词进入 Top 50
- 至少 1 个长尾词进入 Top 20
- 工具生成次数 > 1,000
- 下载次数 > 200
- Bulk 使用率 > 5%
- PDF 导出率 > 2%
