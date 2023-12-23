import { Children, forwardRef } from 'react'

import { Space } from '../../types/space.js'
import { createClassName } from '../../utilities/create-class-name.js'
import styles from './columns.module.css'

export type ColumnsProps = {
  children: React.ReactElement
  space?: ColumnsSpace
}
export type ColumnsSpace = Space

export const Columns = forwardRef<HTMLDivElement, ColumnsProps>(function (
  { children, space, ...rest },
  ref
) {
  return (
    <div
      {...rest}
      ref={ref}
      className={createClassName([
        styles.columns,
        typeof space === 'undefined' ? null : styles[space]
      ])}
    >
      {Children.map(
        children,
        function (element: React.ReactElement, index: number) {
          return (
            <div key={index} className={styles.child}>
              {element}
            </div>
          )
        }
      )}
    </div>
  )
})
