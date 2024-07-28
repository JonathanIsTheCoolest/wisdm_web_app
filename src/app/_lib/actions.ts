'use server'

import { cookies } from "next/headers"
import { permanentRedirect, redirect } from "next/navigation"
 
export async function signIn(prevState: any, formData: FormData) {
  const user = formData.get('user')
  const password = formData.get('password')
  const SIGN_IN_URL: string = `${process.env.BASE_API_URL}${process.env.SIGN_IN_EXTENSION}`

  const body = {
    user_name: user,
    password: password
  }
  try {
    const response = await fetch(SIGN_IN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong.');
    }
    const data = await response.json()
    const token = data.token
    const user = data.user


    cookies().set('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === process.env.ENVIRONMENT,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    })

    return { user: user }
  } catch (error: any) {
    console.error('Error during sign-in:', error.message);
    return { error: error.message || 'An unexpected error occurred.' };
  }
}

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
      permanentRedirect('/login/signIn')
    }
    return result
  } else {
    console.error({ error: 'Missing auth token' })
    permanentRedirect('/login/signIn')
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
}
