'use client'

import { useAddDealContext } from '@/contexts/addDealContext';
import Image from 'next/image';

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
}