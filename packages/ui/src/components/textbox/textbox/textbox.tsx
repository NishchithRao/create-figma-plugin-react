import { RawTextbox, RawTextboxProps } from './private/raw-textbox.js'

import { createClassName } from '../../../utilities/create-class-name.js'
import { forwardRef } from 'react'
import styles from './textbox.module.css'

export type TextboxProps = RawTextboxProps & {
  icon?: string | JSX.Element
  variant?: TextboxVariant
}

export type TextboxVariant = 'border' | 'underline'

export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(function (
  { icon, variant, ...rest },
  ref
) {
  if (typeof icon === 'string' && icon.length !== 1) {
    console.warn(`String \`icon\` must be a single character: ${icon}`)
  }

  return (
    <div
      className={createClassName([
        styles.textbox,
        variant === 'border' ? styles.hasBorder : null,
        typeof icon === 'undefined' ? null : styles.hasIcon,
        rest.disabled === true ? styles.disabled : null
      ])}
    >
      <RawTextbox {...rest} ref={ref} className={styles.input} />
      {typeof icon === 'undefined' ? null : (
        <div className={styles.icon}>{icon}</div>
      )}
      <div className={styles.border} />
      {variant === 'underline' ? <div className={styles.underline} /> : null}
    </div>
  )
})
