import { TalentVaultWrapper } from './TalentVaultWrapper'

interface TalentImage {
  wallet: string
  email: string
  imageUrl: string | null
  resumeExcerpt: string
}

interface TalentVaultProps {
  initialImages: TalentImage[]
}

export function TalentVault({ initialImages }: TalentVaultProps) {
  return <TalentVaultWrapper initialImages={initialImages} />
}