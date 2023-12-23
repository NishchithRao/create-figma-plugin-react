import { Event, EventHandler } from '../../types/event-handler.js'
import { Stack, StackSpace } from '../../layout/stack/stack.js'
import { forwardRef, useCallback } from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { ITEM_ID_DATA_ATTRIBUTE_NAME } from '../../utilities/private/constants.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { noop } from '../../utilities/no-op.js'
import styles from './radio-buttons.module.css'

export interface RadioButtonsProps
  extends FocusableComponentProps<HTMLDivElement> {
  disabled?: boolean
  onChange?: EventHandler.onChange<HTMLInputElement>
  onValueChange?: EventHandler.onValueChange<string>
  options: Array<RadioButtonsOption>
  space?: StackSpace
  value: null | string
}
export type RadioButtonsOption = {
  disabled?: boolean
  children?: React.ReactNode
  value: string
}

export const RadioButtons = forwardRef<HTMLDivElement, RadioButtonsProps>(
  function (
    {
      disabled = false,
      onChange = noop,
      onKeyDown = noop,
      onValueChange = noop,
      options,
      propagateEscapeKeyDown = true,
      space = 'small',
      value,
      ...rest
    },
    ref
  ) {
    const handleChange = useCallback(
      function (event: Event.onChange<HTMLInputElement>) {
        onChange(event)
        const id = event.currentTarget.getAttribute(ITEM_ID_DATA_ATTRIBUTE_NAME)
        if (id === null) {
          console.warn('`id` is `null`')
        }
        const newValue = options[parseInt(id || '0', 10)].value
        onValueChange(newValue)
      },
      [onChange, onValueChange, options]
    )

    const handleKeyDown = useCallback(
      function (event: Event.onKeyDown<HTMLInputElement>) {
        onKeyDown(event)
        if (event.key === 'Escape') {
          if (propagateEscapeKeyDown === false) {
            event.stopPropagation()
          }
          event.currentTarget.blur()
        }
      },
      [onKeyDown, propagateEscapeKeyDown]
    )

    return (
      <div ref={ref} className={styles.radioButtons}>
        <Stack space={space}>
          {options.map(function (option: RadioButtonsOption, index: number) {
            const children =
              typeof option.children === 'undefined'
                ? `${option.value}`
                : option.children
            const isOptionDisabled =
              disabled === true || option.disabled === true
            return (
              <label
                key={index}
                className={createClassName([
                  styles.label,
                  isOptionDisabled === true ? styles.disabled : null
                ])}
              >
                <input
                  {...rest}
                  checked={value === option.value}
                  className={styles.input}
                  disabled={isOptionDisabled === true}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  type="radio"
                  value={`${option.value}`}
                  {...{ [ITEM_ID_DATA_ATTRIBUTE_NAME]: `${index}` }}
                />
                <div className={styles.fill} />
                <div className={styles.border} />
                <div className={styles.children}>{children}</div>
              </label>
            )
          })}
        </Stack>
      </div>
    )
  }
)
