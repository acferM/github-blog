import { PropsWithChildren } from 'react'

export function ProfileContent({ children }: PropsWithChildren) {
  return (
    <p className="text-base-text font-default text-base leading-default mt-2">
      {children}
    </p>
  )
}
