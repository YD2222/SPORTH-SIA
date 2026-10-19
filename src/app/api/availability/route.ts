import { NextResponse, type NextRequest } from "next/server";
import { BookingError, TIME_ZONE, bookingProvider, isDemoPlanning } from "@/lib/booking";
import { isLocalDate, parisNow } from "@/lib/booking/time";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const service = sp.get("service") ?? "";
  const from = sp.get("from") ?? parisNow().slice(0, 10);
  const days = Math.min(31, Math.max(1, Number(sp.get("days") ?? 14) || 14));
  if (!service || !isLocalDate(from)) {
    return NextResponse.json({ error: "Paramètres invalides." }, { status: 400 });
  }
  try {
    const slots = await bookingProvider.getAvailability(service, from, days);
    return NextResponse.json({ timeZone: TIME_ZONE, demo: isDemoPlanning, slots }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    if (e instanceof BookingError) return NextResponse.json({ error: e.message, code: e.code }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Erreur inattendue." }, { status: 500 });
  }
}
