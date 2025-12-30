This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## راهنمای راه‌اندازی (Persian Guide)

### پیش‌نیازها
- Node.js (نسخه 18 یا بالاتر)
- npm یا yarn یا pnpm

### مراحل راه‌اندازی

1. **نصب وابستگی‌ها (Dependencies)**
   ```bash
   npm install
   ```

2. **اجرای سرور توسعه (Development Server)**
   ```bash
   npm run dev
   ```

3. **باز کردن مرورگر**
   - آدرس: [http://localhost:3000](http://localhost:3000)
   - صفحه اصلی پورتفولیو نمایش داده می‌شود
   - برای دسترسی به پنل ادمین: [http://localhost:3000/admin](http://localhost:3000/admin)
   - برای ورود به سیستم: [http://localhost:3000/login](http://localhost:3000/login)

### دستورات مفید دیگر

- **ساخت نسخه Production:**
  ```bash
  npm run build
  ```

- **اجرای نسخه Production:**
  ```bash
  npm run start
  ```

- **بررسی خطاهای کد:**
  ```bash
  npm run lint
  ```

---

## Getting Started (English)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 راهنمای Deploy روی هاست (Deployment Guide)

### ⚠️ نکات مهم قبل از Deploy:

1. **دیتابیس SQLite**: این پروژه از SQLite استفاده می‌کند که برای production محدودیت‌هایی دارد
2. **متغیرهای محیطی**: باید `JWT_SECRET` را در production تنظیم کنید
3. **فایل دیتابیس**: دیتابیس (`portfolio.db`) باید در هاست قابل نوشتن باشد

---

### 📋 گزینه‌های Deploy:

#### 1️⃣ **Vercel** (پیشنهاد شده - رایگان)
```bash
# نصب Vercel CLI
npm i -g vercel

# Deploy
vercel

# یا از طریق GitHub:
# 1. پروژه را روی GitHub آپلود کنید
# 2. به vercel.com بروید و GitHub را connect کنید
# 3. پروژه را import کنید
```
⚠️ **محدودیت**: Vercel serverless است و SQLite ممکن است کار نکند. برای Vercel بهتر است از PostgreSQL استفاده کنید.

#### 2️⃣ **Railway** (پیشنهاد شده برای SQLite - رایگان)
```bash
# 1. به railway.app بروید و ثبت‌نام کنید
# 2. New Project > Deploy from GitHub repo
# 3. Environment Variables اضافه کنید:
#    JWT_SECRET=your-random-secret-key
# 4. Build Command: npm run build
# 5. Start Command: npm start
```

#### 3️⃣ **Render** (رایگان با محدودیت)
```bash
# 1. به render.com بروید
# 2. New Web Service
# 3. GitHub repo را connect کنید
# 4. Build Command: npm run build
# 5. Start Command: npm start
# 6. Environment Variables:
#    JWT_SECRET=your-random-secret-key
```

#### 4️⃣ **DigitalOcean App Platform** یا **Heroku**
- نیاز به تنظیمات مشابه دارد
- برای SQLite مناسب‌تر از Vercel هستند

#### 5️⃣ **VPS (سرور اختصاصی)**
```bash
# روی سرور خود:
git clone [your-repo-url]
cd portfolio
npm install
npm run build

# استفاده از PM2 برای مدیریت پروسه:
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

---

### 🔧 تنظیمات لازم قبل از Deploy:

1. **ایجاد فایل `.env` یا تنظیم Environment Variables**:
   ```
   JWT_SECRET=یک-رشته-تصادفی-و-پیچیده-برای-امنیت
   NODE_ENV=production
   ```

2. **مطمئن شوید دیتابیس درست کار می‌کند**:
   ```bash
   # دیتابیس باید در production ساخته شود
   node scripts/init-db.js
   node scripts/seed-db.js
   ```

3. **Build کردن پروژه**:
   ```bash
   npm run build
   ```

---

### 🔒 نکات امنیتی:

- ✅ `JWT_SECRET` را **هرگز** در کد قرار ندهید
- ✅ از رمزهای قوی برای production استفاده کنید
- ✅ رمز عبور ادمین (`admin123`) را در production تغییر دهید
- ✅ HTTPS فعال کنید

---

### 📝 پس از Deploy:

1. به آدرس سایت بروید و مطمئن شوید کار می‌کند
2. به `/admin` بروید و وارد شوید
3. اطلاعات را بررسی و به‌روزرسانی کنید
4. تصاویر را در `public/images` آپلود کنید

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

⚠️ **Note**: This app uses SQLite which may not work on Vercel's serverless platform. Consider using Railway, Render, or a VPS instead.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
