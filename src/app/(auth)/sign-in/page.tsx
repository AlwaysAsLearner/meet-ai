import { Card } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import SignInView from '@/modules/auth/ui/views/sign-in-view'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import React from 'react'

const SignInPage = async() => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!!session) redirect("/")
  else return (<SignInView />)
}

export default SignInPage
