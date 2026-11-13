import { Link, useLocation } from "react-router-dom";
import { useLang, LANGS } from "../i18n";

export default function LangSwitch() {
  const { lang } = useLang();
  const { pathname, search } = useLocation();
  return (
    <div
      className="flex items-center rounded-lg border border-white/15 p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => (
        <Link
          key={l}
          to={pathname.replace(/^\/(ka|en)/, `/${l}`) + search}
          onClick={() => {
            try {
              localStorage.setItem("clb_language", l);
            } catch {}
          }}
          className={`rounded-md px-2.5 py-1 transition ${l === lang ? "bg-white/15 text-white" : "text-[var(--clb-text-3)] hover:text-white"}`}
        >
          {l === "ka" ? "ქარ" : l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
