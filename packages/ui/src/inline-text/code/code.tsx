import { forwardRef } from 'react'
import styles from './code.module.css'

export type CodeProps = {
  children: React.ReactNode
}

export const Code = forwardRef<HTMLSpanElement, CodeProps>(function (
  { children, ...rest },
  ref
) {
  return (
    <code {...rest} ref={ref} className={styles.code}>
      {children}
    </code>
  )
})
