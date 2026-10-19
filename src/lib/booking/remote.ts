import { BookingError, type Booking, type BookingProvider, type BookingRequest, type Slot } from "./types";

/**
 * Connecteur vers le planning SPORTHESIA (à développer).
 * Activé dès que PLANNING_API_URL est défini. Contrat attendu : voir docs/PLANNING_API.md.
 */
export function remoteProvider(baseUrl: string, apiKey?: string): BookingProvider {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
  };

  async function call<T>(path: string, init?: RequestInit): Promise<T> {
    let res: Response;
    try {
      res = await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, { ...init, headers, cache: "no-store", signal: AbortSignal.timeout(8000) });
    } catch {
      throw new BookingError("Le planning est momentanément indisponible. Réessayez dans un instant.", "upstream", 503);
    }
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      const code = res.status === 409 ? "unavailable" : res.status === 400 ? "invalid" : "upstream";
      throw new BookingError(body?.error ?? "Le planning a refusé la demande.", code, res.status);
    }
    return body as T;
  }

  return {
    async getAvailability(serviceId, fromDate, days) {
      const q = new URLSearchParams({ service: serviceId, from: fromDate, days: String(days) });
      const { slots } = await call<{ slots: Slot[] }>(`/availability?${q}`);
      return slots;
    },
    async createBooking(req: BookingRequest) {
      const { booking } = await call<{ booking: Booking }>(`/bookings`, { method: "POST", body: JSON.stringify(req) });
      return booking;
    },
  };
}
