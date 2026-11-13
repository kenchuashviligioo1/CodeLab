import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessagesSquare,
  Users,
  Zap,
  FileCheck2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLang } from "../i18n";
import { services } from "../data/services";
import { usePortfolio } from "../data/portfolio";
import SEO from "../components/SEO";
import Section from "../components/Section";
import ServiceCard from "../components/ServiceCard";

const whyIcons = [MessagesSquare, Users, Zap, FileCheck2];

function HeroSlider() {
  const { t, to } = useLang();
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      image: "/banner-1.jpg", // ჩააგდე ფოტო public/banner-1.jpg-ში
      title: t("hero.title"),
      desc: t("hero.desc"),
      cta1Text: t("hero.cta1"),
      cta1Link: "/brief",
      cta2Text: t("hero.cta2"),
      cta2Link: "/portfolio",
    },
    {
      image: "/banner-2.jpg", // ჩააგდე ფოტო public/banner-2.jpg-ში
      title: "თანამედროვე ვებ და IT გადაწყვეტილებები",
      desc: "ვქმნით სწრაფ, დაცულ და მასშტაბირებად ციფრულ პროდუქტებს თქვენი ბიზნესის ზრდისთვის.",
      cta1Text: "სერვისების ნახვა",
      cta1Link: "/services",
      cta2Text: "კონტაქტი",
      cta2Link: "/contact",
    },
    {
      image: "/banner-3.jpg", // ჩააგდე ფოტო public/banner-3.jpg-ში
      title: "ბრენდინგი და ციფრული მარკეტინგი",
      desc: "გამორჩეული ვიზუალური იდენტობა და სტრატეგია, რომელიც კონკურენტებისგან გამოგარჩევთ.",
      cta1Text: "პროექტის დაწყება",
      cta1Link: "/brief",
      cta2Text: "ჩვენ შესახებ",
      cta2Link: "/about",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  const slide = slides[current];

  return (
    <div className="relative flex min-h-[540px] items-center justify-center overflow-hidden lg:min-h-[620px]">
      {/* ფონის ფოტო ანიმაციით */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          {/* მუქი ფენა ფოტოზე, რომ ტექსტი მკვეთრად ჩანდეს */}
          <div className="absolute inset-0 bg-[#0F111A]/75 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* მთავარი კონტენტი შუაში */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              <span className="grad-text">{slide.title}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-[var(--clb-text-2)]">
              {slide.desc}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to={to(slide.cta1Link)} className="btn btn-primary">
                {slide.cta1Text}
              </Link>
              <Link to={to(slide.cta2Link)} className="btn btn-ghost">
                {slide.cta2Text}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* მარცხენა და მარჯვენა ისრები გვერდებზე */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="glass absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:bg-white/15 sm:flex"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="glass absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:bg-white/15 sm:flex"
      >
        <ChevronRight size={22} />
      </button>

      {/* ქვედა გადამრთველი წერტილები */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === idx
                ? "w-8 bg-[var(--clb-accent-cyan)]"
                : "w-2 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { t, to, lang } = useLang();
  const { items } = usePortfolio();
  return (
    <>
      <SEO page="home" />
      <HeroSlider />

      <Section title={t("home.servicesTitle")}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>
      </Section>

      <Section title={t("home.whyTitle")}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t("why") as { t: string; d: string }[]).map((w, i) => {
            const I = whyIcons[i];
            return (
              <div key={w.t} className="glass p-6">
                <I className="text-[var(--clb-accent-cyan)]" size={26} />
                <h3 className="mt-4 font-semibold">{w.t}</h3>
                <p className="mt-2 text-sm">{w.d}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title={t("home.featuredTitle")}>
        <div className="grid gap-5 md:grid-cols-3">
          {items.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              to={to("/portfolio")}
              className="glass hover-glow block overflow-hidden"
            >
              {p.image ? (
                <img src={p.image} alt={p.title[lang]} loading="lazy" className="h-40 w-full object-cover" />
              ) : (
                <div
                  className="h-40"
                  style={{ background: "var(--clb-grad)", opacity: 0.85 }}
                />
              )}
              <div className="p-5">
                <h3 className="font-semibold">
                  {p.title[lang]}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map((g) => (
                    <span
                      key={g}
                      className="font-mono text-xs text-[var(--clb-text-3)]"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass relative overflow-hidden p-8 text-center sm:p-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{ background: "var(--clb-grad)" }}
          />
          <h2 className="relative mx-auto max-w-2xl text-2xl font-bold sm:text-3xl">
            {t("home.ctaTitle")}
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl">{t("home.ctaDesc")}</p>
          <Link to={to("/brief")} className="btn btn-primary relative mt-7">
            {t("home.ctaBtn")}
          </Link>
        </div>
      </Section>
    </>
  );
}
