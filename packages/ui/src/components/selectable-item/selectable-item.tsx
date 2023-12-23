import { Event, EventHandler } from '../../types/event-handler.js'
import { forwardRef, useCallback } from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { IconMenuCheckmarkChecked16 } from '../../icons/icon-16/icon-menu-checkmark-checked-16.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { noop } from '../../utilities/no-op.js'
import styles from './selectable-item.module.css'

export interface SelectableItemProps
  extends FocusableComponentProps<HTMLInputElement> {
  bold?: boolean
  children: React.ReactNode
  disabled?: boolean
  indent?: boolean
  onChange?: EventHandler.onChange<HTMLInputElement>
  onValueChange?: EventHandler.onValueChange<boolean>
  value: boolean
}

export const SelectableItem = forwardRef<HTMLInputElement, SelectableItemProps>(
  function (
    {
      bold = false,
      children,
      disabled = false,
      indent = false,
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
          styles.selectableItem,
          disabled === true ? styles.disabled : null,
          bold === true ? styles.bold : null,
          indent === true ? styles.indent : null
        ])}
      >
        <input
          {...rest}
          ref={ref}
          checked={value === true}
          className={styles.input}
          disabled={disabled === true}
          onChange={handleChange}
          onKeyDown={disabled === true ? undefined : handleKeyDown}
          tabIndex={0}
          type="checkbox"
        />
        <div className={styles.box} />
        <div className={styles.children}>{children}</div>
        {value === true ? (
          <div className={styles.icon}>
            <IconMenuCheckmarkChecked16 />
          </div>
        ) : null}
      </label>
    )
  }
)
