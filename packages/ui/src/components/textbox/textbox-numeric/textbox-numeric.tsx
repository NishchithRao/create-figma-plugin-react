import {
  RawTextboxNumeric,
  RawTextboxNumericProps
} from './private/raw-textbox-numeric.js'

import { createClassName } from '../../../utilities/create-class-name.js'
import { forwardRef } from 'react'
import textboxNumericStyles from './textbox-numeric.module.css'
import textboxStyles from '../textbox/textbox.module.css'

export type TextboxNumericProps = RawTextboxNumericProps & {
  icon?: string | JSX.Element
  variant?: TextboxNumericVariant
}

export type TextboxNumericVariant = 'border' | 'underline'

export const TextboxNumeric = forwardRef<HTMLInputElement, TextboxNumericProps>(
  function ({ icon, variant, ...rest }, ref) {
    if (typeof icon === 'string' && icon.length !== 1) {
      console.warn(`String \`icon\` must be a single character: ${icon}`)
    }

    return (
      <div
        className={createClassName([
          textboxStyles.textbox,
          typeof variant === 'undefined'
            ? null
            : variant === 'border'
              ? textboxStyles.hasBorder
              : null,
          typeof icon === 'undefined' ? null : textboxStyles.hasIcon,
          rest.disabled === true ? textboxStyles.disabled : null
        ])}
      >
        <RawTextboxNumeric
          {...rest}
          ref={ref}
          className={createClassName([
            textboxStyles.input,
            textboxNumericStyles.input
          ])}
        />
        {typeof icon === 'undefined' ? null : (
          <div className={textboxStyles.icon}>{icon}</div>
        )}
        <div className={textboxStyles.border} />
        {variant === 'underline' ? (
          <div className={textboxStyles.underline} />
        ) : null}
      </div>
    )
  }
)
