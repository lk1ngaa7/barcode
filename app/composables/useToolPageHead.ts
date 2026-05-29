import { absoluteUrl, buildToolPageSchema, type ToolPageContent } from '../../utils/seoPages'

export function useToolPageHead(page: ToolPageContent): void {
  const siteUrl = useRuntimeConfig().public.siteUrl
  const canonical = absoluteUrl(page.path, siteUrl)
  const schemas = buildToolPageSchema(page, siteUrl)

  useHead({
    title: page.title,
    meta: [
      { name: 'description', content: page.description },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical }
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
