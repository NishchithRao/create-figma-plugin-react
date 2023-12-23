import { Children, forwardRef } from 'react'

import { Space } from '../../types/space.js'
import styles from './stack.module.css'

export type StackProps = {
  children: React.ReactElement[]
  space: StackSpace
}
export type StackSpace = Space

export const Stack = forwardRef<HTMLDivElement, StackProps>(function (
  { children, space, ...rest },
  ref
) {
  return (
    <div {...rest} ref={ref} className={styles[space]}>
      {Children.map(children, function (element, index: number) {
        return (
          <div key={index} className={styles.child}>
            {element}
          </div>
        )
      })}
    </div>
  )
})
