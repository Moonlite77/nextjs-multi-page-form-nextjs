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
    // Define the SQL query for inserting data
    const insertQuery = `
    INSERT INTO users (wallet_address, email, years_of_experience, clearance, career_field)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  
  // Execute the query
  const result = await pool.query(insertQuery, [
    userWallet,         // Maps to wallet_address
    myUsersEmail,       // Maps to email
    myUsersYOE,         // Maps to years_of_experience
    myUsersClearance,   // Maps to clearance
    myUsersCareerField  // Maps to career_field
  ]);

    // Return the insert result in the response
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error uploading to PostgreSQL DB:', error);
    return NextResponse.json({ success: false, error: 'Error uploading to PostgreSQL DB' }, { status: 500 });
  }
}