"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CalendarPlus, Clock, Loader2, UserRound } from "lucide-react";
import { bookingConditions, getService, services, universes, type Service } from "@/content/services";
import type { Booking, Slot } from "@/lib/booking/types";
import { btn } from "../ui";

const ease = [0.22, 1, 0.36, 1] as const;
const STEPS = ["Prestation", "Créneau", "Coordonnées", "Confirmation"] as const;

const dayLabel = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
const longDate = (local: string) =>
  new Date(local.slice(0, 10) + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
const time = (local: string) => local.slice(11, 16).replace(":", "h");

function todayParis() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(new Date());
}
function addDays(date: string, n: number) {
  const d = new Date(date + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function BookingFlow({ initialService, source }: { initialService?: string; source?: string }) {
  const initial = initialService ? getService(initialService) : undefined;
  const [step, setStep] = useState(initial?.bookable ? 1 : 0);
  const [service, setService] = useState<Service | undefined>(initial?.bookable ? initial : undefined);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  const go = (n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-8">
        <ol className="mb-10 flex gap-2" aria-label="Étapes de la réservation">
          {STEPS.map((label, i) => (
            <li key={label} className="flex-1">
              <div className="h-[3px] overflow-hidden rounded-full bg-nuit/10">
                <motion.div className="h-full bg-or" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.7, ease }} />
              </div>
              <p className={`mt-2 hidden text-[0.7rem] font-semibold tracking-[0.16em] uppercase sm:block ${i === step ? "text-nuit" : "text-nuit/40"}`} aria-current={i === step ? "step" : undefined}>
                {label}
              </p>
            </li>
          ))}
        </ol>
        <p className="sr-only" aria-live="polite">
          Étape {step + 1} sur {STEPS.length} : {STEPS[step]}
        </p>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease }}>
            {step === 0 && (
              <ChooseService
                selected={service?.id}
                onChoose={(s) => {
                  setService(s);
                  setSlot(null);
                  go(1);
                }}
              />
            )}
            {step === 1 && service && (
              <ChooseSlot service={service} selected={slot} onBack={() => go(0)} onChoose={(sl) => { setSlot(sl); go(2); }} />
            )}
            {step === 2 && service && slot && (
              <Details
                service={service}
                slot={slot}
                source={source}
                onBack={() => go(1)}
                onConflict={() => { setSlot(null); go(1); }}
                onDone={(b) => { setBooking(b); go(3); }}
              />
            )}
            {step === 3 && booking && service && <Confirmation booking={booking} service={service} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <aside className="lg:col-span-4">
        <div className="rounded-[28px] bg-white/70 p-7 shadow-[0_30px_60px_-40px_rgba(15,35,51,0.5)] lg:sticky lg:top-28">
          <p className="eyebrow text-or">Votre réservation</p>
          {service ? (
            <>
              <p className="font-display mt-4 text-2xl leading-tight">{service.name}</p>
              <dl className="mt-5 space-y-3 text-sm">
                <Row icon={<Clock className="size-4 text-or" />} label="Durée" value={service.durationLabel} />
                <Row icon={<UserRound className="size-4 text-or" />} label="Professionnel" value={service.seller} />
                {slot && <Row icon={<CalendarPlus className="size-4 text-or" />} label="Créneau" value={`${longDate(slot.start)}, ${time(slot.start)} – ${time(slot.end)}`} />}
              </dl>
              <div className="mt-6 flex items-baseline justify-between border-t border-nuit/10 pt-5">
                <span className="text-sm text-ardoise">Prix public TTC</span>
                <span className="font-display text-3xl">{service.priceLabel}</span>
              </div>
            </>
          ) : (
            <p className="mt-4 text-nuit/60">Choisissez une prestation pour voir son récapitulatif.</p>
          )}
          <details className="group mt-6 border-t border-nuit/10 pt-5 text-sm [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              Conditions d&apos;annulation et de paiement <span className="text-or transition-transform group-open:rotate-45">+</span>
            </summary>
            <ul className="mt-3 space-y-2 leading-relaxed text-nuit/70">
              {bookingConditions.map((c) => (
                <li key={c}>— {c}</li>
              ))}
            </ul>
          </details>
        </div>
      </aside>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5">{icon}</span>
      <div>
        <dt className="sr-only">{label}</dt>
        <dd className="first-letter:uppercase">{value}</dd>
      </div>
    </div>
  );
}

/* ——— Étape 1 ——— */
function ChooseService({ selected, onChoose }: { selected?: string; onChoose: (s: Service) => void }) {
  return (
    <div>
      <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-tight font-light">Quelle prestation souhaitez-vous réserver&nbsp;?</h2>
      <p className="mt-3 text-nuit/65">Aucun bilan préalable n&apos;est nécessaire. Vous hésitez&nbsp;? Charly peut vous orienter.</p>
      <div className="mt-10 space-y-10">
        {[...universes.map((u) => ({ slug: u.slug as string, name: u.name })), { slug: "body-360", name: "BODY 360 — bilans" }].map((u) => (
          <section key={u.slug} aria-labelledby={`grp-${u.slug}`}>
            <h3 id={`grp-${u.slug}`} className="eyebrow mb-4 text-or">{u.name}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {services
                .filter((s) => s.universe === u.slug)
                .map((s) => (
                  <button
                    key={s.id}
                    disabled={!s.bookable}
                    onClick={() => onChoose(s)}
                    aria-pressed={selected === s.id}
                    className={`group flex flex-col rounded-2xl border p-5 text-left transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                      selected === s.id ? "border-nuit bg-nuit text-ivoire" : "border-nuit/15 bg-white/40 enabled:hover:-translate-y-0.5 enabled:hover:border-or"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-semibold">{s.name}</span>
                      <span className="font-display shrink-0 text-lg">{s.priceLabel}</span>
                    </span>
                    <span className={`mt-1 text-sm ${selected === s.id ? "text-ivoire/70" : "text-ardoise"}`}>
                      {s.durationLabel}
                      {s.kind === "cours" && ` · ${s.capacity} participants max.`}
                      {!s.bookable && (s.anovator?.rule === "obligatoire" || s.anovator?.rule === "inclus" ? " · après bilan ANOVATOR" : " · bientôt réservable")}
                    </span>
                  </button>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ——— Étape 2 ——— */
function ChooseSlot({ service, selected, onBack, onChoose }: { service: Service; selected: Slot | null; onBack: () => void; onChoose: (s: Slot) => void }) {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);
  const [from, setFrom] = useState(todayParis());
  const [day, setDay] = useState<string | null>(selected?.start.slice(0, 10) ?? null);
  const DAYS = 14;

  useEffect(() => {
    let alive = true;
    setSlots(null);
    setError(null);
    fetch(`/api/availability?service=${service.id}&from=${from}&days=${DAYS}`)
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error ?? "Impossible de charger les disponibilités.");
        return j;
      })
      .then((j) => {
        if (!alive) return;
        setSlots(j.slots);
        setDemo(j.demo);
        setDay((d) => (d && j.slots.some((s: Slot) => s.start.startsWith(d)) ? d : j.slots[0]?.start.slice(0, 10) ?? null));
      })
      .catch((e) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, [service.id, from]);

  const days = useMemo(() => Array.from({ length: DAYS }, (_, i) => addDays(from, i)), [from]);
  const byDay = useMemo(() => {
    const m = new Map<string, Slot[]>();
    slots?.forEach((s) => m.set(s.start.slice(0, 10), [...(m.get(s.start.slice(0, 10)) ?? []), s]));
    return m;
  }, [slots]);
  const daySlots = day ? byDay.get(day) ?? [] : [];
  const isGroup = service.kind === "cours" || service.bookAs === "cours-collectif";

  return (
    <div>
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm text-ardoise hover:text-nuit">
        <ArrowLeft className="size-4" /> Changer de prestation
      </button>
      <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-tight font-light">Choisissez votre créneau</h2>
      <p className="mt-3 text-nuit/65">
        {service.kind === "forfait" ? "Réservez la première séance de votre forfait ; les suivantes se planifient ensuite. " : ""}
        Les créneaux affichés tiennent compte des disponibilités du professionnel, de la salle et de l&apos;équipement.
      </p>

      <div className="mt-8 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold capitalize">
          {new Date(from + "T12:00:00").toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setFrom(addDays(from, -DAYS))}
            disabled={from <= todayParis()}
            aria-label="Deux semaines précédentes"
            className="grid size-10 place-items-center rounded-full border border-nuit/15 disabled:opacity-30"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button onClick={() => setFrom(addDays(from, DAYS))} aria-label="Deux semaines suivantes" className="grid size-10 place-items-center rounded-full border border-nuit/15">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="-mx-5 mt-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div className="flex gap-2" role="listbox" aria-label="Jours">
          {days.map((d) => {
            const n = byDay.get(d)?.length ?? 0;
            const active = d === day;
            return (
              <button
                key={d}
                role="option"
                aria-selected={active}
                disabled={!slots || n === 0}
                onClick={() => setDay(d)}
                className={`flex w-[68px] shrink-0 flex-col items-center rounded-2xl border py-3 text-center transition-colors disabled:opacity-35 ${
                  active ? "border-nuit bg-nuit text-ivoire" : "border-nuit/15 enabled:hover:border-or"
                }`}
              >
                <span className="text-[0.68rem] font-semibold tracking-[0.12em] uppercase">{dayLabel(d).split(" ")[0]}</span>
                <span className="font-display mt-1 text-2xl leading-none">{dayLabel(d).split(" ")[1]}</span>
                <span className={`mt-2 size-1.5 rounded-full ${n ? (active ? "bg-or-clair" : "bg-or") : "bg-transparent"}`} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 min-h-[180px]">
        {error && (
          <p role="alert" className="rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-900">
            {error}
          </p>
        )}
        {!slots && !error && (
          <p className="flex items-center gap-2 text-sm text-ardoise">
            <Loader2 className="size-4 animate-spin" /> Chargement des disponibilités…
          </p>
        )}
        {slots && !error && slots.length === 0 && (
          <p className="text-nuit/70">Aucun créneau disponible sur ces deux semaines. Essayez la période suivante ou demandez à Charly.</p>
        )}
        {day && daySlots.length > 0 && (
          <>
            <p className="mb-4 text-sm font-semibold first-letter:uppercase">{longDate(day + "T00:00")}</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
              {daySlots.map((s) => {
                const active = selected?.start === s.start;
                return (
                  <button
                    key={s.start}
                    onClick={() => onChoose(s)}
                    aria-pressed={active}
                    className={`rounded-xl border px-3 py-3 text-center transition-all ${
                      active ? "border-nuit bg-nuit text-ivoire" : "border-nuit/15 bg-white/40 hover:-translate-y-0.5 hover:border-or"
                    }`}
                  >
                    <span className="block font-semibold">{time(s.start)}</span>
                    {isGroup && <span className={`block text-[0.7rem] ${active ? "text-ivoire/70" : "text-ardoise"}`}>{s.remaining} place{s.remaining > 1 ? "s" : ""}</span>}
                  </button>
                );
              })}
            </div>
          </>
        )}
        {demo && slots && (
          <p className="mt-8 text-xs text-ardoise">Planning de démonstration : les créneaux seront synchronisés avec le planning SPORTHESIA à la mise en ligne.</p>
        )}
      </div>
    </div>
  );
}

/* ——— Étape 3 ——— */
const input =
  "mt-2 w-full rounded-xl border border-nuit/20 bg-white/70 px-4 py-3.5 text-base outline-none transition-colors placeholder:text-nuit/35 focus:border-nuit focus:bg-white aria-[invalid=true]:border-red-700";

function Field({ name, label, type = "text", auto, placeholder, error }: { name: string; label: string; type?: string; auto: string; placeholder?: string; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={auto}
        placeholder={placeholder}
        required
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
        className={input}
      />
      {error && (
        <p id={`${name}-err`} className="mt-1.5 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}

function Details({
  service,
  slot,
  source,
  onBack,
  onConflict,
  onDone,
}: {
  service: Service;
  slot: Slot;
  source?: string;
  onBack: () => void;
  onConflict: () => void;
  onDone: (b: Booking) => void;
}) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSending(true);
    setError(null);
    setFields({});
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          start: slot.start,
          customer: {
            firstName: fd.get("firstName"),
            lastName: fd.get("lastName"),
            email: fd.get("email"),
            phone: fd.get("phone"),
          },
          note: fd.get("note"),
          acceptedTerms: fd.get("terms") === "on",
          website: fd.get("website"),
          source: source ?? "site",
        }),
      });
      const j = await res.json();
      if (res.status === 409) {
        setError(j.error);
        setTimeout(onConflict, 1800);
        return;
      }
      if (!res.ok) {
        setError(j.error);
        setFields(j.fields ?? {});
        return;
      }
      onDone(j.booking);
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm text-ardoise hover:text-nuit">
        <ArrowLeft className="size-4" /> Changer de créneau
      </button>
      <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-tight font-light">Vos coordonnées</h2>
      <p className="mt-3 text-nuit/65">Uniquement ce qui est nécessaire pour confirmer votre rendez-vous et vous envoyer un rappel.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field name="firstName" label="Prénom" auto="given-name" error={fields.firstName} />
        <Field name="lastName" label="Nom" auto="family-name" error={fields.lastName} />
        <Field name="email" label="E-mail" type="email" auto="email" placeholder="nom@exemple.fr" error={fields.email} />
        <Field name="phone" label="Téléphone" type="tel" auto="tel" placeholder="06 12 34 56 78" error={fields.phone} />
        <div className="sm:col-span-2">
          <label htmlFor="note" className="text-sm font-semibold">
            Message <span className="font-normal text-ardoise">(facultatif)</span>
          </label>
          <textarea id="note" name="note" rows={3} maxLength={500} className={input} />
          <p className="mt-1.5 text-xs text-ardoise">N&apos;indiquez pas d&apos;informations de santé détaillées : le professionnel en parlera avec vous lors de la séance.</p>
        </div>
        {/* champ piège anti-robot */}
        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor="website">Ne pas remplir</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <label className="mt-8 flex items-start gap-3 text-sm leading-relaxed">
        <input type="checkbox" name="terms" className="mt-1 size-4 accent-[var(--color-nuit)]" aria-invalid={!!fields.acceptedTerms} />
        <span>
          J&apos;accepte les{" "}
          <Link href="/conditions" target="_blank" className="underline decoration-or underline-offset-4">
            conditions de réservation
          </Link>{" "}
          et la{" "}
          <Link href="/confidentialite" target="_blank" className="underline decoration-or underline-offset-4">
            politique de confidentialité
          </Link>
          . Je note que cette prestation est vendue par {service.seller} et n&apos;est pas conventionnée.
        </span>
      </label>
      {fields.acceptedTerms && <p className="mt-1.5 text-sm text-red-800">{fields.acceptedTerms}</p>}

      {error && (
        <p role="alert" className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-900">
          {error}
        </p>
      )}

      <button type="submit" disabled={sending} className={`${btn.primary} mt-8 w-full sm:w-auto disabled:opacity-60`}>
        {sending ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
        Confirmer la réservation
      </button>
    </form>
  );
}

/* ——— Étape 4 ——— */
function Confirmation({ booking, service }: { booking: Booking; service: Service }) {
  const ics = useMemo(() => {
    const f = (l: string) => l.replace(/[-:]/g, "") + "00";
    const content = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//SPORTHESIA//Reservation//FR",
      "BEGIN:VEVENT",
      `UID:${booking.id}@sporthesia`,
      `DTSTART;TZID=Europe/Paris:${f(booking.start)}`,
      `DTEND;TZID=Europe/Paris:${f(booking.end)}`,
      `SUMMARY:SPORTHESIA — ${service.name}`,
      `DESCRIPTION:Référence ${booking.reference}`,
      "LOCATION:SPORTHESIA\\, Paris 7e",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;
  }, [booking, service]);

  return (
    <div className="text-center sm:text-left">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="mx-auto grid size-16 place-items-center rounded-full bg-or text-encre sm:mx-0"
      >
        <Check className="size-7" />
      </motion.span>
      <h2 className="font-display mt-8 text-[clamp(2.2rem,4vw,3.4rem)] leading-tight font-light">C&apos;est réservé, {booking.customer.firstName}.</h2>
      <p className="mt-4 text-lg text-nuit/70">
        {service.name}, <span className="first-letter:lowercase">{longDate(booking.start)}</span> à {time(booking.start)}. Une confirmation vous est envoyée à{" "}
        {booking.customer.email}.
      </p>
      <p className="mt-6 inline-block rounded-full bg-sable px-4 py-2 text-sm">
        Référence <span className="font-semibold tracking-wider">{booking.reference}</span>
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3 sm:justify-start">
        <a href={ics} download={`sporthesia-${booking.reference}.ics`} className={btn.primary}>
          <CalendarPlus className="size-4" /> Ajouter à mon agenda
        </a>
        <Link href="/" className={btn.ghost}>
          Retour à l&apos;accueil
        </Link>
      </div>
      <p className="mt-10 font-display text-xl italic text-ardoise">Avec SPORTHESIA, osez le premier pas !</p>
    </div>
  );
}
