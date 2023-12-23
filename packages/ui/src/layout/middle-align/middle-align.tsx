import { forwardRef } from 'react'
import styles from './middle-align.module.css'

export type MiddleAlignProps = {
  children: React.ReactNode
}

export const MiddleAlign = forwardRef<HTMLDivElement, MiddleAlignProps>(
  function ({ children, ...rest }, ref) {
    return (
      <div {...rest} ref={ref} className={styles.middleAlign}>
        <div className={styles.children}>{children}</div>
      </div>
    )
  }
)
