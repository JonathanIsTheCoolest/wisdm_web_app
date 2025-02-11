'use client'

import { usePathname, useSearchParams } from "next/navigation";

export const standardizedPath = () => {
    const path = `${usePathname()}?${useSearchParams()}`
    return path
}

export const standardizePathAnchorIds = (id: string) => {
    const path = `${id}IsAnAnchor`
    return path
}