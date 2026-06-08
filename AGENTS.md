# AGENTS.md

## 项目说明

本项目是一个面向欧美用户的在线 Barcode 工具站，使用 Nuxt 开发，部署到 Cloudflare Pages。

项目目标是构建一个快速、现代、SEO 友好、无需登录的条码生成工具站。

核心用户：

- 欧美小商家
- Etsy / Shopify / Amazon / eBay 卖家
- 库存管理人员
- 仓库工作人员
- 零售店主
- 办公资产管理人员

核心价值：

> 用户可以快速生成单个或批量 barcode，并导出 PNG、SVG 或可打印 PDF 标签。

---

## 技术栈

必须使用：

- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS
- pnpm
- Cloudflare Pages
- 静态生成优先
- 前端本地生成 barcode

优先策略：

- SEO 页面使用静态生成
- 条码生成在浏览器端完成
- 不上传用户输入
- 不依赖服务端数据库
- 不做登录系统

---

## 部署要求

目标平台：

- Cloudflare Pages

MVP 部署方式：

```bash
pnpm generate
```

输出目录：

```bash
dist
```

Cloudflare Pages 配置建议：

```text
Build command: pnpm generate
Build output directory: dist
Node.js version: 20+
```

部署执行原则：

- 本项目的 wrangler CLI 已经登录 Cloudflare，具备 Pages 写权限。
- 每次完成代码或内容修改并通过本地验证后，必须自动部署到 Cloudflare Pages。
- 部署前必须运行 `pnpm generate`，部署目录必须使用 `dist`。
- 优先使用 `pnpm wrangler pages deploy dist --project-name <pages-project-name>` 部署。
- 如果仓库中没有明确记录 Pages project name，先用 `pnpm wrangler pages project list` 查询，不要猜测。
- 部署完成后必须访问正式域名 `https://www.barcode-mint.com` 验证线上内容已经更新。

MVP 阶段不需要 Cloudflare Workers、D1、KV、R2。

后续如果需要 API、支付、用户系统，再考虑 Cloudflare Workers / Pages Functions。

---

## 项目原则

开发时必须遵守以下原则：

1. 工具必须在页面首屏可见。
2. 不要把 SEO 内容放在工具前面。
3. 用户不需要注册即可使用。
4. 条码数据必须默认在浏览器本地处理。
5. 不要上传用户输入的 barcode value。
6. 页面必须移动端可用。
7. 每个 SEO 页面必须有唯一 title、meta description、H1、canonical。
8. 每个工具页必须有 FAQ Schema、SoftwareApplication Schema、BreadcrumbList Schema。
9. 所有输入框必须有 label。
10. 所有错误提示必须清晰说明原因和解决方式。
11. 下载按钮必须在输入合法时可用，输入非法时禁用。
12. 保持代码模块化，避免把所有逻辑塞进一个组件。
13. 不要引入重型 UI 框架。
14. 不要做登录、支付、数据库、后台 CMS。
15. 不要把 MVP 做成重型 SaaS。
16. 如果项目发生 UI 相关变化，必须在本地截图验证的同时，并行使用 `zai-mcp-server` 发起图片 UI/UX 审计检查；多个截图需要一次性并行批量分析。

---

## 必读文档

开始任何开发任务前，必须先读取：

- `docs/prd-mvp.md`
- `docs/task-list.md`
- `docs/acceptance.md`
- `docs/ui-ux-guidelines.md`

---

## MVP 页面

必须创建以下页面：

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

## MVP 功能范围

必须实现：

- Code 128 条码生成
- UPC-A 条码生成
- EAN-13 条码生成
- UPC-A check digit 计算和校验
- EAN-13 check digit 计算和校验
- Code 128 输入校验
- 实时预览
- PNG 下载
- SVG 下载
- 基础 PDF 导出
- 批量粘贴生成
- Excel / Google Sheets 粘贴解析
- 基础标签模板
- 基础可打印 PDF
- FAQ 区块
- Related Tools 内链
- sitemap.xml
- robots.txt
- canonical URL
- 移动端适配

---

## MVP 不做

不要实现以下内容：

- 用户注册
- 登录
- 支付
- Stripe
- 订阅
- 用户数据库
- 云端保存
- API
- Shopify 插件
- 库存管理系统
- 上传 xlsx 文件
- 条码扫描
- OCR
- 多语言
- 后台管理系统
- 批量 ZIP 下载
- 高级 Avery 模板

---

## 条码规则

### Code 128

用于：

- SKU
- 库存编号
- 内部编码
- 字母数字混合编码

规则：

- 支持字母、数字、常见符号
- 长度限制 1-80 字符
- 默认推荐给自定义 SKU 用户

示例：

```text
SKU-001
ITEM-2026-A
BOX_1001
```

### UPC-A

用于：

- 美国零售商品条码

规则：

- 标准 UPC-A 为 12 位数字
- 用户输入 11 位数字时，系统自动计算第 12 位 check digit
- 用户输入 12 位数字时，系统校验 check digit
- 不允许字母或符号

错误提示示例：

```text
UPC-A only supports 12 numeric digits. Use Code 128 for custom SKU values like “SKU-001”.
```

### EAN-13

用于：

- 国际商品条码

规则：

- 标准 EAN-13 为 13 位数字
- 用户输入 12 位数字时，系统自动计算第 13 位 check digit
- 用户输入 13 位数字时，系统校验 check digit
- 不允许字母或符号

错误提示示例：

```text
EAN-13 requires 13 numeric digits, or 12 digits if you want us to calculate the check digit.
```

---

## UI/UX 规则

必须遵守：

- 页面风格干净、现代、工具优先。
- 首屏必须出现工具。
- 工具区优先于 SEO 内容。
- 不使用大面积插图占首屏。
- 不使用弹窗广告。
- 不在输入框和下载按钮之间插广告。
- 下载按钮清晰可见。
- 错误提示必须靠近输入框。
- 移动端单列布局。
- 输入框和按钮移动端高度至少 44px。
- 条码预览不能横向溢出。
- Bulk 表格在移动端要转成卡片或可读布局。
- 每次修改 UI、布局、样式、组件视觉状态或响应式行为后，必须提供桌面端和移动端截图，并并行调用 `zai-mcp-server` 对截图进行 UI/UX 审计。

### 截图验证固定流程

本项目发生 UI、布局、样式、组件视觉状态、响应式行为、导航、SEO 内链模块或工具首屏展示变化时，必须优先使用个人 skill：

```text
$visual-qa-screenshots
```

固定脚本：

```bash
node ~/.codex/skills/visual-qa-screenshots/scripts/capture_web_screenshots.mjs
```

执行原则：

- 不要重新探索截图工具链。
- 不要反复尝试 `pnpm dlx`、`npx`、Playwright/Puppeteer 临时安装变体。
- 不要使用全盘 `find /Users/...` 查找浏览器或 node_modules。
- 静态站优先先运行 `pnpm generate`，再对 `dist` 截图。
- 如已有本地 dev server，则用脚本的 `baseUrl` 配置。
- 每次至少覆盖桌面端和移动端视口。
- 截图时必须同时做机器断言：关键文案存在、每页 H1 数量正确、无横向溢出、关键 selector 存在。
- 变更模块不在首屏时，必须使用 selector 截取模块局部截图。
- 多张截图需要一次性并行调用 `zai-mcp-server` 进行 UI/UX 审计。
- 生产验证使用简短布尔检查，不要输出整页 HTML。

推荐配置示例：

```bash
node ~/.codex/skills/visual-qa-screenshots/scripts/capture_web_screenshots.mjs --config-json '{
  "siteDir": "dist",
  "outDir": "reports/visual-qa",
  "pages": [
    {
      "name": "home",
      "path": "/",
      "must": ["Free Barcode Generator", "Download PNG"]
    }
  ],
  "viewports": [
    { "name": "desktop", "width": 1440, "height": 1100 },
    { "name": "mobile", "width": 390, "height": 1200 }
  ]
}'
```

视觉建议：

- 主色：蓝色或靛蓝色
- 背景：浅灰或白色
- 卡片：白底、轻边框、轻阴影
- 字体：system-ui / Inter
- 风格：clean、fast、business-friendly、print-ready

---

## 推荐目录结构

```text
barcode-tool/
  app.vue
  nuxt.config.ts
  package.json
  tailwind.config.ts

  pages/
    index.vue
    code-128-barcode-generator.vue
    upc-a-barcode-generator.vue
    ean-13-barcode-generator.vue
    bulk-barcode-generator.vue
    barcode-label-generator.vue
    barcode-generator-for-excel.vue
    printable-barcode-generator.vue
    privacy.vue
    terms.vue

  components/
    tool/
      BarcodeGenerator.vue
      BarcodePreview.vue
      BarcodeTypeSelector.vue
      BarcodeInput.vue
      BarcodeValidationMessage.vue
      BarcodeDownloadActions.vue
      BulkBarcodeInput.vue
      BulkBarcodeTable.vue
      LabelDesigner.vue
      PdfExportPanel.vue

    seo/
      FaqBlock.vue
      RelatedTools.vue
      Breadcrumbs.vue

    layout/
      SiteHeader.vue
      SiteFooter.vue

  composables/
    useBarcodeGenerator.ts
    useBarcodeValidation.ts
    useBarcodeExport.ts
    useBulkBarcode.ts
    useSeoSchema.ts

  utils/
    barcodeTypes.ts
    validateBarcode.ts
    checkDigit.ts
    exportSvg.ts
    exportPng.ts
    exportPdf.ts
    parseSpreadsheetPaste.ts

  public/
    robots.txt
    favicon.ico

  docs/
    prd-mvp.md
    task-list.md
    acceptance.md
```

---

## 常用命令

安装依赖：

```bash
pnpm install
```

本地开发：

```bash
pnpm dev
```

静态生成：

```bash
pnpm generate
```

类型检查：

```bash
pnpm typecheck
```

Lint：

```bash
pnpm lint
```

如果项目暂时没有 typecheck 或 lint 脚本，不要强行发明复杂配置；可以在任务中补充基础脚本。

---

## 每次任务完成前必须做

Codex 每完成一个任务，都必须：

1. 说明完成了什么。
2. 列出修改了哪些文件。
3. 说明是否有未完成项。
4. 运行可用的检查命令。
5. 至少运行：

```bash
pnpm generate
```

6. 如果存在类型检查脚本，也运行：

```bash
pnpm typecheck
```

7. 验证通过后，使用清晰的 commit message 提交本次任务相关改动。
8. 提交后 push 到当前分支对应的远端分支，除非用户明确要求不 push 或远端不可用。
9. push 后必须使用 wrangler CLI 自动部署到 Cloudflare Pages，并验证生产站已更新。
10. 不要擅自扩大任务范围。
11. 不要在一个任务里实现多个阶段的功能。
