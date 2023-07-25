import { PropsWithChildren } from 'react'

export function ProfileFooterItem({ children }: PropsWithChildren) {
  return (
    <span className="flex items-center gap-2 font-default text-base-span leading-default text-base">
      {children}
    </span>
  )
}
