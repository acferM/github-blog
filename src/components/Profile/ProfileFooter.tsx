import { PropsWithChildren } from 'react'

export function ProfileFooter({ children }: PropsWithChildren) {
  return <footer className="mt-6 flex items-center gap-6">{children}</footer>
}
