import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import { Pool } from 'pg';

// Initialize the S3 client with environment variables
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Initialize the PostgreSQL pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
  ssl: { rejectUnauthorized: false }
});

export async function GET() {
  try {
    // Fetch all user wallets and emails directly from the database
    const query = 'SELECT wallet_address, email FROM users';
    const result = await pool.query(query);
    const users = result.rows.map(row => ({ wallet: row.wallet_address, email: row.email }));

    // Fetch images for each wallet
    const imagePromises = users.map(async (user) => {
      const params = {
        Bucket: 'anothercoolpic',
        Key: `dalle-images/${user.wallet}`,
      };

      try {
        const imageUrl = await s3.getSignedUrlPromise('getObject', params);
        return { ...user, imageUrl };
      } catch (error) {
        console.error(`Error fetching image for wallet ${user.wallet}:`, error);
        return { ...user, imageUrl: null };
      }
    });

    const images = await Promise.all(imagePromises);

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error('Error in talentVault:', error);
    return NextResponse.json({ success: false, error: 'Error fetching talent vault' }, { status: 500 });
  }
}