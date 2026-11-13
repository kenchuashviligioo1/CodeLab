import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { getSavedLang } from './i18n'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import About from './pages/About'
import Brief from './pages/Brief'
import Contact from './pages/Contact'
const Admin = lazy(() => import('./admin/Admin'))
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${getSavedLang()}`} replace />} />
      <Route path="/admin/*" element={<Suspense fallback={null}><Admin /></Suspense>} />
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="about" element={<About />} />
        <Route path="brief" element={<Brief />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/ka" replace />} />
    </Routes>
  )
}
