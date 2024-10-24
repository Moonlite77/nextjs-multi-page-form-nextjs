'use client'

import { useAddDealContext } from '@/contexts/addDealContext'
import { useActiveAccount } from 'thirdweb/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function ImageViewer() {
  const { newDealData } = useAddDealContext()
  console.log('newDealData:', newDealData);
  const { openAIURL: myNewLink, contactEmail: myUsersEmail, yoe: myUsersYOE, clearance: myUsersClearance, charRadio: myUsersCareerField, resumeText: myUsersResumeText, } = newDealData
  const userAccount = useActiveAccount()

  const [imageUrl, setImageUrl] = useState<string | null>(myNewLink || null)
  const [userWallet, setUserWallet] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [dataUploadStatus, setDataUploadStatus] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userAccount && userAccount.address) {
      setUserWallet(userAccount.address)
    }
  }, [userAccount])

  useEffect(() => {
    const handleUpload = async () => {
      if (!myNewLink || !userWallet) return

      setIsLoading(true)

      try {
        const imageResponse = await axios.post('/api/uploadToS3', {
          imageUrl: myNewLink,
          userWallet: userWallet,
        })

        setUploadStatus(imageResponse.data.success ? 'Image uploaded successfully' : 'Failed to upload image')

        const dataResponse = await axios.post('/api/uploadToDB', {
          userWallet,
          myUsersEmail,
          myUsersYOE,
          myUsersClearance,
          myUsersCareerField,
          myUsersResumeText,
        })
        //console.log('myUsersResumeText:', myUsersResumeText)

        setDataUploadStatus(dataResponse.data.success ? 'Data uploaded successfully' : 'Failed to upload data')
      } catch (error) {
        console.error('Error during upload:', error)
        setUploadStatus('Error uploading image')
        setDataUploadStatus('Error uploading data')
      } finally {
        setIsLoading(false)
      }
    }

    handleUpload()
  }, [myNewLink, userWallet, myUsersEmail, myUsersYOE, myUsersClearance, myUsersCareerField, myUsersResumeText,])

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
    </Card>
  )
}