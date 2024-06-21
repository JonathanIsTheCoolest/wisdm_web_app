'use server'

import { cookies } from "next/headers"
 
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

    cookies().set('currentUser', 'true', {
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