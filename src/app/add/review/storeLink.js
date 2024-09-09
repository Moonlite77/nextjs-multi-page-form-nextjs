'use client'

import { useAddDealContext } from '@/contexts/addDealContext';
import Image from 'next/image';


export default function StoreLink(link){
    /*const { updateNewDealDetails, newDealData } = useAddDealContext();
    updateNewDealDetails({[openAIURL]: link})
    console.log('StoreLink function hit')
    console.log(`The link StoreLink recieved is ${link}`)*/
    return <div>
      <Image
      src={link}
      width={500}
      height={500}
      alt="Picture of the author"
        />
    </div>
}