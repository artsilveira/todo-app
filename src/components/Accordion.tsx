import { useState } from 'react'
import type { ReactNode } from 'react'

interface AccordionProps {
  title: string
  count: number
  children: ReactNode
  defaultOpen?: boolean
}

export function Accordion({ title, count, children, defaultOpen = true }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <span className="font-display tracking-wide text-accent-2">
          {title.toUpperCase()} ({count})
        </span>
        <span className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && <div className="pb-3">{children}</div>}
    </div>
  )
}