import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Code2, Palette, Camera } from 'lucide-react'
import { useLang } from '../i18n'
import { usePortfolio, Cat } from '../data/portfolio'
import SEO from '../components/SEO'
import Section from '../components/Section'
import PortfolioModal from '../components/PortfolioModal'
const icon = { web: Code2, brand: Palette, media: Camera }
export default function Portfolio() {
  const { t, lang } = useLang()
  const { items } = usePortfolio()
  const [f, setF] = useState<'all' | Cat>('all')
  const [open, setOpen] = useState<string | null>(null)
  const list = items.filter((p) => f === 'all' || p.cat === f)
  const current = items.find((p) => p.id === open)
  return (
    <>
      <SEO page="portfolio" />
      <Section title={t('portfolio.title')} sub={t('portfolio.sub')}>
        <div className="mb-8 flex flex-wrap gap-2">
          {(['all', 'web', 'brand', 'media'] as const).map((k) => (
            <button key={k} onClick={() => setF(k)} aria-pressed={f === k} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${f === k ? 'border-transparent text-[#0F111A]' : 'border-white/15 hover:border-white/40'}`} style={f === k ? { background: 'var(--clb-grad)' } : undefined}>{t(`portfolio.filters.${k}`)}</button>))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => { const I = icon[p.cat]; return (
            <button key={p.id} onClick={() => setOpen(p.id)} className="glass hover-glow overflow-hidden text-left">
              {p.image
                ? <img src={p.image} alt={p.title[lang]} loading="lazy" className="h-44 w-full object-cover" />
                : <div className="grid h-44 place-items-center" style={{ background: 'linear-gradient(135deg,#00E5FF33,#3B82F633,#8B5CF633)' }}><I size={44} className="text-white/80" /></div>}
              <div className="p-5"><h3 className="font-semibold">{p.title[lang]}</h3>
                <div className="mt-3 flex flex-wrap gap-2">{p.tags.map((g) => <span key={g} className="rounded border border-white/10 px-2 py-0.5 font-mono text-xs text-[var(--clb-text-3)]">{g}</span>)}</div></div>
            </button>) })}
        </div>
      </Section>
      <AnimatePresence>{current && <PortfolioModal item={current} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  )
}
