'use server'

import { cookies } from "next/headers"
import { permanentRedirect } from "next/navigation"

export async function authFunctionWrapper(cb: (auth: string) => any) {
  const cookieStore = cookies()
  const auth = cookieStore.get('auth')?.value
  if (auth) {
    const response = await cb(auth)
    const result = response.result
    if (result?.error) {
      cookieStore.set('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === process.env.ENVIRONMENT,
        expires: new Date(0),
        path: '/'
      })
      return { redirect: '/pages/login/signin' }
    }
    return result
  } else {
    console.error({ error: 'Missing auth token' })
    return { redirect: '/pages/login/signin' }
  }
}

export async function getUser() {
  const getData = async (auth: string) => {
    try {
      const response = await fetch(`${process.env.BASE_API_URL}/users/get/user`, {
        method: 'GET',
        headers: {
          'Authorization': `${auth}`
        }
      })
      const result = await response.json()
      return result
    } catch (e) {
      return { error: e }
    }
  }
  return authFunctionWrapper(getData)
}

export async function getCookie(key: string) {
  const cookieStore = cookies()
  const cookie = cookieStore.get(key)?.value
  return cookie
  return getData
}
