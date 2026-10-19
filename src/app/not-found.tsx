import Link from "next/link";
import { btn, container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-[100px]">
      <div className={`${container} text-center`}>
        <p className="eyebrow text-or">Page introuvable</p>
        <h1 className="font-display mt-5 text-[clamp(2.6rem,6vw,5rem)] leading-tight font-light">
          Cette page a changé d&apos;équilibre.
        </h1>
        <p className="mt-5 text-lg text-nuit/70">L&apos;adresse n&apos;existe pas ou plus. Reprenez depuis l&apos;accueil ou réservez directement.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className={btn.primary}>Retour à l&apos;accueil</Link>
          <Link href="/reserver" className={btn.ghost}>Prendre rendez-vous</Link>
        </div>
      </div>
    </section>
  );
}
