import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import AWS from 'aws-sdk';

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port:  5432,
  ssl: { rejectUnauthorized: false }
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function GET() {
  try {
    const dbQuery = `
      SELECT wallet_address, email, resume
      FROM users
    `;
    const result = await pool.query(dbQuery);

    const imagePromises = result.rows.map(async (user) => {
      const params = {
        Bucket: 'anothercoolpic',
        Key: `dalle-images/${user.wallet_address}`,
      };

      try {
        const imageUrl = await s3.getSignedUrlPromise('getObject', params);
        return { 
          wallet: user.wallet_address, 
          email: user.email, 
          imageUrl,
          resumeExcerpt: user.resume.substring(0, 200) // First 200 characters of the resume
        };
      } catch (error) {
        console.error(`Error fetching image for wallet ${user.wallet_address}:`, error);
        return { 
          wallet: user.wallet_address, 
          email: user.email, 
          imageUrl: null,
          resumeExcerpt: user.resume.substring(0, 200)
        };
      }
    });

    const images = await Promise.all(imagePromises);

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error('Error in getAllTalent:', error);
    return NextResponse.json({ success: false, error: 'Error fetching all talent' }, { status: 500 });
  }
}