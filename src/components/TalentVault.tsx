'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SearchInput } from "@/components/ui/search-input"

interface TalentImage {
  wallet: string
  email: string
  imageUrl: string | null
  resumeExcerpt: string
}

export function TalentVault() {
  const [images, setImages] = useState<TalentImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAllImages = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/getAllTalent')
      if (!response.ok) {
        throw new Error('Failed to fetch talent vault')
      }
      const data = await response.json()
      if (data.success) {
        setImages(data.data)
      } else {
        setError(data.error || 'Unknown error occurred')
      }
    } catch (err) {
      setError('An error occurred while fetching the talent vault')
      console.error('Error fetching talent vault:', err)
    } finally {
      setLoading(false)
    }
  }

  const searchImages = async (query: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/searchTalent?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error('Failed to search talent vault')
      }
      const data = await response.json()
      if (data.success) {
        setImages(data.data)
      } else {
        setError(data.error || 'Unknown error occurred')
      }
    } catch (err) {
      setError('An error occurred while searching the talent vault')
      console.error('Error searching talent vault:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllImages()
  }, [])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      searchImages(query)
    } else {
      fetchAllImages()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <SearchInput 
            placeholder="Search resumes..." 
            onSearch={handleSearch}
          />
        </div>
      </div>

      {loading && <div className="text-center">Loading talent vault...</div>}
      {error && <div className="text-red-500 text-center">Error: {error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!loading && images.length === 0 ? (
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
    </div>
  )
}