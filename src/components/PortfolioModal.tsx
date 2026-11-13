import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { useLang } from '../i18n'
import { Item } from '../data/portfolio'
export default function PortfolioModal({ item: p, onClose }: { item: Item; onClose: () => void }) {
  const { t, to, lang } = useLang()
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true">
      <motion.div initial={{ y: 24, scale: .97 }} animate={{ y: 0, scale: 1 }} className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto !bg-[#161926] p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold">{p.title[lang]}</h3>
          <button onClick={onClose} aria-label={t('common.close')} className="rounded-lg p-1.5 text-white hover:bg-white/10"><X /></button>
        </div>
        {p.image && <img src={p.image} alt={p.title[lang]} className="mt-6 max-h-80 w-full rounded-xl object-cover" />}
        <h4 className="mt-6 text-sm font-semibold text-[var(--clb-accent-cyan)]">{t('common.goal')}</h4>
        <p className="mt-1">{p.goal[lang]}</p>
        <h4 className="mt-6 text-sm font-semibold text-[var(--clb-accent-cyan)]">{t('common.work')}</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5">{p.work[lang].map((w) => <li key={w}>{w}</li>)}</ul>
        <h4 className="mt-6 text-sm font-semibold text-[var(--clb-accent-cyan)]">{t('common.tech')}</h4>
        <div className="mt-2 flex flex-wrap gap-2">{p.tags.map((g) => <span key={g} className="rounded-md border border-white/15 px-2.5 py-1 font-mono text-xs text-white">{g}</span>)}</div>
        <div className="mt-8 flex flex-wrap gap-3">
          {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{t('common.visit')} <ExternalLink size={16} /></a>}
          <Link to={to(`/brief?ref=${p.id}`)} className="btn btn-primary">{t('common.similar')}</Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
