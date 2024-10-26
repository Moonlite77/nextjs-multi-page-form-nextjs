import Image from 'next/image'

interface TalentImage {
  wallet: string
  email: string
  imageUrl: string | null
  resumeExcerpt: string
}

interface TalentVaultGridProps {
  images: TalentImage[]
}

export function TalentVaultGrid({ images }: TalentVaultGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.length === 0 ? (
        <div className="col-span-full text-center">No talent found.</div>
      ) : (
        images.map((image) => (
          <div key={image.wallet} className="border rounded-lg p-4 flex flex-col items-center">
            {image.imageUrl ? (
              <Image
                src={image.imageUrl}
                alt={`Image for ${image.email}`}
                width={300}
                height={300}
                className="rounded-lg"
              />
            ) : (
              <div className="bg-gray-200 w-full h-[300px] flex items-center justify-center rounded-lg">
                No image available
              </div>
            )}
            <p className="text-center text-sm text-gray-800 mt-2">{image.email}</p>
            <p className="text-xs text-gray-600 mt-1 line-clamp-3">{image.resumeExcerpt}</p>
          </div>
        ))
      )}
    </div>
  )
}