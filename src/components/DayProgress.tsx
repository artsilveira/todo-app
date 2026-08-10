import { useEffect, useState } from 'react'
import { useTasks } from '../hooks/useTasks'

function getTimeUntilMidnight(): string {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)

  const diffMs = midnight.getTime() - now.getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)

  return [hours, minutes, seconds]
    .map((n) => String(n).padStart(2, '0'))
    .join(':')
}

export function DayProgress() {
  const { data: tasks } = useTasks()
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const total = tasks?.length ?? 0
  const completed = tasks?.filter((t) => t.status === 'COMPLETED').length ?? 0
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-display tracking-wide text-accent-2">
          Progresso do dia
        </span>
        <span className="text-muted">{timeLeft}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded border border-border bg-surface-2">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}