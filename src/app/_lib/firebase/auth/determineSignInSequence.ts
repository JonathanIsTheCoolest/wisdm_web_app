'use client'

import { getDeviceType } from "../../getDeviceType"

export const  determineSignInSequence = (popUpSequence: Function, redirectSequence: Function) => {
  const deviceType = getDeviceType()
  switch(deviceType) {
    case 'Mobile' || 'Tablet':
      redirectSequence()
      break
    case 'Desktop':
      popUpSequence()
      break
    default:
      popUpSequence()
      break
  }
}