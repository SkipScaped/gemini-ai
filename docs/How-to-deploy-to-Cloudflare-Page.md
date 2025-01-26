### How to deploy your project to Cloudflare Pages

1. Log in to the Cloudflare dashboard and select your account.
2. Select Compute(Workers) > Create > Pages.
3. Click Connect to Git > gemini-next-chat > Begin Setup
4. Framework preset > Next.js > Set Environment Variables > Save and Deploy
5. Settings > Runtime > Compatibility Flags > Fill in `nodejs_compat` > Save
6. Deploy > Redeploy

### Set a custom domain name (optional)

Since the `pages.dev` domain name cannot be accessed normally in some countries, you can solve this problem by setting a custom domain name.

1. Select Compute(Workers) > Your project.
2. Select Custom Domains > Set up a custom domain.
