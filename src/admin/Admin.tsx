import { useEffect, useState } from 'react'
import { supabase, supabaseEnabled } from '../lib/supabase'
import Login from './Login'
import Dashboard from './Dashboard'

export default function Admin() {
  const [session, setSession] = useState<any>(undefined)
  useEffect(() => {
    document.title = 'Admin — CodeLab'
    let m = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!m) { m = document.createElement('meta'); m.name = 'robots'; document.head.appendChild(m) }
    m.content = 'noindex, nofollow'
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => { sub.subscription.unsubscribe(); m!.remove() }
  }, [])
  if (!supabaseEnabled) return <div className="grid min-h-screen place-items-center p-6 text-center"><p>Supabase არ არის დაკონფიგურებული (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).</p></div>
  if (session === undefined) return <div className="grid min-h-screen place-items-center">…</div>
  return session ? <Dashboard /> : <Login />
}
