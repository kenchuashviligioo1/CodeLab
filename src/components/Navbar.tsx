import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "../i18n";
import LangSwitch from "./LangSwitch";

const links = [
  ["", "home"],
  ["/services", "services"],
  ["/portfolio", "portfolio"],
  ["/about", "about"],
  ["/contact", "contact"],
];

export default function Navbar() {
  const { t, to } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F111A]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to={to()} aria-label="CodeLab" onClick={() => setOpen(false)}>
          <img src="/header-logo.svg" alt="CodeLab" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([p, k]) => (
            <NavLink
              key={k}
              to={to(p)}
              end={p === ""}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium transition ${isActive ? "text-white" : "text-[var(--clb-text-3)] hover:text-white"}`
              }
            >
              {({ isActive }) => (
                <>
                  {t(`nav.${k}`)}
                  {isActive && (
                    <motion.span
                      layoutId="clb-nav"
                      className="absolute inset-x-0 -bottom-1 h-0.5 rounded"
                      style={{ background: "var(--clb-grad)" }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch />
          <Link
            to={to("/brief")}
            className="btn btn-primary !hidden !py-2 lg:!inline-flex"
          >
            {t("nav.start")}
          </Link>
          <button
            className="rounded-lg p-2 text-white lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {links.map(([p, k]) => (
                <NavLink
                  key={k}
                  to={to(p)}
                  end={p === ""}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 font-medium ${isActive ? "bg-white/10 text-white" : "text-[var(--clb-text-2)]"}`
                  }
                >
                  {t(`nav.${k}`)}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
