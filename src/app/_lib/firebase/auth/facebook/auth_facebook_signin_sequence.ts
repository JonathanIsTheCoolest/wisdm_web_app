'use client'

import { determineSignInSequence } from "../determineSignInSequence"
import { facebookSignInWithPopup } from "./auth_facebook_signin_popup"
import { federatedRedirectSignIn } from "../auth_signin_redirect"
import { provider } from "./auth_facebook_provider_create"

export const facebookSignInSequence = () => {
  determineSignInSequence(facebookSignInWithPopup, () => federatedRedirectSignIn(provider))
}