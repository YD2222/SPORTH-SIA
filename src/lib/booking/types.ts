/**
 * Contrat de réservation entre le site et le planning SPORTHESIA.
 * Toutes les heures sont exprimées en heure locale de Paris (Europe/Paris),
 * au format "YYYY-MM-DDTHH:mm".
 */
export const TIME_ZONE = "Europe/Paris";

export type Slot = {
  start: string;
  end: string;
  /** Places restantes (1 pour une séance individuelle, jusqu'à 4 pour un cours). */
  remaining: number;
  capacity: number;
};

export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type BookingRequest = {
  /** Prestation choisie par le client (peut être un forfait). */
  serviceId: string;
  start: string;
  customer: Customer;
  /** Message libre, sans informations de santé détaillées. */
  note?: string;
  acceptedTerms: boolean;
  /** Provenance (site, QR code prestataire, Charly…). */
  source?: string;
};

export type Booking = {
  id: string;
  reference: string;
  serviceId: string;
  /** Prestation effectivement planifiée (la première séance d'un forfait). */
  slotServiceId: string;
  start: string;
  end: string;
  customer: Customer;
  note?: string;
  status: "confirmée" | "en attente de paiement";
  amount: number | null;
  source: string;
  createdAt: string;
};

export interface BookingProvider {
  getAvailability(serviceId: string, fromDate: string, days: number): Promise<Slot[]>;
  createBooking(req: BookingRequest): Promise<Booking>;
}

export class BookingError extends Error {
  constructor(
    message: string,
    public code: "invalid" | "unavailable" | "not_bookable" | "upstream",
    public status = 400,
  ) {
    super(message);
  }
}
