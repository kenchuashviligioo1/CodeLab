import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLang } from "../i18n";
import LangSwitch from "./LangSwitch";

export default function Footer() {
  const { t, to } = useLang();
  return (
    <footer className="mt-24 border-t border-white/10 bg-[var(--clb-bg-card)]/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-4">
          <Link to={to()} aria-label="CodeLab" className="inline-block">
            <img src="/header-logo.svg" alt="CodeLab" className="h-10 w-auto" />
          </Link>
          <LangSwitch />
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm">
          {[
            ["", "home"],
            ["/services", "services"],
            ["/portfolio", "portfolio"],
            ["/about", "about"],
            ["/brief", "nav.start"],
            ["/contact", "contact"],
          ].map(([p, k]) => (
            <Link
              key={p}
              to={to(p)}
              className="text-[var(--clb-text-3)] hover:text-white"
            >
              {t(k.includes(".") ? k : `nav.${k}`)}
            </Link>
          ))}
        </nav>
        <ul className="space-y-2 text-sm text-[var(--clb-text-2)]">
          <li className="flex items-center gap-2">
            <Mail size={16} />
            <a href="mailto:info@codelab.ge">info@codelab.ge</a>
          </li>
          <li className="flex items-center gap-2">
            <Phone size={16} />
            <a href="tel:+995571025027">+995 571 025 027</a>
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={16} />
            {t("common.address")}
          </li>
        </ul>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-[var(--clb-text-3)]">
        © {new Date().getFullYear()} CodeLab · codelab.ge · {t("common.rights")}
      </div>
    </footer>
  );
}
