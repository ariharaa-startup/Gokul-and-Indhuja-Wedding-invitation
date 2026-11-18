# Naveen & Dharshini — Premium Wedding Invitation

A responsive Next.js App Router wedding reception invitation built with React, TypeScript and custom CSS.

## Event details currently configured

- Couple: D. Naveen & S. Dharshini
- Reception: Saturday, 31 October 2026
- Time: 6:00 PM – 9:00 PM (India Standard Time)
- Venue: PSR Mahal, Karur, Tamil Nadu, India

These details are centralized in `app/page.tsx` near the top of the file. Verify them before publishing.

## Requirements

- Node.js 18.17 or later (Node.js 20 LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add your own media

1. Create a `public` directory.
2. Add a background music file named `music.mp3` to `public/music.mp3`.
3. Replace the Unsplash image URLs in `app/globals.css` with your own licensed photographs.
4. For best performance, use optimized, compressed WebP images and keep them in `public/images/`.

The page uses externally hosted Unsplash demo photography as placeholders. Replace those images before publishing a real invitation.

## Configure RSVP

By default, the RSVP form opens the visitor's email app.

To send responses to WhatsApp:
1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_RSVP_WHATSAPP` to your WhatsApp number in international format, digits only, without `+` or spaces.
3. Restart the development server.

Example:

```env
NEXT_PUBLIC_RSVP_WHATSAPP=919876543210
```

This opens a pre-filled WhatsApp message; it does not store responses in a database. For private RSVP collection, connect a secure form service or backend and validate submissions server-side.

## Customize

- Event date/time and venue: `app/page.tsx`
- Text and sections: `app/page.tsx`
- Colors, typography, layout and responsive styles: `app/globals.css`
- SEO metadata: `app/layout.tsx`
- Map destination: `MAP_URL` in `app/page.tsx`

The countdown uses the configured India Standard Time date. Update `EVENT_DATE` when changing the event date/time.

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository at https://vercel.com/new.
3. Add `NEXT_PUBLIC_RSVP_WHATSAPP` under Project Settings → Environment Variables if using WhatsApp RSVP.
4. Deploy.

## Notes

- This is an enhanced recreation, not the original source code of the reference website.
- No RSVP data is persisted by this starter.
- Check venue address, date, times, map pin, contact number and image permissions before sharing publicly.
