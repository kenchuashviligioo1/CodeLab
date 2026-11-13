import { FormEvent, useState } from 'react'
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Music2 } from 'lucide-react'
import { useLang } from '../i18n'
import { faqIds } from '../data/faq'
import { sendForm } from '../lib/submit'
import SEO from '../components/SEO'
import Section from '../components/Section'
import Accordion from '../components/Accordion'
const socials = [[Linkedin, 'https://linkedin.com/company/codelab-ge', 'LinkedIn'], [Instagram, 'https://instagram.com/codelab.ge', 'Instagram'], [Music2, 'https://tiktok.com/@codelab.ge', 'TikTok'], [Facebook, 'https://facebook.com/codelab.ge', 'Facebook']] as const
export default function Contact() {
  const { t } = useLang()
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [st, setSt] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle')
  const submit = async (e: FormEvent) => {
    e.preventDefault(); setSt('busy')
    try { await sendForm({ subject: 'CodeLab contact form', ...f }); setSt('ok'); setF({ name: '', email: '', message: '' }) } catch { setSt('err') }
  }
  const cards = [[Mail, 'info@codelab.ge', 'mailto:info@codelab.ge'], [Phone, '+995 571 025 027', 'tel:+995571025027'], [MapPin, t('common.address'), '']] as const
  return (
    <>
      <SEO page="contact" />
      <Section title={t('contact.title')} sub={t('contact.sub')}>
        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={submit} className="glass grid gap-4 p-6 sm:p-8">
            <input className="input" required placeholder={t('brief.name')} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            <input className="input" required type="email" placeholder={t('brief.email')} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            <textarea className="input min-h-36" required placeholder={t('brief.msg')} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
            <button className="btn btn-primary" disabled={st === 'busy'}>{st === 'busy' ? t('brief.sending') : t('contact.send')}</button>
            {st === 'ok' && <p role="status" className="text-sm text-emerald-400">{t('contact.ok')}</p>}
            {st === 'err' && <p role="alert" className="text-sm text-red-400">{t('brief.err')}</p>}
          </form>
          <div className="space-y-4">
            {cards.map(([I, label, href]) => { const c = <><I className="text-[var(--clb-accent-cyan)]" size={22} /><span className="font-medium text-white">{label}</span></>; return href ? <a key={label} href={href} className="glass hover-glow flex items-center gap-4 p-5">{c}</a> : <div key={label} className="glass flex items-center gap-4 p-5">{c}</div> })}
            <div className="glass p-5"><p className="mb-3 text-sm font-semibold text-white">{t('contact.social')}</p>
              <div className="flex gap-3">{socials.map(([I, href, n]) => <a key={n} href={href} target="_blank" rel="noopener noreferrer" aria-label={n} className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white transition hover:border-[var(--clb-accent-cyan)]"><I size={20} /></a>)}</div></div>
          </div>
        </div>
      </Section>
      <Section title={t('contact.faqTitle')}>
        <div className="max-w-3xl"><Accordion items={faqIds.map((i) => ({ q: t(`faq.${i}.q`), a: t(`faq.${i}.a`) }))} /></div>
      </Section>
    </>
  )
}
