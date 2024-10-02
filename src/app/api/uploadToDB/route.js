import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import axios from 'axios';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PGUSER, // PostgreSQL username
  host: process.env.PGHOST, // PostgreSQL server endpoint (AWS RDS)
  database: process.env.PGDATABASE, // Name of the PostgreSQL database
  password: process.env.PGPASSWORD, // PostgreSQL password
  port: process.env.PGPORT || 5432, // PostgreSQL default port
  ssl: { rejectUnauthorized: false }
});

// Define the API route handler
export async function POST(request) {
  const { userWallet, myUsersEmail, myUsersYOE, myUsersClearance, myUsersCareerField } = await request.json(); // Parse request body


  try {
    // First, check if a user with the same wallet address exists
    const checkQuery = `SELECT * FROM users WHERE wallet_address = $1`;
    const checkResult = await pool.query(checkQuery, [userWallet]);

    if (checkResult.rows.length > 0) {
      // If the user already exists, you can update the record
      const updateQuery = `
        UPDATE users 
        SET email = $2, years_of_experience = $3, clearance = $4, career_field = $5
        WHERE wallet_address = $1
        RETURNING *;
      `;
      const updateResult = await pool.query(updateQuery, [userWallet, myUsersEmail, myUsersYOE, myUsersClearance, myUsersCareerField]);
      return NextResponse.json({ success: true, data: updateResult.rows[0] });
    } else {
      // If the user does not exist, insert a new record
      const insertQuery = `
        INSERT INTO users (wallet_address, email, years_of_experience, clearance, career_field)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const result = await pool.query(insertQuery, [userWallet, myUsersEmail, myUsersYOE, myUsersClearance, myUsersCareerField]);
      return NextResponse.json({ success: true, data: result.rows[0] });
    }
  } catch (error) {
    console.error('Error uploading to PostgreSQL DB:', error);
    return NextResponse.json({ success: false, error: 'Error uploading to PostgreSQL DB' }, { status: 500 });
  }
}