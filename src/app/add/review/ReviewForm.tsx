'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SubmitButton from '@/components/SubmitButton'
import { useAddDealContext } from '@/contexts/addDealContext'
import { NewDealType } from '@/schemas'
import { submitDealAction } from './actions'
import CreatePicture from '@/app/add/review/createPicture'
import StoreLink from './storeLink'

export default function ReviewForm() {
  const router = useRouter()
  const { updateNewDealDetails, newDealData, resetLocalStorage } = useAddDealContext()

  const { charRadio, yoe, resumeText, degree, clearance, contactEmail } = newDealData

  console.log(`clearance is ${clearance}`);

  const handleFormSubmit = async (formData: FormData) => {
    const res = await submitDealAction(newDealData as NewDealType)
    const { redirect, errorMsg, success } = res

    if (success) {
      toast.success('Submission Successful! Painting initiated..')

      const createPicResponse = await CreatePicture(
        newDealData['charRadio'],
        newDealData['yoe'],
        newDealData['degree'],
        newDealData['clearance'],
        newDealData['contactEmail'],
        newDealData['resumeText'],
      )
      console.log(createPicResponse)
      updateNewDealDetails({ ['openAIURL']: createPicResponse })
    } else if (errorMsg) {
      toast.error(errorMsg)
    }
    if (redirect) {
      return router.push(redirect)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
  }

  return (
    <form
      action={handleFormSubmit}
      className="flex flex-1 flex-col gap-6 items-stretch lg:max-w-[700px]"
    >
      <Card>
        <CardHeader>
          <CardTitle>Review Your Submission</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Career Field:</span>
            <span className="text-primary font-semibold">{charRadio}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Years of Experience:</span>
            <span>{yoe}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Degree:</span>
            <span>{degree}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Clearance:</span>
            <span>{clearance}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Contact Email:</span>
            <span>{contactEmail}</span>
          </div>
          <div className="space-y-2">
            <span className="font-semibold">Resume Text:</span>
            <p className="text-sm text-muted-foreground">
              {truncateText(resumeText || '', 200)}
            </p>
            {resumeText && resumeText.length > 200 && (
              <Button 
                variant="link" 
                onClick={() => {
                  navigator.clipboard.writeText(resumeText)
                  toast.success('Full resume text copied to clipboard!')
                }} 
                className="p-0"
              >
                Copy full text
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <SubmitButton text="Submit" />
    </form>
  )
}