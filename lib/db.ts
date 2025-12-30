import Database from 'better-sqlite3';
import path from 'path';

// Use a distinct database file
const dbPath = path.join(process.cwd(), 'portfolio.db');

export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
