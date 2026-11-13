import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { LangCtx, LANGS, Lang } from '../i18n'
import Navbar from './Navbar'
import Footer from './Footer'
export default function Layout() {
  const { lang } = useParams()
  const { pathname } = useLocation()
  const ok = LANGS.includes(lang as Lang)
  useEffect(() => {
    if (!ok) return
    document.documentElement.lang = lang!
    try { localStorage.setItem('clb_language', lang!) } catch {}
  }, [lang, ok])
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  if (!ok) return <Navigate to="/ka" replace />
  return (
    <LangCtx.Provider value={lang as Lang}>
      <Navbar /><main><Outlet /></main><Footer />
    </LangCtx.Provider>
  )
}
