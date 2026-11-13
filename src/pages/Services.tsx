import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useLang } from '../i18n'
import { services } from '../data/services'
import { packages } from '../data/packages'
import SEO from '../components/SEO'
import Section from '../components/Section'
export default function Services() {
  const { t, to } = useLang()
  const { hash } = useLocation()
  useEffect(() => { if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80) }, [hash])
  return (
    <>
      <SEO page="services" />
      <Section title={t('nav.services')}>
        <div className="space-y-5">
          {services.map(({ id, icon: I }) => (
            <article key={id} id={id} className="glass hover-glow scroll-mt-24 grid gap-6 p-6 md:grid-cols-[1fr_1.4fr] md:p-8">
              <div><span className="mb-4 grid h-12 w-12 place-items-center rounded-xl text-[#0F111A]" style={{ background: 'var(--clb-grad)' }}><I size={24} /></span>
                <h3 className="text-xl font-bold">{t(`services.${id}.title`)}</h3><p className="mt-2 text-sm">{t(`services.${id}.desc`)}</p></div>
              <ul className="grid gap-2.5 sm:grid-cols-2">{(t(`services.${id}.items`) as string[]).map((it) => (
                <li key={it} className="flex gap-2 text-sm"><Check size={18} className="mt-0.5 shrink-0 text-[var(--clb-accent-cyan)]" />{it}</li>))}</ul>
            </article>))}
        </div>
      </Section>
      <Section title={t('packagesTitle')} sub={t('packagesNote')}>
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((p) => (
            <article key={p.id} className={`glass hover-glow relative flex flex-col p-7 ${p.popular ? '!border-[var(--clb-accent-cyan)]/60' : ''}`}>
              {p.popular && <span className="absolute -top-3 left-6 rounded-full px-3 py-0.5 text-xs font-bold text-[#0F111A]" style={{ background: 'var(--clb-grad)' }}>{t('common.popular')}</span>}
              <h3 className="text-xl font-bold">{t(`packages.${p.id}.name`)}</h3><p className="mt-1 text-sm text-[var(--clb-text-3)]">{t(`packages.${p.id}.desc`)}</p>
              <ul className="my-6 flex-1 space-y-3">{(t(`packages.${p.id}.items`) as string[]).map((it) => <li key={it} className="flex gap-2 text-sm"><Check size={18} className="shrink-0 text-[var(--clb-accent-cyan)]" />{it}</li>)}</ul>
              <Link to={to(`/brief?pkg=${p.id}`)} className={`btn ${p.popular ? 'btn-primary' : 'btn-ghost'}`}>{t('common.choose')}</Link>
            </article>))}
        </div>
      </Section>
    </>
  )
}
