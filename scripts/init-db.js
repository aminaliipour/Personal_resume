const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'portfolio', 'portfolio.db');
const dbDir = path.dirname(dbPath);

// Ensure directory exists (though it should be root)
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Check if we are running from root or portfolio dir
let finalDbPath = 'portfolio.db';
if (fs.existsSync(path.join(process.cwd(), 'portfolio'))) {
   finalDbPath = path.join(process.cwd(), 'portfolio', 'portfolio.db');
} else if (path.basename(process.cwd()) === 'portfolio') {
   finalDbPath = 'portfolio.db';
}

console.log(`Initializing DB at: ${finalDbPath}`);
const db = new Database(finalDbPath);

// Create Tables
const schema = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    github TEXT,
    address TEXT,
    summary TEXT,
    image TEXT
);

CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    duration TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    degree TEXT NOT NULL,
    university TEXT NOT NULL,
    year TEXT,
    details TEXT
);

CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    items TEXT NOT NULL -- JSON string or comma separated
);
`;

db.exec(schema);
console.log('Database initialized successfully.');
