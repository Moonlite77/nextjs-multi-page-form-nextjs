import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import axios from 'axios';

// Initialize the S3 client with environment variables
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Define the API route handler
export async function POST(request) {
  const { imageUrl, userWallet } = await request.json(); // Parse request body
  console.log(imageUrl);
  console.log(userWallet);
  
  try {
    // Fetch the image from the provided URL
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',  // Ensures the response is in binary form
    });

    // Define the S3 upload parameters
    const params = {
      Bucket: 'anothercoolpic',
      Key: `dalle-images/${userWallet}`,  // The key is the file path in the S3 bucket
      Body: response.data,  // Binary data from the image
      ContentType: response.headers['content-type'],  // Set correct content type
    };

    // Upload to S3
    const uploadResult = await s3.upload(params).promise();
    console.log('Upload successful', uploadResult);

    // Return the upload result in the response
    return NextResponse.json({ success: true, data: uploadResult });
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return NextResponse.json({ success: false, error: 'Error uploading to S3' }, { status: 500 });
  }
}