import { forwardRef } from 'react'
import styles from './bold.module.css'

export type BoldProps = {
  children: React.ReactNode
}

export const Bold = forwardRef<HTMLSpanElement, BoldProps>(function (
  { children, ...rest },
  ref
) {
  return (
    <strong {...rest} ref={ref} className={styles.bold}>
      {children}
    </strong>
  )
})
