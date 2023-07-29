'use client'
import 'client-only'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const queryName = 'login'
const separater = ','

export const useCheckBoxes = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // get checkedLoginSet from searchParams
  const params = new URLSearchParams(searchParams.toString())
  const currentLogins = params.get(queryName)?.split(separater) ?? []
  const checkedLoginSet = new Set(currentLogins)

  // update searchParams from checkedItems
  const onClick = (login: string, isChecked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())

    if (isChecked) checkedLoginSet.add(login)
    else checkedLoginSet.delete(login)

    if (checkedLoginSet.size >= 1)
      params.set(queryName, Array.from(checkedLoginSet).join(separater))
    else params.delete(queryName)

    router.replace(pathname + '?' + params.toString())
  }

  return {
    onClick,
    checkedLoginSet,
  }
}
