# Deployment Guide - Ab Paisa Hi Paisa Hoga

This guide will help you deploy your React + Vite application to production.

## 🚀 Quick Deploy Options

### Option 1: Deploy to Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   vercel
   ```
   Follow the prompts. For production deployment, run:
   ```bash
   vercel --prod
   ```

4. **Or use Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

**Vercel Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

### Option 2: Deploy to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Build your project**:
   ```bash
   npm run build
   ```

4. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

5. **Or use Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag and drop your `dist` folder, OR
   - Connect your Git repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

---

### Option 3: Deploy to GitHub Pages

1. **Install gh-pages package**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Update vite.config.js** to add base path:
   ```js
   export default defineConfig({
     base: '/abpaisahipaisahoga/', // Replace with your repo name
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Select source: `gh-pages` branch
   - Your site will be at: `https://yourusername.github.io/abpaisahipaisahoga/`

---

## 📋 Pre-Deployment Checklist

### 1. Build the Project Locally
```bash
npm install
npm run build
```

Test the build locally:
```bash
npm run preview
```

### 2. Environment Variables (Optional but Recommended)

Currently, Supabase keys are hardcoded. For better security, consider:

1. Create a `.env` file:
   ```
   VITE_SUPABASE_URL=https://bbzjpkynmsxwjvzpidwn.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

2. Update your code to use environment variables:
   ```js
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
   ```

3. Add `.env` to `.gitignore` (don't commit secrets!)

4. In your hosting platform, add these as environment variables in the dashboard.

### 3. Update Base URL (if needed)

If deploying to a subdirectory, update `vite.config.js`:
```js
export default defineConfig({
  base: '/your-subdirectory/',
  // ... rest
})
```

### 4. Test Production Build

Before deploying, always test:
```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to preview the production build.

---

## 🔧 Platform-Specific Configuration

### Vercel
- Automatically detects Vite
- No additional configuration needed
- Free SSL certificate
- Automatic deployments on Git push

### Netlify
- Create `netlify.toml` in root:
  ```toml
  [build]
    command = "npm run build"
    publish = "dist"
  
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

### GitHub Pages
- Requires base path configuration
- Free but slower than Vercel/Netlify
- Good for static sites

---

## 🌐 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS as instructed

---

## 📝 Post-Deployment

1. **Test all features** on the live site
2. **Check mobile responsiveness**
3. **Verify Supabase connections** work
4. **Test authentication** (login/signup)
5. **Monitor performance** using browser DevTools

---

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (should be 16+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript/ESLint errors

### 404 Errors on Routes
- Ensure your hosting platform is configured for SPA routing
- Add redirect rules (see Netlify example above)

### Supabase Connection Issues
- Verify environment variables are set correctly
- Check Supabase project is active
- Verify CORS settings in Supabase dashboard

---

## 🎉 Success!

Once deployed, your site will be live and accessible worldwide!

**Recommended:** Set up automatic deployments by connecting your Git repository to your hosting platform.










