import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article' | 'figure'
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? 'in' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
