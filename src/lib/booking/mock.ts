import { getService, slotServiceOf, type Service } from "@/content/services";
import { addDays, addMinutes, fromMinutes, isLocalDateTime, parisNow, toMinutes, weekday } from "./time";
import { BookingError, type Booking, type BookingProvider, type BookingRequest, type Slot } from "./types";

/**
 * Planning de démonstration, en mémoire.
 * Il applique les mêmes règles que le futur planning :
 * - créneaux dans les horaires d'ouverture ;
 * - réservation possible seulement si professionnel, salle et équipement sont libres ;
 * - capacité limitée pour les cours (4 places) ;
 * - verrou pour empêcher deux réservations simultanées du même créneau.
 * À remplacer par le planning connecté (voir remote.ts) — les données ne survivent pas à un redémarrage.
 */

const OPENING: Record<number, [string, string] | null> = {
  0: null,
  1: ["08:00", "20:00"],
  2: ["08:00", "20:00"],
  3: ["08:00", "20:00"],
  4: ["08:00", "20:00"],
  5: ["08:00", "20:00"],
  6: ["09:00", "13:00"],
};

/** Horaires fixes des cours en petit groupe. */
const CLASS_SCHEDULE: Record<number, string[]> = {
  1: ["09:00", "12:30", "18:30"],
  2: ["10:00", "19:00"],
  3: ["09:00", "12:30", "18:30"],
  4: ["10:00", "19:00"],
  5: ["09:00", "12:30"],
  6: ["10:00"],
};

const MIN_NOTICE_MIN = 120;

type Stored = Booking & { resources: string[] };
const g = globalThis as unknown as { __sporthesiaBookings?: Stored[] };
const store: Stored[] = (g.__sporthesiaBookings ??= []);

let lock: Promise<unknown> = Promise.resolve();
const withLock = <T>(fn: () => Promise<T> | T): Promise<T> => {
  const run = lock.then(fn, fn);
  lock = run.catch(() => undefined);
  return run;
};

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967295;
}

const resourcesOf = (s: Service) => [`pro:${s.seller}`, `room:${s.resources.room}`, ...(s.resources.equipment ? [`eq:${s.resources.equipment}`] : [])];
const overlaps = (a0: string, a1: string, b0: string, b1: string) => a0 < b1 && b0 < a1;

function candidateStarts(s: Service, date: string): string[] {
  const wd = weekday(date);
  if (s.kind === "cours") return (CLASS_SCHEDULE[wd] ?? []).map((t) => `${date}T${t}`);
  const open = OPENING[wd];
  if (!open || !s.durationMin) return [];
  const step = s.durationMin <= 30 ? 30 : 60;
  const out: string[] = [];
  for (let m = toMinutes(open[0]); m + s.durationMin <= toMinutes(open[1]); m += step) out.push(`${date}T${fromMinutes(m)}`);
  return out;
}

function slotFor(s: Service, start: string, now: string): Slot | null {
  if (!s.durationMin) return null;
  if (start < addMinutes(now, MIN_NOTICE_MIN)) return null;
  const end = addMinutes(start, s.durationMin);
  const res = resourcesOf(s);

  // Occupation simulée, déterministe, pour un rendu réaliste.
  const simulated = hash(`${s.seller}|${start}`);
  if (s.kind !== "cours" && simulated < 0.32) return null;

  const clashing = store.filter((b) => overlaps(start, end, b.start, b.end) && b.resources.some((r) => res.includes(r)));
  if (s.kind === "cours") {
    // Les inscrits au même cours partagent les ressources ; tout autre usage les bloque.
    if (clashing.some((b) => b.slotServiceId !== s.id || b.start !== start)) return null;
    const taken = Math.floor(simulated * s.capacity) + clashing.length;
    const remaining = s.capacity - taken;
    return remaining > 0 ? { start, end, remaining, capacity: s.capacity } : null;
  }
  if (clashing.length) return null;
  return { start, end, remaining: 1, capacity: 1 };
}

export const mockProvider: BookingProvider = {
  async getAvailability(serviceId, fromDate, days) {
    const svc = getService(serviceId);
    if (!svc) throw new BookingError("Prestation inconnue.", "invalid", 404);
    if (!svc.bookable) throw new BookingError("Cette prestation n'est pas encore réservable en ligne.", "not_bookable");
    const s = slotServiceOf(svc);
    const now = parisNow();
    const slots: Slot[] = [];
    for (let i = 0; i < days; i++) {
      const date = addDays(fromDate, i);
      for (const start of candidateStarts(s, date)) {
        const slot = slotFor(s, start, now);
        if (slot) slots.push(slot);
      }
    }
    return slots;
  },

  createBooking(req: BookingRequest) {
    return withLock(() => {
      const svc = getService(req.serviceId);
      if (!svc) throw new BookingError("Prestation inconnue.", "invalid", 404);
      if (!svc.bookable) throw new BookingError("Cette prestation n'est pas encore réservable en ligne.", "not_bookable");
      if (!isLocalDateTime(req.start)) throw new BookingError("Créneau invalide.", "invalid");
      const s = slotServiceOf(svc);
      const valid = candidateStarts(s, req.start.slice(0, 10)).includes(req.start);
      const slot = valid ? slotFor(s, req.start, parisNow()) : null;
      if (!slot) throw new BookingError("Ce créneau vient d'être réservé. Choisissez-en un autre.", "unavailable", 409);

      const id = crypto.randomUUID();
      const booking: Stored = {
        id,
        reference: `SPH-${req.start.slice(2, 10).replace(/-/g, "")}-${id.slice(0, 4).toUpperCase()}`,
        serviceId: svc.id,
        slotServiceId: s.id,
        start: slot.start,
        end: slot.end,
        customer: req.customer,
        note: req.note,
        status: "confirmée",
        amount: svc.price,
        source: req.source ?? "site",
        createdAt: new Date().toISOString(),
        resources: resourcesOf(s),
      };
      store.push(booking);
      const { resources: _r, ...publicBooking } = booking;
      void _r;
      return publicBooking;
    });
  },
};
