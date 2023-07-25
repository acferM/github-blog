import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <div className="w-screen flex flex-col items-center pb-8">
      <header className="bg-header-cover bg-cover aspect-cover-img w-full" />

      <Outlet />
    </div>
  )
}
