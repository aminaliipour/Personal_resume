import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Use a distinct database file
const dbPath = path.join(process.cwd(), 'portfolio.db');

// Initialize database if it doesn't exist
if (!fs.existsSync(dbPath)) {
  // Create tables if database doesn't exist
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  
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
      items TEXT NOT NULL
    );
  `;
  
  db.exec(schema);
  db.close();
}

export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
