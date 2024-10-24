import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (query: string) => void
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, ...props }, ref) => {
    const [query, setQuery] = React.useState('')

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSearch(query)
    }

    return (
      <form onSubmit={handleSubmit} className="relative w-full">
        <Input
          type="text"
          className={`pr-10 !rounded-full !border-2 !border-gray-300 text-gray-800 placeholder-gray-500 ${className}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={ref}
          {...props}
        />
        <Button 
          type="submit" 
          size="icon"
          className="!absolute !right-1 top-1/2 -translate-y-1/2 !rounded-full !p-1"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>
    )
  }
)

SearchInput.displayName = 'SearchInput'