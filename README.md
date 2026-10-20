# Calgary Craft website

Premium React, TypeScript and Vite website for a Calgary construction and renovation company.

## Local development

```sh
npm install
npm run dev
npm run build
```

The company details are centralized in `src/data/company.ts`. Replace the bracketed values and add real project photography to the entries in `src/data/projects.ts` before using the website for a real company. Current portfolio images are marked concept photography.

## Estimate request email

The contact form sends submitted project details to `bleronbiggie@gmail.com` through the Vercel Function in `api/estimate.js`. Each email includes a `.txt` request document and any attached project photos. Photos are compressed in the visitor's browser before upload.

To enable delivery on Vercel:

1. Create a Resend account using `bleronbiggie@gmail.com` and create an API key with permission to send email.
2. In Vercel, open the `eagle` project, then **Settings → Environment Variables**.
3. Add `RESEND_API_KEY` with the API key value. Select **Production** (and **Preview** if you want preview deployments to send email too), then save.
4. Redeploy the latest deployment so the function receives the new environment variable.
5. Submit a test estimate from the deployed website and check the inbox and spam folder.

Keep the API key in Vercel's environment variables. Do not put it in frontend code, a `VITE_` variable, or a committed file. The function uses Resend's shared test sender; the Resend account should use the same inbox as the recipient. To send from a custom company address or to other recipients, verify a domain in Resend and update the sender in `api/estimate.js`.

The regular Vite development server (`npm run dev`) only serves the frontend and does not run Vercel Functions. Use the deployed Vercel site to test delivery, or use the Vercel CLI with the project linked and `RESEND_API_KEY` configured for local function testing.
