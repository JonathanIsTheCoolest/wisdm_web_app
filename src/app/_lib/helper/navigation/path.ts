'use client'

import { usePathname, useSearchParams } from "next/navigation";

export const standardizedPath = () => {
    const path = `${usePathname()}?${useSearchParams()}`
    return path
}