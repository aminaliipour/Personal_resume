import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const profile = db.prepare('SELECT * FROM profile LIMIT 1').get();
  const experience = db.prepare('SELECT * FROM experience').all();
  const education = db.prepare('SELECT * FROM education').all();
  const skills = db.prepare('SELECT * FROM skills').all();

  return NextResponse.json({
    profile,
    experience,
    education,
    skills,
  });
}

export async function POST(request: Request) {
  // Check auth
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { type, data, action, id } = body;

  try {
    if (type === 'profile') {
      const stmt = db.prepare(`
        UPDATE profile 
        SET name=?, title=?, email=?, phone=?, github=?, address=?, summary=?, image=? 
        WHERE id = (SELECT id FROM profile LIMIT 1)
      `);
      stmt.run(data.name, data.title, data.email, data.phone, data.github, data.address, data.summary, data.image);
    } 
    else if (['experience', 'education', 'skills'].includes(type)) {
      if (action === 'delete') {
         db.prepare(`DELETE FROM ${type} WHERE id = ?`).run(id);
      } else if (action === 'update') {
         // This assumes data keys match column names. Simplified for this task.
         const keys = Object.keys(data);
         const setString = keys.map(k => `${k}=?`).join(', ');
         const values = keys.map(k => data[k]);
         db.prepare(`UPDATE ${type} SET ${setString} WHERE id = ?`).run(...values, id);
      } else if (action === 'create') {
         const keys = Object.keys(data);
         const placeholders = keys.map(() => '?').join(', ');
         const values = keys.map(k => data[k]);
         db.prepare(`INSERT INTO ${type} (${keys.join(', ')}) VALUES (${placeholders})`).run(...values);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
