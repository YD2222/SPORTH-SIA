import { NextResponse, type NextRequest } from "next/server";
import { BookingError, bookingProvider, type BookingRequest } from "@/lib/booking";
import { isLocalDateTime } from "@/lib/booking/time";

export const dynamic = "force-dynamic";

// Limitation simple du nombre de demandes par adresse IP (par instance).
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) return NextResponse.json({ error: "Trop de demandes. Réessayez dans quelques minutes." }, { status: 429 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Requête invalide." }, { status: 400 });

  // Champ piège anti-robot : rempli uniquement par les robots.
  if (str(body.website, 100)) return NextResponse.json({ error: "Requête invalide." }, { status: 400 });

  const c = (body.customer ?? {}) as Record<string, unknown>;
  const request: BookingRequest = {
    serviceId: str(body.serviceId, 60),
    start: str(body.start, 16),
    customer: {
      firstName: str(c.firstName, 60),
      lastName: str(c.lastName, 60),
      email: str(c.email, 120).toLowerCase(),
      phone: str(c.phone, 30),
    },
    note: str(body.note, 500) || undefined,
    acceptedTerms: body.acceptedTerms === true,
    source: str(body.source, 40) || "site",
  };

  const errors: Record<string, string> = {};
  if (!request.serviceId) errors.serviceId = "Choisissez une prestation.";
  if (!isLocalDateTime(request.start)) errors.start = "Choisissez un créneau.";
  if (!request.customer.firstName) errors.firstName = "Indiquez votre prénom.";
  if (!request.customer.lastName) errors.lastName = "Indiquez votre nom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(request.customer.email)) errors.email = "Indiquez une adresse e-mail valide, par exemple nom@exemple.fr.";
  if (request.customer.phone.replace(/[^\d]/g, "").length < 9) errors.phone = "Indiquez un numéro de téléphone joignable.";
  if (!request.acceptedTerms) errors.acceptedTerms = "Acceptez les conditions pour confirmer la réservation.";
  if (Object.keys(errors).length) return NextResponse.json({ error: "Certaines informations sont à compléter.", fields: errors }, { status: 422 });

  try {
    const booking = await bookingProvider.createBooking(request);
    // TODO : e-mail de confirmation et rappels (gérés par le planning / CharlySecure®).
    return NextResponse.json({ booking }, { status: 201 });
  } catch (e) {
    if (e instanceof BookingError) return NextResponse.json({ error: e.message, code: e.code }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "La réservation n'a pas pu être enregistrée. Réessayez." }, { status: 500 });
  }
}
