import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ka from '../locales/ka.json'
import en from '../locales/en.json'
import { Lang } from '../i18n'

export type Cat = 'web' | 'brand' | 'media'

export type Item = {
  id: string
  cat: Cat
  tags: string[]
  year: number
  image: string | null
  link: string | null
  title: Record<Lang, string>
  goal: Record<Lang, string>
  work: Record<Lang, string[]>
}

// Supabase-ის გარეშე (ლოკალური dev) გამოიყენება ეს ნიმუშები
const sample: { id: string; cat: Cat; tags: string[]; year: number }[] = [
  { id: 'p1', cat: 'web', tags: ['React', 'Vite', 'Tailwind', 'SEO'], year: 2026 },
  { id: 'p2', cat: 'web', tags: ['E-commerce', 'TypeScript', 'Payments'], year: 2025 },
  { id: 'p3', cat: 'brand', tags: ['Logo', 'Brandbook', 'Packaging'], year: 2026 },
  { id: 'p4', cat: 'media', tags: ['Video', 'Drone', 'Color grading'], year: 2025 },
  { id: 'p5', cat: 'web', tags: ['React', 'Dashboard', 'API'], year: 2026 },
  { id: 'p6', cat: 'brand', tags: ['Brandbook', 'Photo', 'Social'], year: 2025 },
]
const L: any = { ka, en }
export const fallback: Item[] = sample.map((p) => {
  const g = (l: Lang) => L[l].portfolio.items[p.id]
  return {
    ...p, image: null, link: null,
    title: { ka: g('ka').title, en: g('en').title },
    goal: { ka: g('ka').goal, en: g('en').goal },
    work: { ka: g('ka').work, en: g('en').work },
  }
})

export const fromRow = (r: any): Item => ({
  id: r.id, cat: r.cat, tags: r.tags ?? [], year: r.year,
  image: r.image_url, link: r.link_url,
  title: { ka: r.title_ka, en: r.title_en },
  goal: { ka: r.goal_ka, en: r.goal_en },
  work: { ka: r.work_ka ?? [], en: r.work_en ?? [] },
})

export async function fetchPortfolio(): Promise<Item[]> {
  if (!supabase) return fallback
  const { data, error } = await supabase.from('portfolio_items').select('*')
    .order('sort_order', { ascending: false }).order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(fromRow)
}

let cache: Item[] | null = null
export const clearPortfolioCache = () => { cache = null }

export function usePortfolio() {
  const [items, setItems] = useState<Item[]>(cache ?? [])
  const [loading, setLoading] = useState(!cache)
  useEffect(() => {
    let alive = true
    fetchPortfolio().then((d) => { cache = d; if (alive) { setItems(d); setLoading(false) } })
      .catch(() => { if (alive) { setItems(cache ?? fallback); setLoading(false) } })
    return () => { alive = false }
  }, [])
  return { items, loading }
}
