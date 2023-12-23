import { forwardRef } from 'react'
import styles from './muted.module.css'

export type MutedProps = {
  children: React.ReactNode
}

export const Muted = forwardRef<HTMLSpanElement, MutedProps>(function (
  { children, ...rest },
  ref
) {
  return (
    <span {...rest} ref={ref} className={styles.muted}>
      {children}
    </span>
  )
})
