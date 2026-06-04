import { useRoute } from '#app'

export type AnalyticsEventName =
  | 'barcode_generate'
  | 'barcode_type_change'
  | 'barcode_validation_error'
  | 'download_png'
  | 'download_svg'
  | 'export_pdf'
  | 'download_csv_template'
  | 'bulk_parse'
  | 'label_pdf_export'
  | 'bulk_paste'
  | 'bulk_generate'
  | 'excel_paste_detected'
  | 'label_template_select'
  | 'related_tool_click'

export type AnalyticsPayload = Record<string, boolean | number | string | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (command: 'event', eventName: string, payload?: AnalyticsPayload) => void
    plausible?: (eventName: string, options?: { props?: AnalyticsPayload }) => void
  }
}

export function useAnalytics() {
  const route = useRoute()

  function track(eventName: AnalyticsEventName, payload: AnalyticsPayload = {}): void {
    if (!import.meta.client) {
      return
    }

    const eventPayload = sanitizePayload({
      page_path: route.path,
      ...payload
    })

    try {
      window.dataLayer?.push({
        event: eventName,
        ...eventPayload
      })
      window.gtag?.('event', eventName, eventPayload)
      window.plausible?.(eventName, { props: eventPayload })
      window.dispatchEvent(new CustomEvent('barcode:analytics', {
        detail: {
          event: eventName,
          payload: eventPayload
        }
      }))
    } catch {
      // Analytics must never block barcode generation or downloads.
    }
  }

  return {
    track
  }
}

function sanitizePayload(payload: AnalyticsPayload): AnalyticsPayload {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== '')
  )
}
