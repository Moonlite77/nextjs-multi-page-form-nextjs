'use client'

import { useAddDealContext } from '@/contexts/addDealContext'
import { useCallback, useState, useEffect } from 'react'
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SubmitButton from '@/components/SubmitButton'
import { stepThreeFormAction } from './actions'
import { useFormState } from 'react-dom'
import { FormErrors } from '@/types'

export default function ResumeUploader() {
  const [resumeContent, setResumeContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { updateNewDealDetails } = useAddDealContext()

  const updateResumeContent = useCallback((content: string | null) => {
    setResumeContent(content)
    if (content) {
      updateNewDealDetails({ 'resumeText': content })
    }
  }, [updateNewDealDetails])

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      setError('Please upload a valid PDF, DOC, DOCX, or TXT file.')
      return
    }

    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const content = event.target?.result as string
      updateResumeContent(content)
      setError(null)
    }

    reader.onerror = () => {
      setError('There was an error reading the file.')
    }

    reader.readAsText(file)
  }, [updateResumeContent])

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions)
  
  const initialState: FormErrors = {}
  const [serverErrors, formAction] = useFormState(stepThreeFormAction, initialState)

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!resumeContent) {
      setError('Please upload a resume before submitting.')
      return
    }
    formAction(new FormData(event.currentTarget))
  }, [resumeContent, formAction])

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        <Card className="w-full">
          <CardContent className="p-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-primary">Drop the resume here ...</p>
              ) : (
                <p>Drag and drop your resume here, or click to select a file</p>
              )}
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
            {resumeContent && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Resume Content:</h3>
                <p className="text-sm text-gray-600 break-words">{resumeContent.slice(0, 100)}...</p>
                <Button type="button" className="mt-2" onClick={() => console.log(resumeContent)}>
                  Log Full Content
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <SubmitButton text='Continue' />
      </div>
      {serverErrors && Object.keys(serverErrors).length > 0 && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {Object.entries(serverErrors).map(([key, value]) => (
            <p key={key}>{value}</p>
          ))}
        </div>
      )}
    </form>
  )
}