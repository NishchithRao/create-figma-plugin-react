import { Event, EventHandler } from '../../types/event-handler.js'
import { forwardRef, useCallback } from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { ITEM_ID_DATA_ATTRIBUTE_NAME } from '../../utilities/private/constants.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { noop } from '../../utilities/no-op.js'
import styles from './segmented-control.module.css'

export interface SegmentedControlProps
  extends FocusableComponentProps<HTMLInputElement> {
  disabled?: boolean
  onChange?: EventHandler.onChange<HTMLInputElement>
  onValueChange?: EventHandler.onValueChange<string>
  options: Array<SegmentedControlOption>
  value: string
}
export type SegmentedControlOption = {
  disabled?: boolean
  children?: React.ReactNode
  value: string
}

export const SegmentedControl = forwardRef<
  HTMLInputElement,
  SegmentedControlProps
>(function ({
  disabled = false,
  onChange = noop,
  onKeyDown = noop,
  onValueChange = noop,
  options,
  propagateEscapeKeyDown = true,
  value,
  ...rest
}) {
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
    <div
      className={createClassName([
        styles.segmentedControl,
        disabled === true ? styles.disabled : null
      ])}
    >
      <div className={styles.labels}>
        {options.map(function (option: SegmentedControlOption, index: number) {
          const children =
            typeof option.children === 'undefined'
              ? `${option.value}`
              : option.children
          const isOptionDisabled = disabled === true || option.disabled === true
          return (
            <label key={index} className={styles.label}>
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
              <div className={styles.children}>
                <div
                  className={
                    typeof children === 'string' ? styles.text : undefined
                  }
                >
                  {children}
                </div>
              </div>
            </label>
          )
        })}
      </div>
      <div className={styles.border} />
    </div>
  )
})
