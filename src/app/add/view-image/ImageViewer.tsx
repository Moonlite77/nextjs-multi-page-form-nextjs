'use client'

import { useAddDealContext } from '@/contexts/addDealContext'
import { useActiveAccount } from 'thirdweb/react'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function ImageViewer() {
  const { newDealData, resetLocalStorage } = useAddDealContext()
  const router = useRouter()
  console.log('newDealData:', newDealData);
  const { openAIURL: myNewLink, contactEmail: myUsersEmail, yoe: myUsersYOE, clearance: myUsersClearance, charRadio: myUsersCareerField, resumeText: myUsersResumeText, } = newDealData
  const userAccount = useActiveAccount()

  const [imageUrl, setImageUrl] = useState<string | null>(myNewLink || null)
  const [userWallet, setUserWallet] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [dataUploadStatus, setDataUploadStatus] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isUploaded, setIsUploaded] = useState(false)

  const initialRenderRef = useRef(true)
  const uploadAttemptedRef = useRef(false)

  useEffect(() => {
    if (userAccount && userAccount.address) {
      setUserWallet(userAccount.address)
    }
  }, [userAccount])

  const handleUpload = useCallback(async () => {
    if (!myNewLink || !userWallet) {
      console.log('Missing myNewLink or userWallet, skipping upload');
      setIsLoading(false);
      return;
    }

    if (uploadAttemptedRef.current) {
      console.log('Upload already attempted, skipping');
      return;
    }

    uploadAttemptedRef.current = true;
    setIsLoading(true);

    try {
      console.log('Attempting to upload image to S3...');
      const imageResponse = await axios.post('/api/uploadToS3', {
        imageUrl: myNewLink,
        userWallet: userWallet,
      })

      console.log('S3 upload response:', imageResponse.data);
      setUploadStatus(imageResponse.data.success ? 'Image uploaded successfully' : 'Failed to upload image')

      console.log('Attempting to upload data to DB...');
      const dataResponse = await axios.post('/api/uploadToDB', {
        userWallet,
        myUsersEmail,
        myUsersYOE,
        myUsersClearance,
        myUsersCareerField,
        myUsersResumeText,
      })

      console.log('DB upload response:', dataResponse.data);
      setDataUploadStatus(dataResponse.data.success ? 'Data uploaded successfully' : 'Failed to upload data')

      if (imageResponse.data.success && dataResponse.data.success) {
        setIsUploaded(true);
      }
    } catch (error) {
      console.error('Error during upload:', error)
      setUploadStatus('Error uploading image')
      setDataUploadStatus('Error uploading data')
    } finally {
      setIsLoading(false)
    }
  }, [myNewLink, userWallet, myUsersEmail, myUsersYOE, myUsersClearance, myUsersCareerField, myUsersResumeText])

  useEffect(() => {
    if (!initialRenderRef.current && !isUploaded) {
      handleUpload()
    } else {
      initialRenderRef.current = false
    }
  }, [handleUpload, isUploaded])

  useEffect(() => {
    return () => {
      if (isUploaded) {
        console.log('Component unmounting after successful upload, resetting local storage');
        resetLocalStorage();
      } else {
        console.log('Component unmounting before successful upload, not resetting local storage');
      }
    };
  }, [resetLocalStorage, isUploaded]);

  const handleNavigation = (path: string) => {
    if (isUploaded) {
      console.log(`Navigating to ${path}, resetting local storage`);
      resetLocalStorage();
    } else {
      console.log(`Navigating to ${path} before successful upload, not resetting local storage`);
    }
    router.push(path);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Generated Avatar:</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {isLoading ? (
          <Skeleton className="w-full aspect-square" />
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            width={500}
            height={500}
            alt="Generated avatar based on your profile"
            className="rounded-lg shadow-lg"
          />
        ) : (
          <p>No image available</p>
        )}
        <div className="flex flex-col items-center space-y-2 w-full">
          <Badge variant={uploadStatus.includes('successfully') ? "success" : "destructive"}>
            {uploadStatus || 'Image upload status'}
          </Badge>
          <Badge variant={dataUploadStatus.includes('successfully') ? "success" : "destructive"}>
            {dataUploadStatus || 'Data upload status'}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button onClick={() => handleNavigation('/talent-vault')}>
          Go to Talent Vault
        </Button>
        <Button onClick={() => handleNavigation('/dashboard')}>
          Go to Dashboard
        </Button>
      </CardFooter>
    </Card>
  )
}