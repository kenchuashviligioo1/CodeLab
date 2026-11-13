import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Item, Cat } from '../data/portfolio'

async function toWebp(file: File, max = 1600): Promise<Blob> {
  const bmp = await createImageBitmap(file)
  const k = Math.min(1, max / Math.max(bmp.width, bmp.height))
  const c = document.createElement('canvas')
  c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k)
  c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height)
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('image error'))), 'image/webp', 0.85))
}
const lines = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean)
const tagsOf = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean)

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-sm text-[var(--clb-text-3)]">{label}</span>{children}</label>
}

export default function Editor({ item, onDone }: { item: Item | null; onDone: (changed: boolean) => void }) {
  const [cat, setCat] = useState<Cat>(item?.cat ?? 'web')
  const [year, setYear] = useState(item?.year ?? new Date().getFullYear())
  const [tags, setTags] = useState(item?.tags.join(', ') ?? '')
  const [titleKa, setTitleKa] = useState(item?.title.ka ?? ''); const [titleEn, setTitleEn] = useState(item?.title.en ?? '')
  const [goalKa, setGoalKa] = useState(item?.goal.ka ?? ''); const [goalEn, setGoalEn] = useState(item?.goal.en ?? '')
  const [workKa, setWorkKa] = useState(item?.work.ka.join('\n') ?? ''); const [workEn, setWorkEn] = useState(item?.work.en.join('\n') ?? '')
  const [link, setLink] = useState(item?.link ?? '')
  const [image, setImage] = useState<string | null>(item?.image ?? null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(item?.image ?? null)
  const [busy, setBusy] = useState(false); const [err, setErr] = useState('')

  const pick = (f: File | null) => { setFile(f); if (f) setPreview(URL.createObjectURL(f)) }
  const removeImage = () => { setFile(null); setPreview(null); setImage(null) }

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr('')
    try {
      let url = image
      if (file) {
        const blob = await toWebp(file)
        const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`
        const up = await supabase!.storage.from('portfolio').upload(name, blob, { contentType: 'image/webp', cacheControl: '31536000' })
        if (up.error) throw up.error
        url = supabase!.storage.from('portfolio').getPublicUrl(name).data.publicUrl
      }
      let l = link.trim()
      if (l && !/^https?:\/\//i.test(l)) l = 'https://' + l
      const row = {
        cat, year, tags: tagsOf(tags),
        title_ka: titleKa.trim(), title_en: titleEn.trim(),
        goal_ka: goalKa.trim(), goal_en: goalEn.trim(),
        work_ka: lines(workKa), work_en: lines(workEn),
        image_url: url, link_url: l || null,
      }
      const q = item
        ? supabase!.from('portfolio_items').update(row).eq('id', item.id)
        : supabase!.from('portfolio_items').insert({ ...row, sort_order: Math.floor(Date.now() / 1000) })
      const { error } = await q
      if (error) throw error
      // ძველი ფოტოს გასუფთავება, თუ შეიცვალა/წაიშალა
      if (item?.image && item.image !== url) {
        const old = item.image.split('/portfolio/')[1]
        if (old) await supabase!.storage.from('portfolio').remove([old])
      }
      onDone(true)
    } catch (e: any) { setErr(e.message || 'შეცდომა'); setBusy(false) }
  }

  return (
    <form onSubmit={save} className="mx-auto max-w-3xl space-y-5 p-4 sm:p-8">
      <button type="button" className="btn btn-ghost" onClick={() => onDone(false)}><ArrowLeft size={18} /> უკან</button>
      <h1 className="text-2xl font-bold">{item ? 'პროექტის რედაქტირება' : 'ახალი პროექტი'}</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="კატეგორია">
          <select className="input" value={cat} onChange={(e) => setCat(e.target.value as Cat)}>
            <option value="web">Web & IT</option><option value="brand">დიზაინი და ბრენდინგი</option><option value="media">ფოტო / ვიდეო</option>
          </select>
        </Field>
        <Field label="წელი"><input className="input" type="number" min={2000} max={2100} value={year} onChange={(e) => setYear(+e.target.value)} required /></Field>
        <Field label="ტეგები (მძიმით)"><input className="input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, SEO, Tailwind" /></Field>
      </div>

      <Field label="საიტის ლინკი">
        <input className="input" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://example.com" />
      </Field>

      <div className="glass space-y-3 p-4">
        <span className="text-sm text-[var(--clb-text-3)]">ფოტო</span>
        {preview && <img src={preview} alt="" className="max-h-56 rounded-xl object-cover" />}
        <div className="flex flex-wrap gap-2">
          <input type="file" accept="image/*" onChange={(e) => pick(e.target.files?.[0] ?? null)} className="text-sm" />
          {preview && <button type="button" className="btn btn-ghost !py-1.5" onClick={removeImage}>ფოტოს წაშლა</button>}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="glass space-y-4 p-4">
          <h2 className="font-semibold text-white">🇬🇪 ქართული</h2>
          <Field label="სათაური"><input className="input" value={titleKa} onChange={(e) => setTitleKa(e.target.value)} required /></Field>
          <Field label="მიზანი"><textarea className="input" rows={3} value={goalKa} onChange={(e) => setGoalKa(e.target.value)} /></Field>
          <Field label="შესრულებული სამუშაო (თითო ხაზზე ერთი)"><textarea className="input" rows={4} value={workKa} onChange={(e) => setWorkKa(e.target.value)} /></Field>
        </div>
        <div className="glass space-y-4 p-4">
          <h2 className="font-semibold text-white">🇬🇧 English</h2>
          <Field label="Title"><input className="input" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required /></Field>
          <Field label="Goal"><textarea className="input" rows={3} value={goalEn} onChange={(e) => setGoalEn(e.target.value)} /></Field>
          <Field label="Scope of work (one per line)"><textarea className="input" rows={4} value={workEn} onChange={(e) => setWorkEn(e.target.value)} /></Field>
        </div>
      </div>

      {err && <p className="text-red-400">{err}</p>}
      <button className="btn btn-primary" disabled={busy}>{busy ? 'ინახება…' : 'შენახვა'}</button>
    </form>
  )
}
