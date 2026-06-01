# max travels — Next.js 15

Pixel-inspired travels of the [max Django demo](https://django-max.mnsithub.com/index/) built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Embla Carousel
- Framer Motion (available for extensions)
- Lucide icons
- Google Fonts (Poppins) with SF Pro Text system font fallback

## Getting started

```bash
cd /Users/guna/Max-travels-cursor
npm install
npm run dev    # http://localhost:3000
npm run build  # verified ✓
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                 # Routes, layout, global styles
components/
  layout/            # Header, Footer, Sidebar, shell
  sections/          # Homepage sections
  ui/                # Button, Carousel, SectionTitle, etc.
lib/
  constants.ts       # Site metadata & contact
  data.ts            # Placeholder content (no copyrighted copy)
public/              # Static assets
```

## Design tokens

| Token | Value |
|-------|--------|
| Primary | `#FFB51D` |
| Text | `#131222` |
| Muted | `#868689` |
| Headings | Poppins Old / Poppins 800 Italic |
| Subheadings | SF Pro Text 600 |
| Paragraph | SF Pro Text 400 |
| Container | 1320px max |

## Notes

- Images use Unsplash placeholders (not copied from the demo).
- Copy is original placeholder text with similar structure.
- Forms are UI-only (wire to your API as needed).

## Build

```bash
npm run build
npm start
```
