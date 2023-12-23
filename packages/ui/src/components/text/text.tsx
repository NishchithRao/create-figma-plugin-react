import { createClassName } from '../../utilities/create-class-name.js'
import { forwardRef } from 'react'
import styles from './text.module.css'

export type TextProps = {
  align?: TextAlignment
  children: React.ReactNode
  numeric?: boolean
}
export type TextAlignment = 'left' | 'center' | 'right'

export const Text = forwardRef<HTMLDivElement, TextProps>(function ({
  align = 'left',
  children,
  numeric = false,
  ...rest
}) {
  return (
    <div
      {...rest}
      className={createClassName([
        styles.text,
        styles[align],
        numeric === true ? styles.numeric : null
      ])}
    >
      {children}
    </div>
  )
})
