import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col justify-center items-center p-4">
      <main className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 sm:text-5xl lg:text-6xl">
          Get <span className="text-[hsl(var(--primary))]">more</span> out of your resume.
        </h1>
        <p className="text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
          Create a unique avatar, get value for your time, and ensure only serious recruiters contact you. ALL while staying private.
        </p>
        <div className="flex flex-col md:flex-row justify-center md:space-x-12 space-y-8 md:space-y-0 mb-12">
          <div className="flex flex-col items-center w-full md:w-[400px]">
            <div className="mb-4 w-full aspect-square relative">
              <Image 
                src="https://anothercoolpic.s3.us-east-2.amazonaws.com/dalle-images/0x8151064560520D3f1C17D934f7aDe56D2A863254" 
                alt="CyberSecurity Expert Avatar" 
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <p className="text-sm md:text-base">CyberSecurity Expert, 20 years of experience...</p>
          </div>
          <div className="flex flex-col items-center w-full md:w-[400px]">
            <div className="mb-4 w-full aspect-square relative">
              <Image 
                src="https://anothercoolpic.s3.us-east-2.amazonaws.com/dalle-images/0xd946818a13Df88808914E37FdE96236c74f40e74" 
                alt="Developer Avatar" 
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <p className="text-sm md:text-base">Jr. Developer, 3 years of experience</p>
          </div>
        </div>
        <Link href="/add" passHref>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Create!
          </Button>
        </Link>
      </main>
      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} Resume Vault. All rights reserved.
      </footer>
    </div>
  )
}