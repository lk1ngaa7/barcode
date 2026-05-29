# Barcode 工具站 MVP 验收标准

## 1. 总体验收

MVP 完成后必须满足：

- 用户打开首页可以立即生成 barcode。
- 用户不需要注册。
- 用户不需要登录。
- 用户输入合法内容后可以看到条码预览。
- 用户可以下载 PNG。
- 用户可以下载 SVG。
- 用户可以导出基础 PDF。
- 用户可以批量粘贴多个 barcode value。
- 用户可以从 Excel / Google Sheets 粘贴表格。
- 用户可以生成基础标签。
- 所有公开页面可以被静态生成。
- 项目可以部署到 Cloudflare Pages。

---

## 2. 功能验收

### 2.1 Code 128

必须通过：

```text
输入 SKU-001 可以生成 Code 128
输入 ITEM-2026-A 可以生成 Code 128
输入空字符串时显示错误
输入超过 80 字符时显示错误
```

成功提示示例：

```text
Valid Code 128 barcode. Good for SKUs and inventory labels.
```

---

### 2.2 UPC-A

必须通过：

```text
输入 11 位数字时，系统自动计算第 12 位 check digit
输入 12 位合法数字时，系统显示 valid
输入 12 位但 check digit 错误时，系统显示错误
输入字母时，系统显示错误
输入符号时，系统显示错误
```

错误提示示例：

```text
UPC-A only supports 12 numeric digits. Use Code 128 for custom SKU values like “SKU-001”.
```

---

### 2.3 EAN-13

必须通过：

```text
输入 12 位数字时，系统自动计算第 13 位 check digit
输入 13 位合法数字时，系统显示 valid
输入 13 位但 check digit 错误时，系统显示错误
输入字母时，系统显示错误
输入符号时，系统显示错误
```

错误提示示例：

```text
EAN-13 requires 13 numeric digits, or 12 digits if you want us to calculate the check digit.
```

---

### 2.4 智能推荐

必须通过：

```text
输入 SKU-001 时，提示推荐 Code 128
输入 12 位数字时，提示可能是 UPC-A
输入 13 位数字时，提示可能是 EAN-13
```

示例：

```text
This looks like a custom SKU. Code 128 is recommended.
```

---

### 2.5 PNG 下载

必须通过：

- PNG 文件可以下载。
- PNG 文件可以打开。
- PNG 背景为白色。
- PNG 条码清晰。
- 文件名包含 barcode value。

示例：

```text
barcode-SKU-001.png
```

---

### 2.6 SVG 下载

必须通过：

- SVG 文件可以下载。
- SVG 文件可以独立打开。
- SVG 条码不变形。
- 文件名包含 barcode value。

示例：

```text
barcode-SKU-001.svg
```

---

### 2.7 PDF 导出

必须通过：

- PDF 文件可以下载。
- PDF 文件可以打开。
- PDF 包含条码。
- PDF 包含 barcode value。
- PDF 中条码清晰。
- PDF 支持 US Letter。
- PDF 支持 A4。

打印提示必须出现：

```text
For best results, print at 100% scale and disable “Fit to page”.
```

---

### 2.8 Bulk 批量生成

必须通过：

```text
粘贴 1 行可以生成
粘贴 10 行可以生成
粘贴 100 行可以生成
超过 100 行时显示限制提示
非法行标红
非法行显示错误原因
合法行正常生成
```

输入示例：

```text
SKU001
SKU002
SKU003
```

---

### 2.9 Excel / Google Sheets 粘贴

必须通过：

```text
Tab 分隔内容可以解析
逗号分隔内容可以解析
空行自动跳过
第一列识别为 Barcode Value
第二列识别为 Label Text
第三列识别为 Extra Text
错误行显示错误
```

输入示例：

```text
SKU001    Black T-Shirt    $19.99
SKU002    White Mug        $12.99
SKU003    Phone Case       $9.99
```

解析后字段：

```text
Barcode Value = SKU001
Label Text = Black T-Shirt
Extra Text = $19.99
```

---

### 2.10 Label Generator

必须通过：

- 可以选择 Simple 模板。
- 可以选择 Product 模板。
- 可以选择 Inventory 模板。
- 可以选择 2 x 1 inch。
- 可以选择 3 x 2 inch。
- 可以选择 US Letter。
- 可以选择 A4。
- 标签预览显示条码。
- 标签预览显示文字。
- 可以导出 PDF。

当前验收状态：已通过 Task 07 验收。

已验证：

- `/barcode-label-generator` 可选择 Simple / Product / Inventory。
- `/printable-barcode-generator` 默认进入 printable label 场景。
- 2 x 1 inch / 3 x 2 inch 可切换。
- US Letter / A4 可切换。
- 标签预览显示条码和文字。
- PDF 导出包含条码和文字。
- 无效输入时 PDF 导出不可用。
- 两个页面均有唯一 title、description、H1、canonical。
- 两个页面均有 FAQ Schema、SoftwareApplication Schema、BreadcrumbList Schema。

---

## 3. 页面验收

### 3.1 必须存在的页面

以下页面必须可访问：

```text
/
首页

/code-128-barcode-generator
Code 128 页面

/upc-a-barcode-generator
UPC-A 页面

/ean-13-barcode-generator
EAN-13 页面

/bulk-barcode-generator
Bulk 页面

/barcode-label-generator
Label 页面

/barcode-generator-for-excel
Excel 页面

/printable-barcode-generator
Printable 页面

/privacy
Privacy 页面

/terms
Terms 页面
```

---

### 3.2 首页验收

首页必须包含：

- H1
- 副标题
- 工具组件
- 条码预览
- 下载按钮
- 隐私提示
- How to use
- Supported barcode types
- FAQ
- Related Tools

H1：

```text
Free Barcode Generator for Products, Inventory, and Labels
```

---

### 3.3 Code 128 页面验收

必须满足：

- URL 正确
- Title 唯一
- Meta description 唯一
- H1 唯一
- 默认条码类型为 Code 128
- 默认示例为 SKU-001
- 页面说明 Code 128 适合 SKU 和库存编码

---

### 3.4 UPC-A 页面验收

必须满足：

- URL 正确
- Title 唯一
- Meta description 唯一
- H1 唯一
- 默认条码类型为 UPC-A
- 页面说明 UPC-A 是 12 位数字
- 页面说明 check digit

---

### 3.5 EAN-13 页面验收

必须满足：

- URL 正确
- Title 唯一
- Meta description 唯一
- H1 唯一
- 默认条码类型为 EAN-13
- 页面说明 EAN-13 是 13 位数字
- 页面说明 check digit

---

## 4. SEO 验收

当前验收状态：已通过 Task 08 验收。

每个公开工具页必须满足：

- 唯一 title
- 唯一 meta description
- 唯一 H1
- canonical URL
- Open Graph title
- Open Graph description
- FAQ Schema
- SoftwareApplication Schema
- BreadcrumbList Schema
- Related Tools 内链
- 页面源码中包含主要文本内容
- 工具在首屏可见

已验证：

- 8 个工具页均生成 canonical URL。
- 8 个工具页均生成 Open Graph title 和 Open Graph description。
- 8 个工具页均生成 FAQ Schema、SoftwareApplication Schema、BreadcrumbList Schema。
- `dist/sitemap.xml` 包含首页、所有工具页、Privacy 和 Terms。
- `dist/robots.txt` 允许抓取公开页面，并包含 Sitemap。
- `/privacy` 可静态生成，并说明浏览器本地处理、不上传、不保存输入和匿名统计。
- `/terms` 可静态生成，并说明按现状提供、用户自行确认适用性、不提供 GS1 注册和不保证零售系统接受。
- `pnpm generate` 成功。

---

### 4.1 Sitemap

必须存在：

```text
/sitemap.xml
```

必须包含：

- 首页
- 所有工具页
- Privacy
- Terms

---

### 4.2 Robots

必须存在：

```text
/robots.txt
```

必须允许 Google 抓取公开页面。

---

### 4.3 FAQ Schema

工具页必须包含 FAQ Schema。

FAQ 内容必须和页面主题相关。

不要所有页面复制完全相同 FAQ。

---

### 4.4 Canonical

每个页面必须有 canonical，并指向自身正式 URL。

---

## 5. UI/UX 验收

必须满足：

- 工具在首屏可见。
- 页面不是先显示长篇 SEO 内容。
- 输入框有 label。
- 错误提示靠近输入框。
- 下载按钮明显。
- 移动端按钮可点击。
- 移动端输入框可用。
- 条码预览不溢出。
- Bulk 页面移动端可读。
- 不出现横向滚动。
- 不出现弹窗广告。
- 不在输入框和预览之间插广告。

---

## 6. 移动端验收

在 375px 宽度下必须满足：

- 首页可正常浏览。
- 工具可正常使用。
- Barcode Type 可选择。
- Barcode Value 可输入。
- Preview 不溢出。
- 下载按钮可点击。
- Bulk 输入框可使用。
- 表格或卡片布局可读。
- 页面无横向滚动。

---

## 7. 性能验收

目标：

```text
Lighthouse Performance >= 90
LCP < 2.5s
CLS < 0.1
INP 达标
```

批量性能：

```text
100 条 barcode 生成时间 < 3 秒
```

构建性能：

```bash
pnpm generate
```

必须成功。

---

## 8. 隐私验收

必须满足：

- 页面明确说明 barcode 数据在浏览器处理。
- 不上传用户输入到服务器。
- 不保存 barcode value。
- 不需要登录。
- Privacy 页面存在。
- Terms 页面存在。

隐私提示文案：

```text
Your barcode data is processed in your browser and is not uploaded to our servers.
```

---

## 9. 部署验收

必须满足：

- 项目可以在本地运行。
- 项目可以静态生成。
- `dist` 输出正常。
- Cloudflare Pages 可以部署。
- 自定义域名可以配置 HTTPS。
- sitemap 可访问。
- robots 可访问。
- 404 页面正常。

必跑命令：

```bash
pnpm install
pnpm generate
```

如存在以下命令，也必须通过：

```bash
pnpm typecheck
pnpm lint
```

---

## 10. 最终通过标准

MVP 只有在以下条件全部满足时，才算完成：

1. 所有 MVP 页面可访问。
2. 单个条码生成可用。
3. Code 128 / UPC-A / EAN-13 校验正确。
4. PNG / SVG / PDF 导出可用。
5. Bulk 批量生成可用。
6. Excel 粘贴解析可用。
7. 基础 Label 生成可用。
8. SEO metadata 完整。
9. Schema 完整。
10. Sitemap 和 Robots 正常。
11. 移动端可用。
12. `pnpm generate` 成功。
13. 可以部署到 Cloudflare Pages。
