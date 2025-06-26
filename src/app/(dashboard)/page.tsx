import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import HomeView from '@/modules/home/page'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const Homepage = async() => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  if (!!session) 
    return (
    <HomeView />
  )
  else redirect("/sign-in")
}

export default Homepage
