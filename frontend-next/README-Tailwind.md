Tailwind setup notes

After adding Tailwind dependencies, run:

```bash
npm install
npx tailwindcss init -p
```

We added `tailwind.config.js` and `postcss.config.js` already. If `npm install` was already run earlier, ensure `tailwindcss`, `postcss`, and `autoprefixer` are installed in `node_modules`.

Restart the dev server after install:

```bash
npm run dev
```
```