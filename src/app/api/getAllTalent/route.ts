import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME

if (!S3_BUCKET_NAME) {
  throw new Error('S3_BUCKET_NAME is not defined in environment variables')
}

export async function GET() {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT wallet_address, email, resume FROM users')
    client.release()

    const users = result.rows

    const images = users.map((user) => ({
      wallet: user.wallet_address,
      email: user.email,
      imageUrl: `dalle-images/${user.wallet_address}`,
      resumeExcerpt: user.resume.substring(0, 200) // First 200 characters of the resume
    }))

    return NextResponse.json({ success: true, data: images })
  } catch (error) {
    console.error('Error in getAllTalent:', error)
    return NextResponse.json({ success: false, error: 'Error fetching all talent' }, { status: 500 })
  }
}