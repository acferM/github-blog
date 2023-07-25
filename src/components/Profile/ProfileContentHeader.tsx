import { PropsWithChildren } from 'react'

export function ProfileContentHeader({ children }: PropsWithChildren) {
  return <header className="flex justify-between">{children}</header>
}
