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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userWallet = searchParams.get('wallet');

  if (!userWallet) {
    return NextResponse.json({ success: false, error: 'Wallet address is required' }, { status: 400 });
  }

  try {
    const query = `
      SELECT email, career_field, resume
      FROM users
      WHERE wallet_address = $1
    `;
    const result = await pool.query(query, [userWallet]);

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ success: false, error: 'Error fetching user data' }, { status: 500 });
  }
}