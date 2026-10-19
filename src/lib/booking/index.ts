import "server-only";
import { mockProvider } from "./mock";
import { remoteProvider } from "./remote";
import type { BookingProvider } from "./types";

export * from "./types";

/** Planning connecté si configuré, sinon planning de démonstration. */
export const bookingProvider: BookingProvider = process.env.PLANNING_API_URL
  ? remoteProvider(process.env.PLANNING_API_URL, process.env.PLANNING_API_KEY)
  : mockProvider;

export const isDemoPlanning = !process.env.PLANNING_API_URL;
