# Bloomly website: hosting guide

The site is a static single-page app (Vite + React). Hosting it means building it and uploading the result.

## 1. Build

```bash
npm install
npm run build
```

This creates the `dist` folder. To look at the built site locally before uploading:

```bash
npm run preview
```

## 2. Upload to Hostinger

1. Open **hPanel > Files > File Manager** and go to `public_html`.
2. Delete the old site files there (keep anything unrelated to the website, such as mail folders).
3. Upload **the contents of `dist`**, not the `dist` folder itself. The quickest way is to upload `bloomly-website-upload.zip` (created from `dist`) and use **Extract** into `public_html`.
4. Check that `.htaccess` is in `public_html`. It is a hidden file, so turn on "show hidden files" if you don't see it. Without it, opening `bloomly.co.in/privacy-policy` directly gives a 404.

## 3. Check after upload

- `https://bloomly.co.in/` loads, and the logo intro plays once.
- `https://bloomly.co.in/privacy-policy` loads when opened directly.
- The partner logos, the hero photo and the fonts all load.
- "Write to us" and "Copy address" in the contact card use `operations@bloomly.co.in`.

If the old site still shows, clear the cache in **hPanel > Advanced > Cache Manager** and reload with Ctrl+F5.

## What the site contains

| Page | Address |
|---|---|
| Home (hero, Bloomly's Journey, mission, challenge and solution, how it works, partners, contact) | `/` |
| Privacy policy | `/privacy-policy` |
| Page not found | any other address |

Contact is by email only (`operations@bloomly.co.in`); there are no forms, so nothing needs configuring on the server.

## Where to change things

| To change | Edit |
|---|---|
| Contact email | `CONTACT_EMAIL` in `src/components/ContactSection.tsx` |
| Numbers in Bloomly's Journey | `src/components/Metrics.tsx` |
| Challenge and solution text | `src/components/AboutSection.tsx` |
| How-it-works diagram and steps | `src/components/FlowchartDiagram.tsx` |
| Partner logos | `partners` in `src/components/TrustedPartners.tsx` (image files in `public/`) |
| Page title and link-preview text | `index.html` |
| Colours and font | `tailwind.config.ts` |

After any change, build again and re-upload `dist`.
