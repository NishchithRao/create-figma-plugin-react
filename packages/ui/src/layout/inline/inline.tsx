import { Children, forwardRef } from 'react'

import { Space } from '../../types/space.js'
import styles from './inline.module.css'

export type InlineProps = {
  children: React.ReactElement[]
  space?: InlineSpace
}
export type InlineSpace = Space

export const Inline = forwardRef<HTMLDivElement, InlineProps>(function (
  { children, space, ...rest },
  ref
) {
  return (
    <div
      {...rest}
      ref={ref}
      className={typeof space === 'undefined' ? undefined : styles[space]}
    >
      {Children.map(children, function (child, index: number) {
        return (
          <div key={index} className={styles.child}>
            {child}
          </div>
        )
      })}
    </div>
  )
})
