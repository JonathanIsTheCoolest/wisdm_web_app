'use client'

interface NameProfanityCheckReturnValue {
  isProfane: boolean,
  identifiedProfanityList: string[]
}

const nameProfanityCheck = (
  name: string,
  profanityList: string[] | null
): NameProfanityCheckReturnValue => {
  const languageCheck = navigator.languages
  let isProfane: boolean =  false
  let identifiedProfanityList: string[] = []

  if (profanityList && profanityList.length) {
    identifiedProfanityList = profanityList.filter(profanity => name.includes(profanity))

    isProfane = identifiedProfanityList.length > 0
  }

  return {
    isProfane,
    identifiedProfanityList
  }
}