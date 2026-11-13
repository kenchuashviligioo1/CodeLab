import { Link } from 'react-router-dom'
import { LucideIcon, ArrowRight } from 'lucide-react'
import { useLang } from '../i18n'
export default function ServiceCard({ id, icon: Icon }: { id: string; icon: LucideIcon }) {
  const { t, to } = useLang()
  return (
    <article className="glass hover-glow flex flex-col p-6">
      <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl text-[#0F111A]" style={{ background: 'var(--clb-grad)' }}><Icon size={24} /></span>
      <h3 className="text-lg font-semibold">{t(`services.${id}.title`)}</h3>
      <p className="mt-2 flex-1 text-sm text-[var(--clb-text-2)]">{t(`services.${id}.desc`)}</p>
      <Link to={to(`/services#${id}`)} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--clb-accent-cyan)]">{t('common.more')} <ArrowRight size={16} /></Link>
    </article>
  )
}
