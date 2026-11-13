import { createContext, useContext } from 'react'
import ka from './locales/ka.json'
import en from './locales/en.json'
export type Lang = 'ka' | 'en'
export const LANGS: Lang[] = ['ka', 'en']
const D: Record<Lang, any> = { ka, en }
export const LangCtx = createContext<Lang>('ka')
export const getSavedLang = (): Lang => {
  try { const v = localStorage.getItem('clb_language'); if (v === 'en' || v === 'ka') return v } catch {}
  return 'ka'
}
export function useLang() {
  const lang = useContext(LangCtx)
  const t = (k: string): any => k.split('.').reduce((o: any, p) => o?.[p], D[lang]) ?? k
  const to = (path = '') => `/${lang}${path}`
  return { lang, t, to }
}
