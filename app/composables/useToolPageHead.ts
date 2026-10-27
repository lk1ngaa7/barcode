import { absoluteUrl, buildToolPageSchema, type ToolPageContent } from '../../utils/seoPages'

export function useToolPageHead(page: ToolPageContent): void {
  const siteUrl = useRuntimeConfig().public.siteUrl
  const canonical = absoluteUrl(page.path, siteUrl)
  const schemas = buildToolPageSchema(page, siteUrl)
  // 全站统一社交分享图（1200x630 品牌卡）
  const ogImage = `${siteUrl}/og-image.png`

  useHead({
    title: page.title,
    meta: [
      { name: 'description', content: page.description },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: ogImage }
    ],
    link: [
      { rel: 'canonical', href: canonical }
    ],
    script: schemas.map((schema) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema)
    }))
  })
}
