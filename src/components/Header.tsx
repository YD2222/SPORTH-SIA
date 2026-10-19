"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { CalendarDays, MessageCircle } from "lucide-react";
import { nav, site, signatures } from "@/content/site";
import { Logo } from "./Logo";
import { CharlyButton, useCharly } from "./Charly";
import { btn, container } from "./ui";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !menu);
  });

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-500 ${
          scrolled || menu ? "bg-ivoire/85 shadow-[0_1px_0_rgba(24,51,74,0.08)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className={`${container} flex h-[76px] items-center justify-between gap-6`}>
          <Logo />
          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {nav.slice(1).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative px-2.5 py-2 text-[0.74rem] font-semibold tracking-[0.14em] whitespace-nowrap uppercase text-nuit/80 transition-colors hover:text-nuit xl:px-4 xl:text-[0.78rem]"
                >
                  {item.label}
                  {active && (
                    <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-or" />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <CharlyButton className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-nuit hover:bg-nuit/5 2xl:inline-flex">
              <MessageCircle className="size-4 text-or" /> Charly
            </CharlyButton>
            <Link href="/reserver" className={`${btn.primary} !px-5 !py-3 whitespace-nowrap max-sm:!hidden`}>
              Prendre rendez-vous
            </Link>
            <button
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="menu-mobile"
              aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
              className="relative grid size-11 place-items-center rounded-full border border-nuit/15 lg:hidden"
            >
              <span className={`absolute h-px w-5 bg-nuit transition-transform duration-500 ${menu ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-px w-5 bg-nuit transition-transform duration-500 ${menu ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="menu-mobile"
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col bg-ivoire pt-[96px] lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Menu mobile" className={`${container} flex flex-1 flex-col`}>
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-nuit/10"
                >
                  <Link href={item.href} className="flex items-baseline justify-between py-4 font-display text-[2.2rem] leading-none">
                    {item.label}
                    {pathname === item.href && <span className="size-2 rounded-full bg-or" />}
                  </Link>
                </motion.div>
              ))}
              <p className="mt-auto pb-32 font-display text-lg italic text-ardoise">{signatures.figé}</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileBookBar />
    </>
  );
}

/**
 * Accès permanent à la prise de rendez-vous sur téléphone.
 * Compact, et masqué dès qu'un bouton principal ([data-cta]) ou le pied de page est visible,
 * pour ne jamais recouvrir un texte, une FAQ ou un bouton.
 */
function MobileBookBar() {
  const { open } = useCharly();
  const pathname = usePathname();
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setCovered(visible.size > 0);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const t = setTimeout(() => document.querySelectorAll("[data-cta], footer").forEach((el) => io.observe(el)), 300);
    return () => {
      clearTimeout(t);
      io.disconnect();
      setCovered(false);
    };
  }, [pathname]);

  if (pathname.startsWith("/reserver")) return null;
  return (
    <motion.div
      initial={false}
      animate={{ y: covered ? 90 : 0, opacity: covered ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={covered}
      className="fixed inset-x-4 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[45] flex gap-1 rounded-full bg-nuit/95 p-1 shadow-[0_16px_30px_-14px_rgba(15,35,51,0.6)] backdrop-blur sm:hidden"
    >
      <Link
        href="/reserver"
        tabIndex={covered ? -1 : undefined}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ivoire py-2.5 text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-nuit"
      >
        <CalendarDays className="size-4" /> Prendre rendez-vous
      </Link>
      <button
        onClick={open}
        tabIndex={covered ? -1 : undefined}
        aria-label={`Parler à Charly — ${site.name}`}
        className="grid w-11 place-items-center rounded-full text-ivoire"
      >
        <MessageCircle className="size-[18px]" />
      </button>
    </motion.div>
  );
}
