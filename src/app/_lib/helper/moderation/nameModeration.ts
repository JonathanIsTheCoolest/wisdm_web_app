import { Filter } from "bad-words";

const filter = new Filter()

export const basicNameModerationFilter = (value: string) => {
  const namePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
  let errorMessage = ""

  if (!value.length) {
    return errorMessage
  }

  if (!namePattern.test(value)) {
    errorMessage = "Hmmm this doesn't look like a name..."
  }

  if (filter.isProfane(value)) {
    if (errorMessage.length) {
      errorMessage = `${errorMessage} and it might be inappropriate`
    } else {
      errorMessage = 'Hmmm this might be inappropriate'
    }
  }

  return errorMessage
}

export const aiNameModerationRequest = async(name: string) => {
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
  try {
    const moderationResponse = await fetch(`${BASE_API_URL}/users/post/moderate_name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: name
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

