import { PropsWithChildren } from 'react'

export function ProfileContentContainer({ children }: PropsWithChildren) {
  return <main className="flex flex-col w-full">{children}</main>
}
