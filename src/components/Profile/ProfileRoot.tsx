import { PropsWithChildren } from 'react'

export function ProfileRoot({ children }: PropsWithChildren) {
  return (
    <div className="flex gap-8 rounded-lg px-10 py-8 items-center mt-[-10%] bg-base-profile w-full shadow">
      {children}
    </div>
  )
}
