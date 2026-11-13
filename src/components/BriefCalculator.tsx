import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, MessageCircle, Send } from 'lucide-react'
import { useLang } from '../i18n'
import { services } from '../data/services'
import { makeCode, sendForm } from '../lib/submit'
type S = { svc: string[]; scale: number; deadline: number; budget: number; name: string; phone: string; email: string; msg: string }
const init: S = { svc: [], scale: 1, deadline: 1, budget: 1, name: '', phone: '', email: '', msg: '' }
const load = (): S => { try { return { ...init, ...JSON.parse(localStorage.getItem('clb_brief_draft') || '{}') } } catch { return init } }
export default function BriefCalculator() {
  const { t } = useLang()
  const [sp] = useSearchParams()
  const pkg = sp.get('pkg'), ref = sp.get('ref')
  const [s, setS] = useState<S>(load)
  const [step, setStep] = useState(0)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState('')
  useEffect(() => { try { localStorage.setItem('clb_brief_draft', JSON.stringify(s)) } catch {} }, [s])
  useEffect(() => { if (pkg) setS((p) => ({ ...p, svc: p.svc.length ? p.svc : pkg === 'start' ? ['web'] : pkg === 'pro' ? ['web', 'brand', 'it'] : ['web', 'brand', 'media', 'content'] })) }, [pkg])
  const set = <K extends keyof S>(k: K, v: S[K]) => setS((p) => ({ ...p, [k]: v }))
  const toggle = (id: string) => set('svc', s.svc.includes(id) ? s.svc.filter((x) => x !== id) : [...s.svc, id])
  const opt = (k: string, i: number) => (t(`brief.${k}`) as string[])[i]
  const summary = (code: string) => [
    `CodeLab ${code}`, pkg && `${t('brief.pkg')}: ${t(`packages.${pkg}.name`)}`, ref && `Ref: ${ref}`,
    `${t('brief.servicesQ')} ${s.svc.map((i) => t(`services.${i}.title`)).join(', ')}`,
    `${t('brief.scale')}: ${opt('scaleOpts', s.scale)}`, `${t('brief.deadline')}: ${opt('deadlineOpts', s.deadline)}`, `${t('brief.budget')}: ${opt('budgetOpts', s.budget)}`,
    `${t('brief.name')}: ${s.name}`, `${t('brief.phone')}: ${s.phone}`, `${t('brief.email')}: ${s.email}`, s.msg && `${t('brief.msg')}: ${s.msg}`,
  ].filter(Boolean).join('\n')
  const valid = () => (!s.name.trim() || !(s.phone.trim() || s.email.trim()) ? t('brief.req') : '')
  const next = () => { if (step === 0 && !s.svc.length) return setErr(t('brief.pick')); setErr(''); setStep(step + 1) }
  const submit = async () => {
    const v = valid(); if (v) return setErr(v)
    setBusy(true); setErr(''); const code = makeCode()
    try {
      await sendForm({ subject: `New brief ${code}`, code, name: s.name, email: s.email, phone: s.phone, message: summary(code) })
      setDone(code); try { localStorage.removeItem('clb_brief_draft') } catch {}
    } catch { setErr(t('brief.err')) } finally { setBusy(false) }
  }
  const wa = () => { const v = valid(); if (v) return setErr(v); window.open(`https://wa.me/995571025027?text=${encodeURIComponent(summary(makeCode()))}`, '_blank', 'noopener') }
  if (done) return (
    <div className="glass mx-auto max-w-xl p-10 text-center"><CheckCircle2 className="mx-auto text-[var(--clb-accent-cyan)]" size={48} />
      <h2 className="mt-4 text-2xl font-bold">{t('brief.okTitle')}</h2><p className="mt-2">{t('brief.okText')}</p><p className="mt-3 font-mono text-2xl font-semibold grad-text">{done}</p></div>)
  const chip = (on: boolean) => `rounded-xl border px-4 py-2.5 text-sm font-medium transition ${on ? 'border-[var(--clb-accent-cyan)] bg-[var(--clb-accent-cyan)]/10 text-white' : 'border-white/12 hover:border-white/30'}`
  const Pick = ({ k, o, cur }: { k: 'scale' | 'deadline' | 'budget'; o: string; cur: number }) => (
    <div className="mb-6"><p className="mb-2 text-sm font-semibold text-white">{t(`brief.${k}`)}</p>
      <div className="flex flex-wrap gap-2">{(t(`brief.${o}`) as string[]).map((l, i) => <button key={l} type="button" className={chip(cur === i)} onClick={() => set(k, i)}>{l}</button>)}</div></div>)
  return (
    <div className="glass mx-auto max-w-3xl p-6 sm:p-8">
      <ol className="mb-8 flex gap-2">{(t('brief.steps') as string[]).map((l, i) => (
        <li key={l} className="flex-1"><div className="h-1 rounded" style={{ background: i <= step ? 'var(--clb-grad)' : 'rgba(255,255,255,.12)' }} /><span className={`mt-2 block text-xs ${i === step ? 'text-white' : 'text-[var(--clb-text-3)]'}`}>{l}</span></li>))}</ol>
      {pkg && <p className="mb-4 rounded-lg bg-white/5 px-3 py-2 text-sm">{t('brief.pkg')}: <b className="text-white">{t(`packages.${pkg}.name`)}</b></p>}
      {step === 0 && (<div><p className="mb-3 font-semibold text-white">{t('brief.servicesQ')}</p>
        <div className="grid gap-3 sm:grid-cols-2">{services.map(({ id, icon: I }) => (
          <button key={id} type="button" aria-pressed={s.svc.includes(id)} onClick={() => toggle(id)} className={`flex items-center gap-3 text-left ${chip(s.svc.includes(id))} !p-4`}><I size={22} />{t(`services.${id}.title`)}</button>))}</div></div>)}
      {step === 1 && (<div><Pick k="scale" o="scaleOpts" cur={s.scale} /><Pick k="deadline" o="deadlineOpts" cur={s.deadline} /><Pick k="budget" o="budgetOpts" cur={s.budget} /></div>)}
      {step === 2 && (<div className="grid gap-4">
        <input className="input" placeholder={t('brief.name')} value={s.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
        <div className="grid gap-4 sm:grid-cols-2"><input className="input" type="tel" placeholder={t('brief.phone')} value={s.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" />
          <input className="input" type="email" placeholder={t('brief.email')} value={s.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" /></div>
        <textarea className="input min-h-28" placeholder={t('brief.msg')} value={s.msg} onChange={(e) => set('msg', e.target.value)} /></div>)}
      {err && <p role="alert" className="mt-4 text-sm text-red-400">{err}</p>}
      <div className="mt-8 flex flex-wrap justify-between gap-3">
        {step > 0 ? <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>{t('brief.back')}</button> : <span />}
        {step < 2 ? <button className="btn btn-primary" onClick={next}>{t('brief.next')}</button> : (
          <div className="flex flex-wrap gap-3"><button className="btn btn-ghost" onClick={wa}><MessageCircle size={18} />{t('brief.wa')}</button>
            <button className="btn btn-primary" disabled={busy} onClick={submit}><Send size={18} />{busy ? t('brief.sending') : t('brief.send')}</button></div>)}
      </div>
    </div>
  )
}
