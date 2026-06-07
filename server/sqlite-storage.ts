import { type User, type InsertUser, type Contact, type InsertContact } from "@shared/schema";
import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';
import path from 'path';
import fs from 'fs';

interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact & { type?: string }): Promise<Contact>;
  getAllContacts(type?: string): Promise<Contact[]>;
}

export interface DatabaseContact extends Omit<Contact, 'data' | 'createdAt'> {
  data: string | null;
  createdAt: string;
}

export interface DatabaseUser extends Omit<User, 'createdAt'> {
  createdAt: string;
}

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log(`Created data directory: ${dataDir}`);
  } catch (err) {
    console.error('FATAL: Could not create data directory:', err);
    process.exit(1);
  }
}

const dbPath = path.join(dataDir, 'glider.db');
console.log(`Using database: ${dbPath}`);

// Initialize database
const db = new Database(dbPath);
db.pragma('journal_mode = WAL'); // Better concurrency

// Create tables if they don't exist
try {
  db.exec(`
    BEGIN;
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL DEFAULT 'contact',
      name TEXT,
      email TEXT NOT NULL,
      message TEXT,
      data TEXT,
      createdAt TEXT NOT NULL
    );
    
    -- Add type column if it doesn't exist (for existing databases)
    PRAGMA table_info(contacts);
    CREATE TEMP TABLE temp_contacts AS SELECT * FROM contacts;
    DROP TABLE contacts;
    CREATE TABLE contacts (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL DEFAULT 'contact',
      name TEXT,
      email TEXT NOT NULL,
      message TEXT,
      data TEXT,
      createdAt TEXT NOT NULL
    );
    INSERT INTO contacts SELECT id, 'contact', name, email, message, data, createdAt FROM temp_contacts;
    DROP TABLE temp_contacts;
    COMMIT;
  `);
  console.log('Database tables verified/created');
} catch (err) {
  console.error('Error initializing database:', err);
  throw err;
}

export class SQLiteStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      email: (insertUser as any).email || '',
      createdAt: new Date(),
    };
    
    db.prepare(
      'INSERT INTO users (id, username, email, password, createdAt) VALUES (?, ?, ?, ?, ?)'
    ).run(
      user.id,
      user.username,
      user.email,
      user.password,
      user.createdAt.toISOString()
    );
    
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const now = new Date();
    
    try {
      const stmt = db.prepare(
        'INSERT INTO contacts (id, name, email, message, data, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
      );
      
      stmt.run(
        id,
        insertContact.name || null,
        insertContact.email,
        insertContact.message || null,
        insertContact.data ? JSON.stringify(insertContact.data) : null,
        now.toISOString()
      );
      
      // Return the created contact
      const result = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id);
      if (!result) {
        throw new Error('Failed to retrieve created contact');
      }
      
      return {
        id: result.id,
        name: result.name || undefined,
        email: result.email,
        message: result.message || undefined,
        data: result.data ? JSON.parse(result.data) : undefined,
        createdAt: new Date(result.createdAt)
      };
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  async getAllContacts(): Promise<Contact[]> {
    try {
      console.log('Fetching all contacts from database...');
      const contacts = db.prepare('SELECT * FROM contacts ORDER BY createdAt DESC').all() as any[];
      console.log(`Found ${contacts.length} contacts in database`);
      
      return contacts.map(contact => ({
        id: contact.id,
        name: contact.name || undefined,
        email: contact.email,
        message: contact.message || undefined,
        data: contact.data ? JSON.parse(contact.data) : undefined,
        createdAt: new Date(contact.createdAt)
      }));
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const sqliteStorage = new SQLiteStorage();
