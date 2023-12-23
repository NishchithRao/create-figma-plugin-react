import { Space } from '../../types/space.js'
import { forwardRef } from 'react'
import styles from './vertical-space.module.css'

export type VerticalSpaceProps = {
  space: VerticalSpaceSpace
}
export type VerticalSpaceSpace = Space

export const VerticalSpace = forwardRef<HTMLDivElement, VerticalSpaceProps>(
  function ({ space, ...rest }, ref) {
    return <div {...rest} ref={ref} className={styles[space]} />
  }
)
