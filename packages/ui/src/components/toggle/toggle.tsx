import { Event, EventHandler } from '../../types/event-handler.js'
import { forwardRef, useCallback } from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { noop } from '../../utilities/no-op.js'
import styles from './toggle.module.css'

export interface ToggleProps extends FocusableComponentProps<HTMLInputElement> {
  children: React.ReactNode
  disabled?: boolean
  onChange?: EventHandler.onChange<HTMLInputElement>
  onValueChange?: EventHandler.onValueChange<boolean>
  value: boolean
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function ({
  children,
  disabled = false,
  onChange = noop,
  onKeyDown = noop,
  onValueChange = noop,
  propagateEscapeKeyDown = true,
  value = false,
  ...rest
}) {
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
    [propagateEscapeKeyDown, onKeyDown]
  )

  return (
    <label
      className={createClassName([
        styles.toggle,
        disabled === true ? styles.disabled : null
      ])}
    >
      <input
        {...rest}
        checked={value === true}
        className={styles.input}
        disabled={disabled === true}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        type="checkbox"
      />
      <div className={styles.box} />
      <div className={styles.switch} />
      <div className={styles.children}>{children}</div>
    </label>
  )
})
