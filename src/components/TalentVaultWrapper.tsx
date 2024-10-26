'use client'

import { useState } from 'react'
import { TalentVaultSearch } from './TalentVaultSearch'
import { TalentVaultGrid } from './TalentVaultGrid'

interface TalentImage {
  wallet: string
  email: string
  imageUrl: string | null
  resumeExcerpt: string
}

interface TalentVaultWrapperProps {
  initialImages: TalentImage[]
}

export function TalentVaultWrapper({ initialImages }: TalentVaultWrapperProps) {
  const [images, setImages] = useState(initialImages)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setImages(initialImages)
      return
    }

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

  return (
    <div className="space-y-4">
      <TalentVaultSearch onSearch={handleSearch} />
      {loading && <div className="text-center">Searching...</div>}
      {error && <div className="text-red-500 text-center">Error: {error}</div>}
      <TalentVaultGrid images={images} />
    </div>
  )
}