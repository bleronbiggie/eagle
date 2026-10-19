# Calgary Craft website

Premium React, TypeScript and Vite website for a Calgary construction and renovation company.

## Local development

```sh
npm install
npm run dev
npm run build
```

The company details are centralized in `src/data/company.ts`. Replace the bracketed values and add real project photography to the entries in `src/data/projects.ts` before using the website for a real company. Current portfolio images are marked concept photography.

The estimate form validates and previews requests locally. `src/services/contactService.ts` is the integration boundary for an email API, CRM, or form service; it intentionally does not transmit or store visitor information.
