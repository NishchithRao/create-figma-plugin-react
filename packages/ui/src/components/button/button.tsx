import {
  KeyboardEvent,
  MouseEventHandler,
  forwardRef,
  useCallback
} from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { LoadingIndicator } from '../loading-indicator/loading-indicator.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { noop } from '../../utilities/no-op.js'
import styles from './button.module.css'

export interface ButtonProps
  extends FocusableComponentProps<HTMLButtonElement> {
  children: React.ReactNode
  danger?: boolean
  disabled?: boolean
  fullWidth?: boolean
  loading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  secondary?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (
  {
    children,
    danger = false,
    disabled = false,
    fullWidth = false,
    loading = false,
    onClick = noop,
    onKeyDown = noop,
    propagateEscapeKeyDown = true,
    secondary = false,
    ...rest
  },
  ref
) {
  const handleKeyDown = useCallback(
    function (event: KeyboardEvent<HTMLButtonElement>) {
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
        styles.button,
        secondary === true ? styles.secondary : styles.default,
        danger === true ? styles.danger : null,
        fullWidth === true ? styles.fullWidth : null,
        disabled === true ? styles.disabled : null,
        loading === true ? styles.loading : null
      ])}
    >
      {loading === true ? (
        <div className={styles.loadingIndicator}>
          <LoadingIndicator />
        </div>
      ) : null}
      <button
        {...rest}
        ref={ref}
        disabled={disabled === true}
        onClick={loading === true ? undefined : onClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className={styles.children}>{children}</div>
      </button>
    </div>
  )
})
