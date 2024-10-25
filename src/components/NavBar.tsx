'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ConnectButton } from "thirdweb/react"
import { createThirdwebClient } from "thirdweb"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const client = createThirdwebClient({ clientId: "958c572f0c8227579ffcc7708353af98" })

export function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <nav className={`fixed right-0 top-0 h-full bg-[hsl(var(--primary))] transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-48'}`}>
      <div className="flex-grow flex flex-col justify-start items-center pt-4">
        <div className={`transition-all duration-300 ${isCollapsed ? 'transform rotate-90 origin-left translate-x-2 -translate-y-10 w-40' : 'w-full px-2'}`}>
          <ConnectButton client={client} />
        </div>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mt-16 mb-4 bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))] p-1 rounded-full"
        >
          {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        
        <ul className="space-y-1 w-full">
        <li>
            <Link href="/" className="text-white hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))] block py-2 px-3 rounded text-center">
              {isCollapsed ? 'Home' : 'Home'}
            </Link>
          </li>
          <li>
            <Link href="/talent-vault" className="text-white hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))] block py-2 px-3 rounded text-center">
              {isCollapsed ? 'Vault' : 'Talent Vault'}
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-white hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))] block py-2 px-3 rounded text-center">
              {isCollapsed ? 'Dash' : 'Dashboard'}
            </Link>
          </li>
          <li>
            <Link href="/add" className="text-white hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))] block py-2 px-3 rounded text-center">
              {isCollapsed ? 'Craft' : 'Craft Avatar'}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}