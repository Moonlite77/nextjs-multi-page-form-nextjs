'use client'
import React from 'react';
import { useAddDealContext } from '@/contexts/addDealContext';
import ImageViewer from '@/app/add/view-image/ImageViewer';
import StoreLink from '@/app/add/review/storeLink';
import Image from 'next/image';


export default function ViewImagePage() {
  const { newDealData } = useAddDealContext()
   const myBandAidURL = newDealData['openAIURL']
  return (
    <div className='max-h-full'>
      <ImageViewer></ImageViewer>
    </div>
  );
}