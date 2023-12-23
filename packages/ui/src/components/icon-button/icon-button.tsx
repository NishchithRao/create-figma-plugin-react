import { Event, EventHandler } from '../../types/event-handler.js'
import { forwardRef, useCallback } from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { noop } from '../../utilities/no-op.js'
import styles from './icon-button.module.css'

export interface IconButtonProps
  extends FocusableComponentProps<HTMLButtonElement> {
  children: React.ReactNode
  disabled?: boolean
  onClick?: EventHandler.onClick<HTMLButtonElement>
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function (
    {
      children,
      disabled = false,
      onClick,
      onKeyDown = noop,
      propagateEscapeKeyDown = true,
      ...rest
    },
    ref
  ) {
    const handleKeyDown = useCallback(
      function (event: Event.onKeyDown<HTMLButtonElement>) {
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
      <button
        {...rest}
        ref={ref}
        className={styles.iconButton}
        disabled={disabled === true}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className={styles.icon}>{children}</div>
      </button>
    )
  }
)
