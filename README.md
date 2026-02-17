
# Soraa Deployment Guide (Surge.sh)

This application is fully optimized for deployment on Surge.sh. Follow these steps for a successful launch.

## 1. Prepare for Deployment
Install the Surge CLI if you haven't already:
```bash
npm install -g surge
```

## 2. The 200.html Trick (Critical)
Surge is a static host. To support the React routing system (SPA), Surge needs to know that any URL path should serve the same application. 

Copy your `index.html` to a new file called `200.html`:
```bash
cp index.html 200.html
```
*Note: We use HashRouter, so it works even without this, but 200.html is best practice.*

## 3. Launch to Production
Run the surge command from your project root:
```bash
surge . soraa-deployment.surge.sh
```

## 4. Supabase Configuration
Don't forget to update `services/supabase.ts` with your actual project URL and API key if you want the login/database features to work. The demo mode works perfectly without it!
