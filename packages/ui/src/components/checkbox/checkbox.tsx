import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  forwardRef,
  useCallback
} from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { IconControlCheckboxChecked12 } from '../../icons/icon-12/icon-control-checkbox-checked-12.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { noop } from '../../utilities/no-op.js'
import styles from './checkbox.module.css'

export interface CheckboxProps
  extends FocusableComponentProps<HTMLInputElement> {
  children: React.ReactNode
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value?: boolean) => void
  value: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function (
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
    function (event: ChangeEvent<HTMLInputElement>) {
      onChange(event)
      const newValue = event.currentTarget.checked === true
      onValueChange(newValue)
    },
    [onChange, onValueChange]
  )

  const handleKeyDown = useCallback(
    function (event: KeyboardEvent<HTMLInputElement>) {
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
        styles.checkbox,
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
      <div className={styles.fill}>
        {value === true ? (
          <div className={styles.checkIcon}>
            <IconControlCheckboxChecked12 />
          </div>
        ) : null}
      </div>
      <div className={styles.border} />
      <div className={styles.children}>{children}</div>
    </label>
  )
})
