# Barcode 工具站 MVP 任务拆分

## 任务原则

不要一次性实现完整项目。

Codex 必须按任务顺序逐步实现，每次只完成一个任务，不要擅自扩大范围。

每个任务完成后必须：

1. 运行构建命令。
2. 说明修改了哪些文件。
3. 说明完成了哪些功能。
4. 说明是否有遗留问题。
5. 不要跳过验收标准。

---

## Task 01 - 项目初始化

### 目标

初始化 Nuxt + TypeScript + Tailwind 项目，并确保可以部署到 Cloudflare Pages。

### 交付内容

- Nuxt 项目结构
- TypeScript 配置
- Tailwind CSS 配置
- 基础 layout
- 首页占位页面
- package.json scripts
- Cloudflare Pages 静态生成兼容

### 技术要求

- Nuxt 4
- Vue 3
- Tailwind CSS
- pnpm

### 验收标准

必须满足：

```bash
pnpm install
pnpm dev
pnpm generate
```

并且：

- 本地开发服务可启动
- 首页可访问
- `pnpm generate` 输出 `dist`
- 没有明显构建错误

---

## Task 02 - 条码核心逻辑

### 目标

实现可复用的条码校验、check digit 和条码生成基础逻辑。

### 交付内容

创建或完善：

```text
utils/barcodeTypes.ts
utils/validateBarcode.ts
utils/checkDigit.ts
utils/exportSvg.ts
```

实现：

- Code 128 校验
- UPC-A 校验
- UPC-A check digit 计算
- EAN-13 校验
- EAN-13 check digit 计算
- 条码类型定义
- 错误信息定义

### 规则

Code 128：

- 支持字母、数字和常见符号
- 长度 1-80 字符

UPC-A：

- 允许 11 位数字自动补 check digit
- 允许 12 位数字并校验 check digit
- 不允许非数字

EAN-13：

- 允许 12 位数字自动补 check digit
- 允许 13 位数字并校验 check digit
- 不允许非数字

### 验收标准

必须满足：

- `SKU-001` 可作为 Code 128 输入
- UPC-A 输入 11 位数字可生成 12 位
- UPC-A 输入 12 位数字可校验
- EAN-13 输入 12 位数字可生成 13 位
- EAN-13 输入 13 位数字可校验
- 非法输入返回明确错误信息

---

## Task 03 - 单个条码生成 UI

### 目标

实现首页可用的单个 Barcode Generator 组件。

### 交付内容

创建或完善：

```text
components/tool/BarcodeGenerator.vue
components/tool/BarcodeTypeSelector.vue
components/tool/BarcodeInput.vue
components/tool/BarcodePreview.vue
components/tool/BarcodeValidationMessage.vue
components/tool/BarcodeDownloadActions.vue
```

功能：

- 选择条码类型
- 输入 barcode value
- 实时校验
- 实时预览
- 下载 PNG
- 下载 SVG
- 基础 PDF 导出
- 错误提示
- 移动端布局

### UI 要求

- 工具必须在首屏
- 输入框有 label
- 下载按钮明显
- 错误提示靠近输入框
- 输入非法时禁用下载按钮
- 条码预览不溢出

### 验收标准

必须满足：

- Code 128 可生成并下载
- UPC-A 可生成并下载
- EAN-13 可生成并下载
- 输入非法时显示错误
- 输入非法时不能下载
- 移动端可用

---

## Task 04 - SEO 页面基础

### 目标

创建 MVP 第一批 SEO 工具页。

### 交付页面

```text
/
首页

/code-128-barcode-generator
Code 128 页面

/upc-a-barcode-generator
UPC-A 页面

/ean-13-barcode-generator
EAN-13 页面
```

### 每个页面必须有

- 唯一 title
- 唯一 meta description
- 唯一 H1
- canonical
- 工具组件
- FAQ
- Related Tools

### 页面默认配置

Code 128 页面：

```text
默认类型：Code 128
默认示例：SKU-001
```

UPC-A 页面：

```text
默认类型：UPC-A
默认示例：03600029145
```

EAN-13 页面：

```text
默认类型：EAN-13
默认示例：590123412345
```

### 验收标准

- 4 个页面都可访问
- 4 个页面 title 不重复
- 4 个页面 meta description 不重复
- 每页只有一个 H1
- 工具在首屏可见
- Related Tools 存在

---

## Task 05 - Bulk Barcode Generator

### 目标

实现批量条码生成能力。

### 交付页面

```text
/bulk-barcode-generator
```

### 交付组件

```text
components/tool/BulkBarcodeInput.vue
components/tool/BulkBarcodeTable.vue
```

### 功能

- 多行文本粘贴
- 每行作为一个 barcode value
- 批量校验
- 批量预览
- 单次最多 100 条
- 非法行标红
- 支持导出基础 PDF

### 输入示例

```text
SKU001
SKU002
SKU003
```

### 验收标准

- 可粘贴多行
- 可生成 100 条以内数据
- 非法行有错误提示
- 页面不卡死
- Bulk 页面有唯一 title、description、H1

---

## Task 06 - Excel / Google Sheets 粘贴解析

### 目标

支持从 Excel 或 Google Sheets 复制表格后直接粘贴生成条码。

### 交付页面

```text
/barcode-generator-for-excel
```

### 功能

- 识别 tab 分隔
- 识别逗号分隔
- 识别换行
- 第一列作为 Barcode Value
- 第二列作为 Label Text
- 第三列作为 Extra Text
- 空行跳过
- 错误行标红

### 输入示例

```text
SKU001    Black T-Shirt    $19.99
SKU002    White Mug        $12.99
SKU003    Phone Case       $9.99
```

### 验收标准

- Excel 粘贴内容能解析成表格
- 能显示识别到的行数
- 能显示 valid/error 状态
- 能批量生成条码
- Excel 页面有唯一 title、description、H1

---

## Task 07 - 基础标签生成器

状态：已完成。

### 目标

实现基础 Barcode Label Generator。

### 交付页面

```text
/barcode-label-generator
/printable-barcode-generator
```

### 交付组件

```text
components/tool/LabelDesigner.vue
components/tool/PdfExportPanel.vue
```

### 标签模板

MVP 支持：

```text
Simple
Product
Inventory
```

Simple：

```text
[Barcode]
SKU001
```

Product：

```text
Black T-Shirt
[Barcode]
SKU001
```

Inventory：

```text
Item: Black T-Shirt
[Barcode]
Location: Aisle 3 / Bin 12
SKU001
```

### 标签尺寸

支持：

```text
2 x 1 inch
3 x 2 inch
```

纸张：

```text
US Letter
A4
```

### 验收标准

- 可选择标签模板
- 可看到标签预览
- 可导出 PDF
- PDF 中包含条码和文字
- Label 页面有唯一 title、description、H1
- Printable 页面有唯一 title、description、H1

### 完成记录

已完成：

- 新增 `/barcode-label-generator` 页面。
- 新增 `/printable-barcode-generator` 页面。
- 新增 `components/tool/LabelDesigner.vue`。
- 新增 `components/tool/PdfExportPanel.vue`。
- 支持 Simple / Product / Inventory 三种基础模板。
- 支持 2 x 1 inch / 3 x 2 inch 标签尺寸。
- 支持 US Letter / A4 纸张。
- 支持标签预览。
- 支持导出包含条码和文字的 PDF。
- 两个页面均接入唯一 title、description、H1、canonical。
- 两个页面均接入 FAQ Schema、SoftwareApplication Schema、BreadcrumbList Schema。

未做：

- 未做 Avery 高级模板。
- 未做高级打印设置。
- 未做批量 ZIP 下载。

---

## Task 08 - SEO 基建

状态：已完成。

### 目标

补齐 SEO 基础设施。

### 交付内容

- sitemap.xml
- robots.txt
- canonical URLs
- FAQ Schema
- SoftwareApplication Schema
- BreadcrumbList Schema
- Privacy 页面
- Terms 页面

### 页面要求

Privacy 页面说明：

- 不上传用户 barcode 数据
- 不保存用户输入
- 可能使用匿名统计工具
- 用户数据在浏览器处理

Terms 页面说明：

- 工具按现状提供
- 用户自行确认条码适用性
- 不提供 GS1 官方 UPC/EAN 注册
- 不保证所有零售系统都接受生成结果

### 验收标准

- sitemap.xml 可访问
- robots.txt 可访问
- 每个工具页有 JSON-LD
- Privacy 页面可访问
- Terms 页面可访问
- `pnpm generate` 成功

### 完成记录

已完成：

- 新增 `public/sitemap.xml`。
- 更新 `public/robots.txt`，允许抓取公开页面并声明 Sitemap。
- 所有 8 个工具页均输出 canonical URL。
- 所有 8 个工具页均输出 FAQ Schema、SoftwareApplication Schema、BreadcrumbList Schema。
- `/privacy` 页面已替换占位内容，并说明浏览器本地处理、不上传、不保存输入和匿名统计。
- `/terms` 页面已替换占位内容，并说明按现状提供、用户自行确认适用性、不提供 GS1 注册和不保证所有零售系统接受。
- `/privacy` 和 `/terms` 均接入唯一 title、description、canonical 和 Open Graph metadata。

已验证：

- `pnpm typecheck` 通过。
- `pnpm generate` 通过。
- `dist/sitemap.xml` 包含首页、所有工具页、Privacy 和 Terms。
- `dist/robots.txt` 可访问并包含 Sitemap。
- 每个工具页生成 3 个 JSON-LD script。

---

## Task 09 - 移动端与性能优化

状态：已完成。

### 目标

优化移动端体验和性能。

### 要求

- 移动端工具首屏可见
- 输入框高度至少 44px
- 按钮高度至少 44px
- 条码预览不横向溢出
- Bulk 表格移动端可读
- Lighthouse Performance >= 90
- LCP < 2.5s
- CLS < 0.1

### 验收标准

- 手机宽度 375px 下可正常使用
- 首页无横向滚动
- 工具按钮清晰
- 批量页面移动端可操作
- 构建成功

### 完成记录

已完成：

- 移动端首页 intro 高度已压缩，工具区和 Barcode Value 输入在 375px 首屏内更早出现。
- 移动端 Barcode Type 选择器改为三列紧凑布局，并保留当前选中类型说明。
- Header、Footer、工具 tab、输入框和按钮触控目标已统一满足 44px 基础要求。
- 条码预览、Bulk 预览、Excel 预览和 Label 预览已限制横向溢出。
- Bulk 和 Excel 移动端继续使用卡片式预览布局，375px 下无横向滚动。
- SEO 内容使用 `content-visibility` 延后渲染，降低首屏渲染成本。
- Nuxt 静态输出启用 inline styles 和 client payload extraction，减少首屏阻塞请求。

已验证：

- `pnpm typecheck` 通过。
- `pnpm generate` 通过。
- 375px 宽度下检查 `/`、`/bulk-barcode-generator`、`/barcode-generator-for-excel`、`/barcode-label-generator`，页面 `scrollWidth` 等于视口宽度，无横向滚动。
- 375px 宽度下首页、Bulk、Excel、Label 主要可见输入框和按钮高度均不低于 44px。
- Chrome performance trace：移动端 Fast 4G + 4x CPU 下首页 LCP 268ms，CLS 0.00。
- Lighthouse mobile performance：gzip 静态输出下 Performance 99，LCP 1.8s，CLS 0。

---

## Task 10 - 埋点与上线准备

### 目标

加入基础埋点并准备上线。

### 埋点事件

```text
barcode_generate
barcode_type_change
barcode_validation_error
download_png
download_svg
export_pdf
bulk_paste
bulk_generate
excel_paste_detected
label_template_select
related_tool_click
```

### 上线检查

- Cloudflare Pages 部署成功
- 自定义域名 HTTPS 正常
- GSC 可添加
- sitemap 可提交
- 页面可被抓取
- 无严重 console error

### 验收标准

- 事件触发逻辑存在
- 不阻塞工具使用
- 生产构建成功
- 部署说明清晰
