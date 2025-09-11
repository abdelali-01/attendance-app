import Login from '@/components/auths/Login'
import React from 'react'

export const metadata = {
  title: 'Login | Attendance Tracker',
  description: 'Login to your account to manage your attendance',
}

export default function LoginPage() {
  return (
    <main>
      <Login />
    </main>
  )
}
