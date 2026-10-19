# Contrat API — planning SPORTHESIA

Le site appelle le planning dès que `PLANNING_API_URL` est défini (sinon : planning de démonstration en mémoire, `src/lib/booking/mock.ts`).
Authentification : `Authorization: Bearer <PLANNING_API_KEY>`.
Heures : heure locale de Paris, format `YYYY-MM-DDTHH:mm`.

## GET /availability?service={id}&from=YYYY-MM-DD&days=14

```json
{ "slots": [{ "start": "2026-10-16T09:00", "end": "2026-10-16T09:55", "remaining": 3, "capacity": 4 }] }
```

Un créneau n'est renvoyé que si **professionnel, salle et équipement** sont libres simultanément.
Pour un forfait (`carnet-5`, `luminotherapie-5`…), renvoyer les créneaux de la prestation unitaire.

## POST /bookings

Corps : `BookingRequest` (`src/lib/booking/types.ts`) — `serviceId`, `start`, `customer {firstName,lastName,email,phone}`, `note?`, `acceptedTerms`, `source` (`site`, `qr-<prestataire>`, `charly`…).

- `201` → `{ "booking": Booking }`
- `409` → `{ "error": "..." }` si le créneau vient d'être pris (verrou côté planning obligatoire)
- `400` → données invalides

Le planning gère : verrouillage / anti double-réservation, e-mails de confirmation et rappels, acompte ou paiement intégral (Stripe Connect, compte du prestataire), synchronisation des agendas Google de chaque prestataire.

## Identifiants de prestations

Voir `src/content/services.ts` (`id`, `resources.room`, `resources.equipment`, `seller`, `capacity`).

## Liens / QR codes par prestataire

`/reserver?prestation=<id>&source=qr-<prestataire>` — la provenance est transmise au planning.
