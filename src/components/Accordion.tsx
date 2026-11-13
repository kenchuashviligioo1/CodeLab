import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="glass overflow-hidden">
          <button className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-white" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {it.q}<ChevronDown className={`shrink-0 transition ${open === i ? 'rotate-180' : ''}`} size={20} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && <motion.p initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden px-5 text-sm leading-relaxed text-[var(--clb-text-2)]"><span className="block pb-5">{it.a}</span></motion.p>}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
