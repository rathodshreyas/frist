# ResumeBiodata.in 🙏

**India's Free Marathi Biodata & Professional Resume Maker**

> Free HD PDF download • No registration • No watermarks

---

## 🚀 Deploy to Vercel (Step-by-Step)

### Step 1: Download & Extract
Download the ZIP and extract it to a folder on your computer.

### Step 2: Create GitHub Repository
```bash
# Navigate to project folder
cd resumebiodata-in

# Initialize git
git init
git add .
git commit -m "Initial commit: ResumeBiodata.in"

# Create repo on GitHub.com then:
git remote add origin https://github.com/YOUR_USERNAME/resumebiodata-in.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to **vercel.com** → Login with GitHub
2. Click **"New Project"**
3. Import your `resumebiodata-in` repository
4. Framework: **Next.js** (auto-detected)
5. Click **"Deploy"**

### Step 4: Add Environment Variables (Vercel Dashboard)
Go to: Project → Settings → Environment Variables

```
# Required
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# Google Analytics (get from analytics.google.com)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense (apply at adsense.google.com)
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_HEADER=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=2345678901
NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=3456789012
NEXT_PUBLIC_ADSENSE_SLOT_INLINE=4567890123

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# Razorpay (optional - for premium templates)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Step 5: Custom Domain
1. Vercel Dashboard → Project → Settings → Domains
2. Add `resumebiodata.in`
3. Update DNS records as shown by Vercel

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Install Chrome locally for Puppeteer (Linux)
sudo apt-get install google-chrome-stable

# Or on Mac:
# brew install --cask google-chrome

# Copy env file
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
# Open http://localhost:3000
```

---

## 📁 Project Structure

```
resumebiodata-in/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── download-biodata/   ← Biodata PDF generation
│   │   │   ├── download-resume/    ← Resume PDF generation
│   │   │   ├── create-order/       ← Razorpay order
│   │   │   └── verify-payment/     ← Payment verification
│   │   ├── biodata/                ← Biodata maker page
│   │   ├── resume/                 ← Resume builder page
│   │   ├── blog/                   ← Blog listing + posts
│   │   ├── about/
│   │   ├── contact/
│   │   ├── privacy-policy/
│   │   ├── terms/
│   │   ├── layout.tsx              ← Root layout + SEO
│   │   ├── page.tsx                ← Homepage
│   │   ├── sitemap.ts              ← Auto sitemap
│   │   └── robots.ts              ← robots.txt
│   ├── components/
│   │   ├── biodata/BiodataBuilder.tsx
│   │   ├── resume/ResumeBuilder.tsx
│   │   └── shared/                 ← Navbar, Footer, AdBanner
│   ├── lib/
│   │   ├── pdf-generator.ts        ← Puppeteer PDF engine
│   │   ├── biodata-templates.ts    ← HTML templates for biodata
│   │   └── resume-templates.ts     ← HTML templates for resume
│   ├── data/blog-posts.ts          ← Blog content
│   └── types/index.ts              ← TypeScript types
├── public/
├── vercel.json                     ← Vercel configuration
├── next.config.ts                  ← Next.js config
└── tailwind.config.ts              ← Tailwind theme
```

---

## 🎨 Adding Premium Templates

1. Create HTML template in `src/lib/biodata-templates.ts`
2. Add template ID to the `TEMPLATES` array in `BiodataBuilder.tsx`
3. Set `isPremium: true` and `price: 49`
4. Add Razorpay keys to unlock functionality

---

## 💰 Monetization Setup

### Google AdSense
1. Apply at **adsense.google.com**
2. Add your publisher ID to env: `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`
3. Create ad units and add slot IDs to env vars

### Razorpay (Premium Templates)
1. Create account at **razorpay.com**
2. Get API keys from Dashboard → Settings → API Keys
3. Add to Vercel environment variables

---

## ⚡ Vercel Puppeteer Tips

- `vercel.json` sets 60s timeout and 1024MB memory for PDF routes
- `@sparticuz/chromium` provides serverless Chromium binary
- `--single-process` flag is critical for Vercel's serverless environment
- Region `bom1` (Mumbai) = lowest latency for Indian users

---

Made with ❤️ in India | ResumeBiodata.in
