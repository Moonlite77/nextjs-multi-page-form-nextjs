'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"

interface ImageDisplayProps {
  userWallet: string
}

export function ImageDisplay({ userWallet }: ImageDisplayProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-full aspect-square">
      {isLoading && <Skeleton className="absolute inset-0" />}
      <Image
        src={`https://anothercoolpic.s3.us-east-2.amazonaws.com/dalle-images/${userWallet}`}
        alt="User generated image"
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-lg"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}