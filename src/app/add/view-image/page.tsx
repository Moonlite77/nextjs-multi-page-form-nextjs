'use client'

import React from 'react'
import { useAddDealContext } from '@/contexts/addDealContext'
import ImageViewer from './ImageViewer'

export default function ViewImagePage() {
  const { newDealData } = useAddDealContext()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <ImageViewer />
    </div>
  )
}