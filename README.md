# Nick — Official Artist Site

The website for Nick. Built with Next.js, TypeScript, and Tailwind CSS.
Hosted on Vercel. Payments through Stripe.

---

## Running the site on your own computer

You only need to do steps 1 and 2 **once**. After that, step 3 is the only
command you run each time.

### Step 1 — Install Node.js (one time)

1. Go to **https://nodejs.org**
2. Download the **LTS** version for Windows.
3. Run the installer and click Next through every screen. No settings to change.
4. Restart your computer if the installer asks you to.

### Step 2 — Install this project's dependencies (one time)

1. Open the folder `Desktop\Nick\Claude\nick-site` in File Explorer.
2. Click the address bar at the top, type `cmd`, and press Enter.
   A black terminal window opens, already pointed at this folder.
3. Type this and press Enter:

   ```
   npm install
   ```

4. Wait. It takes 1–3 minutes and prints a lot of text. When you get your
   cursor back, it is done.

> **Why this is needed:** the code depends on hundreds of small libraries.
> They are not stored in this folder (there are far too many files) and some of
> them are built specifically for your operating system, so they have to be
> downloaded on the machine that actually runs the site.

### Step 3 — Start the site

In that same terminal window:

```
npm run dev
```

Then open **http://localhost:3000** in your browser.

To stop the site, click the terminal window and press `Ctrl + C`.

---

## Changing the site's content

**You almost never need to touch the code.** Everything a visitor reads — the
name, tagline, bio, links, releases, product names and prices — lives in one
file:

```
src/content/site.ts
```

Open it in Notepad or VS Code. It is heavily commented and tells you exactly
what each value does and what format it needs. Save the file and the site
updates instantly in your browser.

Images go in the `public/images/` folder.

---

## Project map

| Path | What it is |
|---|---|
| `src/content/site.ts` | **All site content.** The file you edit. |
| `src/app/` | The pages. One folder per page. |
| `src/components/` | Reusable pieces — buttons, cards, header, footer. |
| `public/images/` | Photos and artwork. |
| `.env.local` | Your secret keys. **Never uploaded anywhere.** |
| `.env.example` | Blank template showing which keys are needed. |
| `PROGRESS.md` | What is built and what is next. |
| `SETUP-TASKS.md` | Accounts and keys you need to set up. |

---

## Security

- `.env.local` contains real secret keys and is excluded from Git. It never
  reaches GitHub through the code — Vercel gets its own copy of the keys,
  pasted directly into the Vercel dashboard.
- Never paste a key starting with `sk_` into a chat, an email, or any public
  place. If one ever leaks, roll it in the Stripe Dashboard immediately.
- Keys starting with `pk_` and product IDs starting with `price_` are **not**
  secret and are safe to share.

---

## Commands

| Command | What it does |
|---|---|
| `npm install` | Downloads dependencies. Run once, and again after pulling changes. |
| `npm run dev` | Runs the site locally at http://localhost:3000 |
| `npm run build` | Makes the production version. Catches errors before deploying. |
| `npm run lint` | Checks code quality. |
