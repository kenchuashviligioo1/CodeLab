import { ReactNode } from 'react'
export default function Section({ title, sub, children, className = '' }: { title?: string; sub?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-7xl px-4 pt-20 sm:px-6 ${className}`}>
      {title && <div className="mb-10 max-w-2xl"><h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>{sub && <p className="mt-3 text-[var(--clb-text-2)]">{sub}</p>}</div>}
      {children}
    </section>
  )
}
