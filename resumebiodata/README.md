# ResumeBiodata.in 🙏

**India's Free Marathi Biodata & Professional Resume Maker**

Create beautiful Marathi marriage biodatas with Ganpati designs and ATS-friendly professional resumes. Instant HD PDF download — no registration required.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Frontend & API |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Puppeteer Core + Chromium | PDF Generation |
| MongoDB (optional) | Data persistence |
| Razorpay | Payment integration |
| Vercel | Deployment |
| Google AdSense | Monetization |
| Google Analytics | Analytics |

---

## 📁 Project Structure

```
resumebiodata/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout + SEO meta
│   │   ├── page.tsx                # Homepage
│   │   ├── globals.css             # Global styles
│   │   ├── sitemap.ts              # Dynamic sitemap
│   │   ├── robots.ts               # Robots.txt
│   │   ├── biodata/
│   │   │   └── page.tsx            # Biodata maker page
│   │   ├── resume/
│   │   │   └── page.tsx            # Resume builder page
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing
│   │   │   └── [slug]/page.tsx     # Blog post
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── api/
│   │       ├── download-biodata/route.ts   # PDF API
│   │       ├── download-resume/route.ts    # PDF API
│   │       ├── create-order/route.ts       # Razorpay
│   │       └── verify-payment/route.ts     # Razorpay verify
│   ├── components/
│   │   ├── shared/
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── ad-banner.tsx       # AdSense component
│   │   │   ├── structured-data.tsx # JSON-LD
│   │   │   └── theme-provider.tsx
│   │   ├── biodata/
│   │   │   └── biodata-builder.tsx # Full biodata form
│   │   └── resume/
│   │       └── resume-builder.tsx  # Resume form
│   ├── lib/
│   │   ├── biodata-template.ts     # Biodata HTML template
│   │   ├── resume-template.ts      # Resume HTML template
│   │   ├── pdf-generator.ts        # Puppeteer utility
│   │   └── db.ts                   # MongoDB connection
│   └── types/
│       └── index.ts                # TypeScript types
├── public/
│   └── patterns/                   # SVG patterns
├── .env.example                    # Env variables template
├── vercel.json                     # Vercel config
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🛠️ Setup & Installation

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/resumebiodata-in.git
cd resumebiodata-in
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Install Chromium (for local PDF generation)

```bash
# Linux
sudo apt-get install chromium-browser

# macOS
brew install --cask google-chrome

# Windows
# Install Chrome from google.com/chrome
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment to Vercel

### One-click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/resumebiodata-in)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_GA_ID
vercel env add NEXT_PUBLIC_ADSENSE_ID
vercel env add RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
vercel env add MONGODB_URI

# Deploy to production
vercel --prod
```

### Vercel Dashboard Settings

- **Framework**: Next.js
- **Region**: bom1 (Mumbai) for India
- **Node.js Version**: 20.x
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

---

## 💰 Monetization Setup

### Google AdSense
1. Apply at [adsense.google.com](https://adsense.google.com)
2. Add your Publisher ID to `NEXT_PUBLIC_ADSENSE_ID`
3. Ad slots are pre-configured in the code

### Razorpay (Premium Templates)
1. Create account at [razorpay.com](https://razorpay.com)
2. Get API keys from Dashboard → Settings → API Keys
3. Add to environment variables
4. Premium templates cost ₹49 one-time

---

## 📊 SEO Features

- ✅ Dynamic sitemap.xml
- ✅ Robots.txt
- ✅ JSON-LD structured data
- ✅ OpenGraph meta tags
- ✅ Twitter card meta
- ✅ Canonical URLs
- ✅ Multi-language support (en-IN, mr-IN)
- ✅ Mobile-first design
- ✅ Core Web Vitals optimized
- ✅ Blog with SEO-rich content

---

## 🎨 Features

### Biodata Maker
- Traditional Ganpati header
- Devanagari/Marathi font support
- Photo upload with auto-crop
- Live mini preview
- 4 templates (2 free, 2 premium)
- A4 PDF with proper margins
- No watermarks

### Resume Builder  
- 4 templates (2 free, 2 premium)
- ATS-optimized formatting
- All standard sections
- Skills tag system
- Live form with tabs
- Professional A4 PDF

### Blog
- 6+ articles
- Category filtering
- SEO-optimized
- Article schema markup
- AdSense integrated

---

## 🔒 Privacy & AdSense Compliance

- No personal data stored permanently
- HTTPS only
- Privacy Policy page included
- Terms & Conditions included
- No copyrighted content
- No spammy ads
- Mobile-responsive ads
- Fast Core Web Vitals scores

---

## 📱 Performance Optimization

- Next.js App Router for optimal caching
- Image optimization with next/image
- Font preloading
- CSS variables for theming
- Minimal JavaScript bundle
- Static generation where possible

---

## 🤝 Contributing

PRs welcome! Please open an issue first to discuss major changes.

---

## 📄 License

MIT License - see LICENSE file for details.

---

**Made with ❤️ in India | ResumeBiodata.in**
