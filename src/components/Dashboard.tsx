'use client'

import { useState, useEffect } from 'react'
import { ImageDisplay } from '@/components/ImageDisplay'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardProps {
  userWallet: string
  userName: string
}

interface UserData {
  email: string
  career_field: string
  resume: string
}

export function Dashboard({ userWallet, userName }: DashboardProps) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (userWallet) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/getUserData?wallet=${userWallet}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          if (data.success) {
            setUserData(data.data);
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError('An error occurred while fetching user data');
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [userWallet]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userName}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Generated Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageDisplay userWallet={userWallet} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            {!userWallet ? (
              <p>Loading wallet information...</p>
            ) : loading ? (
              <p>Loading user data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : userData ? (
              <>
                <p><strong>Wallet Address:</strong> {userWallet}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Career Field:</strong> {userData.career_field}</p>
                <div>
                  <strong>Resume:</strong>
                  <p className="mt-2 whitespace-pre-wrap">{userData.resume}</p>
                </div>
              </>
            ) : (
              <p>No user data available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}