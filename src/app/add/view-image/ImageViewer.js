'use client'

import { useAddDealContext } from '@/contexts/addDealContext';
import Image from 'next/image';
<<<<<<< HEAD
import axios from 'axios';
import { useActiveAccount } from 'thirdweb/react';
import { useState, useEffect } from 'react';

export default function ImageViewer() {
  const { newDealData } = useAddDealContext();
  const myNewLink = newDealData['openAIURL'];  // This is the image URL
  const userAccount = useActiveAccount();  // Get active account info

  const [imageUrl, setImageUrl] = useState(myNewLink);
  const [userWallet, setUserWallet] = useState(null);  // Initialize wallet as null
  const [uploadStatus, setUploadStatus] = useState('');

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
        setUploadStatus('Error uploading image');
      }
    };

    handleUpload();  // Trigger the upload

  }, [myNewLink, userWallet]);  // Trigger when image URL or user wallet changes

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
    </div>
  );
=======

export default function ImageViewer(){
    const { newDealData } = useAddDealContext()
    const myNewLink = newDealData['openAIURL']

    return <div className='grid items-center justify-center max-h-3/12 max-w-3/12 mb-10'>
      <Image
      src={myNewLink}
      width={500}
      height={500}
      alt="Picture of the author"
        />
    </div>
>>>>>>> 6d3ed94c11bef62d1676d2b603ae4c3927cca1bf
}