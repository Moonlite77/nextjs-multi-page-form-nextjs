import { NextResponse } from 'next/server'
import { Pool } from 'pg'
import AWS from 'aws-sdk'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
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

    const imagePromises = users.map(async (user) => {
      const params = {
        Bucket: S3_BUCKET_NAME,
        Key: `dalle-images/${user.wallet_address}`,
        Expires: 60 * 5 // URL expires in 5 minutes
      }

      try {
        const imageUrl = await s3.getSignedUrlPromise('getObject', params)
        return {
          wallet: user.wallet_address,
          email: user.email,
          imageUrl,
          resumeExcerpt: user.resume.substring(0, 200) // First 200 characters of the resume
        }
      } catch (error) {
        console.error(`Error getting signed URL for ${user.wallet_address}:`, error)
        return {
          wallet: user.wallet_address,
          email: user.email,
          imageUrl: null,
          resumeExcerpt: user.resume.substring(0, 200)
        }
      }
    })

    const images = await Promise.all(imagePromises)

    return NextResponse.json({ success: true, data: images })
  } catch (error) {
    console.error('Error in getAllTalent:', error)
    return NextResponse.json({ success: false, error: 'Error fetching all talent' }, { status: 500 })
  }
}