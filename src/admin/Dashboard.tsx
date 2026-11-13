import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, LogOut, ExternalLink } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { fetchPortfolio, clearPortfolioCache, Item } from '../data/portfolio'
import Editor from './Editor'

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Item | 'new' | null>(null)
  const [err, setErr] = useState('')
  const load = async () => {
    try { setItems(await fetchPortfolio()); setErr('') } catch (e: any) { setErr(e.message) }
    setLoading(false)
  }
  useEffect(() => { load() }, [])
  const remove = async (p: Item) => {
    if (!confirm(`წაიშალოს „${p.title.ka || p.title.en}“?`)) return
    const { error } = await supabase!.from('portfolio_items').delete().eq('id', p.id)
    if (error) return alert(error.message)
    if (p.image) { const name = p.image.split('/portfolio/')[1]; if (name) await supabase!.storage.from('portfolio').remove([name]) }
    clearPortfolioCache(); load()
  }
  if (editing) return <Editor item={editing === 'new' ? null : editing} onDone={(changed) => { setEditing(null); if (changed) { clearPortfolioCache(); load() } }} />
  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">პორტფოლიოს მართვა</h1>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={() => setEditing('new')}><Plus size={18} /> ახალი პროექტი</button>
          <button className="btn btn-ghost" onClick={() => supabase!.auth.signOut()}><LogOut size={18} /> გასვლა</button>
        </div>
      </div>
      {err && <p className="mb-4 text-red-400">{err}</p>}
      {loading ? <p>…</p> : items.length === 0 ? <p>პროექტები ჯერ არ არის.</p> : (
        <div className="space-y-3">
          {items.map((p) => (
            <div key={p.id} className="glass flex items-center gap-4 p-3 sm:p-4">
              {p.image ? <img src={p.image} alt="" className="h-16 w-24 rounded-lg object-cover" /> : <div className="h-16 w-24 rounded-lg" style={{ background: 'linear-gradient(135deg,#00E5FF33,#3B82F633,#8B5CF633)' }} />}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{p.title.ka || p.title.en}</p>
                <p className="truncate text-sm text-[var(--clb-text-3)]">{p.title.en} · {p.cat} · {p.year}</p>
              </div>
              {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 hover:bg-white/10" aria-label="საიტი"><ExternalLink size={18} /></a>}
              <button onClick={() => setEditing(p)} className="rounded-lg p-2 hover:bg-white/10" aria-label="რედაქტირება"><Pencil size={18} /></button>
              <button onClick={() => remove(p)} className="rounded-lg p-2 text-red-400 hover:bg-white/10" aria-label="წაშლა"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
