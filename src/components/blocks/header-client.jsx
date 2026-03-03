'use client'
import { useHeaderScroll } from '@/hooks/use-header-scroll'

export default function HeaderClient({ children }) {
  const isVisible = useHeaderScroll()

  return (
    <header className={`container left-1/2 -translate-x-1/2 fixed shadow-sm top-8  z-50 transition-transform rounded-2xl duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } bg-white`}>
      {children}
    </header>
  )
}
