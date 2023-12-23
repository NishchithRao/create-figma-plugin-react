import { forwardRef } from 'react'
import styles from './divider.module.css'

export const Divider = forwardRef<HTMLHRElement, Record<string, never>>(
  function (rest, ref) {
    return <hr {...rest} ref={ref} className={styles.divider} />
  }
)
