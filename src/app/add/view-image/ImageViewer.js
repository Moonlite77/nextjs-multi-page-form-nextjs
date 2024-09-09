'use client'

import { useAddDealContext } from '@/contexts/addDealContext';
import Image from 'next/image';

export default function ImageViewer(){
    const { newDealData } = useAddDealContext()
    const myNewLink = newDealData['openAIURL']

    return <div>
      <Image
      src={myNewLink}
      width={500}
      height={500}
      alt="Picture of the author"
        />
    </div>
}