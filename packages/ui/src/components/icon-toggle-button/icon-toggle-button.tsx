import { Event, EventHandler } from '../../types/event-handler.js'
import { forwardRef, useCallback } from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { noop } from '../../utilities/no-op.js'
import styles from './icon-toggle-button.module.css'

export interface IconToggleButtonProps
  extends FocusableComponentProps<HTMLInputElement> {
  children: React.ReactNode
  disabled?: boolean
  onChange?: EventHandler.onChange<HTMLInputElement>
  onValueChange?: EventHandler.onValueChange<boolean>
  value: boolean
}

export const IconToggleButton = forwardRef<
  HTMLInputElement,
  IconToggleButtonProps
>(function (
  {
    children,
    disabled = false,
    onChange = noop,
    onKeyDown = noop,
    onValueChange = noop,
    propagateEscapeKeyDown = true,
    value,
    ...rest
  },
  ref
) {
  const handleChange = useCallback(
    function (event: Event.onChange<HTMLInputElement>) {
      onChange(event)
      const newValue = event.currentTarget.checked === true
      onValueChange(newValue)
    },
    [onChange, onValueChange]
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
    <label
      className={createClassName([
        styles.iconToggleButton,
        disabled === true ? styles.disabled : null
      ])}
    >
      <input
        {...rest}
        ref={ref}
        checked={value === true}
        className={styles.input}
        disabled={disabled === true}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        type="checkbox"
      />
      <div className={styles.box}>
        <div className={styles.icon}>{children}</div>
      </div>
    </label>
  )
})
