'use client'

import { determineSignInSequence } from "../determineSignInSequence"
import { googleSignInWithPopup } from "./auth_google_signin_popup"
import { federatedRedirectSignIn } from "../auth_signin_redirect"
import { provider } from "./auth_google_provider_create"

export const googleSignInSequence = () => {
  determineSignInSequence(googleSignInWithPopup, () => federatedRedirectSignIn(provider))
}