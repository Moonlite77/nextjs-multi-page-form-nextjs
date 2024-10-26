import { TalentVault } from '@/components/TalentVault'

async function getTalentData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/getAllTalent`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('Error fetching talent data:', error)
    return []
  }
}

export default async function TalentVaultPage() {
  const initialImages = await getTalentData()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-600 mb-4">Talent Vault</h1>
      <TalentVault initialImages={initialImages} />
    </div>
  )
}