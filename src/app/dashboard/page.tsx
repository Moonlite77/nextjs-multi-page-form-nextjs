'use client'

import { Dashboard } from '@/components/Dashboard'
import { useActiveAccount } from 'thirdweb/react'

export default function DashboardPage() {
  const userAccount = useActiveAccount()
  const userWallet = userAccount?.address || ''
  const userName = userAccount?.name || 'User'

  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard userWallet={userWallet} userName={userName} />
    </div>
  )
}