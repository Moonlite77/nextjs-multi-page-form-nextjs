'use client'

import { useAddDealContext } from '@/contexts/addDealContext';
import Image from 'next/image';
import axios from 'axios';
import { useActiveAccount } from 'thirdweb/react';
import { useState, useEffect } from 'react';

export default function ImageViewer() {
  const { newDealData } = useAddDealContext();
  const myNewLink = newDealData['openAIURL'];  // This is the image URL
  const myUsersEmail = newDealData['contactEmail'];
  const myUsersYOE = newDealData['yoe'];
  const myUsersClearance = newDealData['clearance'];
  const myUsersCareerField = newDealData['charRadio'];
  const userAccount = useActiveAccount();  // Get active account info

  const [imageUrl, setImageUrl] = useState(myNewLink);
  const [userWallet, setUserWallet] = useState(null);  // Initialize wallet as null
  const [uploadStatus, setUploadStatus] = useState('');
  const [dataUploadStatus, setDataUploadStatus] = useState('');

  // Update the user wallet when `useActiveAccount` loads
  useEffect(() => {
    if (userAccount && userAccount.address) {
      setUserWallet(userAccount.address);  // Set wallet when it's available
    }
  }, [userAccount]);

  // Upload the image to S3 when `myNewLink` and `userWallet` are available
  useEffect(() => {
    const handleUpload = async () => {
      if (!myNewLink || !userWallet) {
        return;  // Don't upload if the URL or wallet is not available
      }
  
      try {
        // Call the API route to upload the image to S3
        const response = await axios.post('/api/uploadToS3', {
          imageUrl: myNewLink,  // The image URL
          userWallet: userWallet,  // The user's wallet address
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.data.success) {
          setUploadStatus('Image uploaded successfully');
        } else {
          setUploadStatus('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // No response was received
          console.error('Request data:', error.request);
        } else {
          // Something else happened in making the request
          console.error('Error message:', error.message);
        }
        setUploadStatus('Error uploading image');
      }

      try {
        // Call the API route to upload the image to S3
        const response = await axios.post('/api/uploadToDB', {
          userWallet: userWallet,  // The user's wallet address
          myUsersEmail: myUsersEmail,
          myUsersYOE: myUsersYOE,
          myUsersClearance: myUsersClearance,
          myUsersCareerField: myUsersCareerField,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.success) {
          setDataUploadStatus('Data uploaded successfully');
        } else {
          setDataUploadStatus('Failed to upload Data');
        }
      } catch (error) {
        console.error('Error uploading data:', error);
        setDataUploadStatus('Error uploading Data');
      }
    };
  
    handleUpload();  // Trigger the upload
  }, [myNewLink, userWallet]);

/*
  ////Another useEffect to handle upload to postgres DB
  useEffect(() => {
    const handleDBUpload = async () => {
      if (!myNewLink || !userWallet) {
        return;  // Don't upload if the URL or wallet is not available
      }

      try {
        // Call the API route to upload the image to S3
        const response = await axios.post('/api/uploadToDB', {
          imageUrl: myNewLink,  // The image URL
          userWallet: userWallet,  // The user's wallet address
          myUsersEmail: myUsersEmail,
          myUsersYOE: myUsersYOE,
          myUsersClearance: myUsersClearance,
          myUsersCareerField: myUsersCareerField,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.success) {
          setDataUploadStatus('Data uploaded successfully');
        } else {
          setDataUploadStatus('Failed to upload Data');
        }
      } catch (error) {
        console.error('Error uploading data:', error);
        setDataUploadStatus('Error uploading Data');
      }
    };

    handleDBUpload();  // Trigger the upload

  }, [myNewLink, userWallet]);  // Trigger when image URL or user wallet changes

  */

  return (
    <div className='grid items-center justify-center max-h-3/12 max-w-3/12 mb-10'>
      {imageUrl && (
        <Image
          src={imageUrl}
          width={500}
          height={500}
          alt="Uploaded image"
        />
      )}
      <p>{uploadStatus}</p>
      <p>{dataUploadStatus}</p>
    </div>
  );
}
