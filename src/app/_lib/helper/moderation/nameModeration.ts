import { Filter } from "bad-words";

const filter = new Filter()

const namePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/
const usernamePattern = /^[A-Za-z0-9!@#$%^&*()_+={}[\]:;'"<>,.?\/|-]+$/

export const basicNameModerationFilter = (value: string, fieldName: string = 'name') => {
  const pattern = fieldName === 'name' ? namePattern : usernamePattern;
  let errorMessage = null

  if (!value.length) {
    return errorMessage
  }

  if (!pattern.test(value)) {
    errorMessage = `Hmmm this doesn't look like a ${fieldName}...`
  }

  if (filter.isProfane(value)) {
    if (errorMessage?.length) {
      errorMessage = `${errorMessage} and it might be inappropriate`
    } else {
      errorMessage = 'Hmmm this might be inappropriate'
    }
  }

  return errorMessage
}

export const aiNameModerationRequest = async(object: Object) => {
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
  try {
    const moderationResponse = await fetch(`${BASE_API_URL}/users/post/moderate_name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        object: object
      }),
    })
    const result = await moderationResponse.json()
    return result
  } catch (e) {
    return {
      error: e
    }
  }
}

