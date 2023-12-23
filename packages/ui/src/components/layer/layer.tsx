import { Event, EventHandler } from '../../types/event-handler.js'
import { forwardRef, useCallback } from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { noop } from '../../utilities/no-op.js'
import styles from './layer.module.css'

export interface LayerProps extends FocusableComponentProps<HTMLInputElement> {
  bold?: boolean
  children: React.ReactNode
  component?: boolean
  description?: string
  icon: React.ReactNode
  onChange?: EventHandler.onChange<HTMLInputElement>
  onValueChange?: EventHandler.onValueChange<boolean>
  value: boolean
}

export const Layer = forwardRef<HTMLInputElement, LayerProps>(function (
  {
    bold = false,
    children,
    component = false,
    description,
    icon,
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
        styles.layer,
        bold === true ? styles.bold : null,
        component === true ? styles.component : null
      ])}
    >
      <input
        {...rest}
        ref={ref}
        checked={value === true}
        className={styles.input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        type="checkbox"
      />
      <div className={styles.box} />
      <div className={styles.icon}>{icon}</div>
      <div className={styles.children}>{children}</div>
      {typeof description === 'undefined' ? null : (
        <div className={styles.description}>{description}</div>
      )}
    </label>
  )
})
