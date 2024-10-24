import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

export async function GET() {
  try {
    const query = 'SELECT wallet_address FROM users';
    const result = await pool.query(query);
    
    const wallets = result.rows.map(row => row.wallet_address);
    
    return NextResponse.json({ success: true, data: wallets });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, error: 'Error fetching users' }, { status: 500 });
  }
}