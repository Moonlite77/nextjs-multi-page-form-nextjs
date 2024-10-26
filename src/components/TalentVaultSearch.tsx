'use client'

import { SearchInput } from "@/components/ui/search-input"

interface TalentVaultSearchProps {
  onSearch: (query: string) => void
}

export function TalentVaultSearch({ onSearch }: TalentVaultSearchProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <SearchInput 
          placeholder="Search resumes..." 
          onSearch={onSearch}
        />
      </div>
    </div>
  )
}