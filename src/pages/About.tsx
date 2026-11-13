import { Terminal, Palette, Camera, Video, PenTool } from "lucide-react";
import { useLang } from "../i18n";
import SEO from "../components/SEO";
import Section from "../components/Section";

const tIcons = [Palette, Camera, Video, PenTool];

export default function About() {
  const { t } = useLang();
  const companyDesc = t("about.companyDesc");

  return (
    <>
      <SEO page="about" />
      <Section title={t("about.title")}>
        <div className="glass grid items-center gap-8 p-6 md:grid-cols-[auto_1fr] md:p-10">
          <img
            src="/profile.jpg"
            alt={t("about.founderName")}
            className="w-48 sm:w-56 h-auto"
          />
          <div>
            <h3 className="text-2xl font-bold">{t("about.founderName")}</h3>
            <p className="mt-1 font-medium text-[var(--clb-accent-cyan)]">
              {t("about.founderRole")}
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed">
              {t("about.founderText")}
            </p>
          </div>
        </div>

        {Array.isArray(companyDesc) && (
          <div className="glass mt-6 space-y-4 p-6 md:p-10">
            {companyDesc.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </Section>

      <Section title={t("about.teamTitle")}>
        <div className="glass p-6 md:p-8">
          <div className="mx-auto flex max-w-md items-center gap-4 rounded-xl border border-[var(--clb-accent-cyan)]/40 bg-[#0F111A]/60 p-5">
            <Terminal
              className="shrink-0 text-[var(--clb-accent-cyan)]"
              size={30}
            />
            <div>
              <h3 className="font-semibold">{t("about.core")}</h3>
              <p className="text-sm">{t("about.coreDesc")}</p>
            </div>
          </div>
          <div
            className="mx-auto h-8 w-px"
            style={{ background: "var(--clb-grad)" }}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(t("about.team") as string[]).map((r, i) => {
              const I = tIcons[i];
              return (
                <div
                  key={r}
                  className="hover-glow rounded-xl border border-white/10 bg-[#0F111A]/50 p-5 text-center"
                >
                  <I
                    className="mx-auto text-[var(--clb-accent-violet)]"
                    size={26}
                  />
                  <p className="mt-3 text-sm font-medium text-white">{r}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section title={t("about.stepsTitle")}>
        <ol className="grid gap-5 md:grid-cols-4">
          {(t("about.steps") as { t: string; d: string }[]).map((s, i) => (
            <li key={s.t} className="glass p-6">
              <span className="grad-text font-mono text-2xl font-bold">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
