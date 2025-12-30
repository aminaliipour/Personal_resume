# 🚀 راهنمای کامل Deploy پروژه Portfolio

## ✅ بله، می‌توانید این پروژه را روی هاست اجرا کنید!

این پروژه یک Next.js application است که می‌تواند روی پلتفرم‌های مختلف deploy شود.

---

## 📌 بهترین گزینه‌ها برای Deploy:

### 1. **Railway** (پیشنهاد اول - رایگان و مناسب SQLite) ⭐

**چرا Railway؟**
- پشتیبانی کامل از SQLite
- رایگان برای شروع
- Deploy ساده از GitHub
- Environment Variables راحت

**مراحل:**
1. به [railway.app](https://railway.app) بروید و ثبت‌نام کنید
2. New Project > Deploy from GitHub repo
3. Repository خود را انتخاب کنید
4. در Variables tab، اضافه کنید:
   ```
   JWT_SECRET=یک-رشته-تصادفی-قوی
   NODE_ENV=production
   ```
5. Build Command: `npm run build`
6. Start Command: `npm start`
7. دیتابیس را initialize کنید (از طریق Railway shell):
   ```bash
   node scripts/init-db.js
   node scripts/seed-db.js
   ```

---

### 2. **Render** (گزینه دوم - رایگان) ⭐

**مراحل:**
1. به [render.com](https://render.com) بروید
2. New > Web Service
3. GitHub repo را connect کنید
4. تنظیمات:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Environment:** `Node`
5. Environment Variables:
   ```
   JWT_SECRET=یک-رشته-تصادفی-قوی
   NODE_ENV=production
   ```

---

### 3. **Vercel** (برای Next.js عالی است، اما SQLite مشکل دارد) ⚠️

**مشکل:** Vercel serverless است و SQLite فایل‌محور، ممکن است درست کار نکند.

**اگر از Vercel استفاده می‌کنید:**
- باید دیتابیس را به PostgreSQL یا MySQL تغییر دهید
- یا از Vercel Postgres استفاده کنید

---

### 4. **VPS (سرور اختصاصی)** - برای کنترل بیشتر

اگر VPS دارید (مثلاً از DigitalOcean، Hetzner، و...):

```bash
# 1. اتصال به سرور
ssh user@your-server-ip

# 2. نصب Node.js (اگر نیست)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clone کردن پروژه
git clone [your-repo-url]
cd portfolio

# 4. نصب dependencies
npm install

# 5. ایجاد فایل .env
nano .env
# محتوا:
# JWT_SECRET=your-secret-key
# NODE_ENV=production

# 6. Initialize دیتابیس
node scripts/init-db.js
node scripts/seed-db.js

# 7. Build
npm run build

# 8. نصب PM2 (برای مدیریت process)
sudo npm install -g pm2

# 9. اجرای پروژه
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup

# 10. تنظیم Nginx (اختیاری برای reverse proxy)
# ...
```

---

## 🔧 تنظیمات لازم قبل از Deploy:

### 1. تغییر JWT_SECRET
در production باید یک JWT_SECRET قوی تنظیم کنید:
```bash
# می‌توانید یک secret تصادفی تولید کنید:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. تغییر رمز عبور ادمین
در production رمز `admin123` را تغییر دهید.

### 3. مطمئن شوید فایل‌های تصویر درست هستند
- تصاویر باید در `public/images/` باشند
- مسیر در دیتابیس: `/images/filename.png`

---

## ✅ چک‌لیست پس از Deploy:

- [ ] سایت باز می‌شود؟
- [ ] صفحه `/admin` کار می‌کند؟
- [ ] می‌توانید با username/password وارد شوید؟
- [ ] تصاویر نمایش داده می‌شوند؟
- [ ] می‌توانید اطلاعات را ویرایش کنید؟

---

## 🆘 حل مشکلات رایج:

### مشکل: دیتابیس کار نمی‌کند
**راه حل:** 
- مطمئن شوید `scripts/init-db.js` و `scripts/seed-db.js` اجرا شده‌اند
- بررسی کنید permission فایل دیتابیس درست است

### مشکل: تصاویر نمایش داده نمی‌شوند
**راه حل:**
- مطمئن شوید فایل‌ها در `public/images/` هستند
- مسیر در دیتابیس باید `/images/filename.png` باشد

### مشکل: خطای JWT
**راه حل:**
- `JWT_SECRET` را در Environment Variables تنظیم کنید
- مطمئن شوید `NODE_ENV=production` است

---

## 📞 پشتیبانی

اگر مشکلی پیش آمد، لاگ‌ها را بررسی کنید:
- در Railway: Logs tab
- در Render: Logs section
- در VPS: `pm2 logs portfolio`

---

**موفق باشید! 🎉**



