# 🚀 راهنمای کامل Deploy روی Railway (رایگان)

## Railway چیه؟
Railway یک پلتفرم رایگان برای deploy کردن برنامه‌های Node.js است که:
- ✅ **رایگان** است (تا 500 ساعت در ماه)
- ✅ **SQLite** را به خوبی پشتیبانی می‌کند
- ✅ Deploy از **GitHub** خیلی ساده است
- ✅ **Environment Variables** راحت تنظیم می‌شود

---

## 📝 مراحل Deploy:

### مرحله 1: آپلود پروژه روی GitHub

1. اگر هنوز GitHub repo ندارید:
   - به [github.com](https://github.com) بروید و ثبت‌نام کنید
   - New Repository بسازید
   - پروژه را push کنید:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### مرحله 2: ثبت‌نام در Railway

1. به [railway.app](https://railway.app) بروید
2. روی **"Login"** یا **"Start a New Project"** کلیک کنید
3. **"Login with GitHub"** را انتخاب کنید
4. اجازه دسترسی به GitHub را بدهید

### مرحله 3: ایجاد Project جدید

1. روی **"+ New Project"** کلیک کنید
2. **"Deploy from GitHub repo"** را انتخاب کنید
3. Repository خود را انتخاب کنید
4. Railway شروع به deploy کردن می‌کند (این کار چند دقیقه طول می‌کند)

### مرحله 4: تنظیم Environment Variables

1. روی پروژه کلیک کنید
2. به تب **"Variables"** بروید
3. روی **"+ New Variable"** کلیک کنید
4. این متغیرها را اضافه کنید:

```
JWT_SECRET=یک-رشته-تصادفی-و-قوی-برای-امنیت-تولید-شده
NODE_ENV=production
```

**تولید JWT_SECRET:**
می‌توانید در ترمینال محلی خود این دستور را اجرا کنید:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
یک رشته تصادفی تولید می‌شود، آن را کپی کرده و به عنوان `JWT_SECRET` قرار دهید.

### مرحله 5: Initialize کردن دیتابیس

1. در Railway، روی پروژه کلیک کنید
2. به تب **"Settings"** بروید
3. به پایین بروید و **"Connect via Railway CLI"** را پیدا کنید
4. یا از طریق **"View Logs"** → **"Deploy Logs"** می‌توانید shell دسترسی پیدا کنید

**یا می‌توانید از Railway Dashboard:**
1. روی پروژه کلیک کنید
2. تب **"Deployments"** را باز کنید
3. روی آخرین deployment کلیک کنید
4. به **"Logs"** بروید
5. یک terminal/console برای اجرای دستورات باز کنید

**دستورات برای initialize دیتابیس:**
```bash
node scripts/init-db.js
node scripts/seed-db.js
```

### مرحله 6: دریافت URL سایت

1. در Railway Dashboard، روی پروژه کلیک کنید
2. به تب **"Settings"** بروید
3. به بخش **"Domains"** بروید
4. Railway یک domain رایگان به شما می‌دهد (مثلاً: `your-app.up.railway.app`)
5. یا می‌توانید domain خود را اضافه کنید

---

## ✅ چک‌لیست پس از Deploy:

- [ ] سایت باز می‌شود؟ (URL را در مرورگر امتحان کنید)
- [ ] صفحه اصلی نمایش داده می‌شود؟
- [ ] به `/admin` می‌روید و صفحه login نمایش داده می‌شود؟
- [ ] با `admin` / `admin123` وارد می‌شوید؟
- [ ] پنل ادمین کار می‌کند؟
- [ ] تصاویر نمایش داده می‌شوند؟

---

## 🔧 تنظیمات اضافی (اختیاری):

### اضافه کردن Domain شخصی:

1. در Railway → Settings → Domains
2. روی **"+ Custom Domain"** کلیک کنید
3. Domain خود را وارد کنید (مثلاً: `portfolio.yourdomain.com`)
4. DNS records را طبق دستورات Railway تنظیم کنید

### تغییر رمز عبور ادمین:

بعد از deploy، حتماً رمز عبور `admin123` را تغییر دهید. می‌توانید:
- از طریق پنل ادمین (اگر قابلیت تغییر رمز اضافه شود)
- یا مستقیماً در دیتابیس تغییر دهید

---

## 🆘 حل مشکلات:

### مشکل: Build خطا می‌دهد
**راه حل:** 
- لاگ‌ها را در Railway → Deployments → Logs بررسی کنید
- مطمئن شوید همه dependencies درست نصب شده‌اند

### مشکل: دیتابیس کار نمی‌کند
**راه حل:**
- مطمئن شوید `scripts/init-db.js` و `scripts/seed-db.js` اجرا شده‌اند
- بررسی کنید که فایل دیتابیس permission درست دارد

### مشکل: سایت خطا 500 می‌دهد
**راه حل:**
- Environment Variables را چک کنید (بخصوص `JWT_SECRET`)
- لاگ‌ها را در Railway بررسی کنید
- مطمئن شوید دیتابیس initialize شده است

---

## 💰 هزینه:

- **رایگان:** تا 500 ساعت در ماه + $5 اعتبار رایگان
- برای شروع کاملاً کافی است!
- اگر بیشتر از این نیاز دارید، می‌توانید به پلن پولی بروید

---

**موفق باشید! 🎉**



