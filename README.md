# SPORTHESIA — site

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Modifier le contenu (sans toucher au code des pages)

| Quoi | Fichier |
|---|---|
| Prestations, prix, durées, statut « prévisionnel », réservable ou non, FAQ | `src/content/services.ts` |
| Actualités et offres (avec dates de validité) | `src/content/news.ts` |
| Coordonnées, horaires, phrases signatures | `src/content/site.ts` |
| Photos | `public/images/` |

Les mentions `TODO` et les surlignages dorés dans les pages légales signalent les informations à fournir par le client.

## Réservation

- API : `GET /api/availability`, `POST /api/bookings`.
- Fournisseur : `src/lib/booking/` — démonstration en mémoire par défaut, planning connecté via `PLANNING_API_URL` (contrat : `docs/PLANNING_API.md`).

## Photos

Photos d'ambiance provisoires issues d'Unsplash (licence Unsplash : usage commercial autorisé). À remplacer par le shooting des vrais locaux et intervenants.
