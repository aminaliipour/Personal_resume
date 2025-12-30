# استفاده از Node.js 20
FROM node:20-alpine

# نصب build dependencies برای better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

# کپی package files
COPY package*.json ./

# نصب dependencies
RUN npm ci

# کپی بقیه فایل‌ها
COPY . .

# Build
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]

