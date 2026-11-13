import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../i18n'
const BASE = 'https://codelab.ge'
function setMeta(sel: string, attr: string, key: string, val: string) {
  let el = document.head.querySelector<HTMLMetaElement>(sel)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.content = val
}
export default function SEO({ page }: { page: string }) {
  const { lang, t } = useLang()
  const { pathname } = useLocation()
  useEffect(() => {
    const title = t(`seo.${page}.title`), desc = t(`seo.${page}.desc`)
    const rest = pathname.replace(/^\/(ka|en)/, '')
    document.title = title
    setMeta('meta[name="description"]', 'name', 'description', desc)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    setMeta('meta[property="og:url"]', 'property', 'og:url', `${BASE}/${lang}${rest}`)
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', lang === 'ka' ? 'ka_GE' : 'en_US')
    document.head.querySelectorAll('link[data-clb]').forEach((n) => n.remove())
    ;(['ka', 'en'] as const).forEach((l) => {
      const link = document.createElement('link')
      link.rel = 'alternate'; link.hreflang = l; link.href = `${BASE}/${l}${rest}`; link.dataset.clb = '1'
      document.head.appendChild(link)
    })
    const c = document.createElement('link')
    c.rel = 'canonical'; c.href = `${BASE}/${lang}${rest}`; c.dataset.clb = '1'; document.head.appendChild(c)
  }, [lang, page, pathname])
  return null
}
