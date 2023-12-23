import { Event, EventHandler } from '../../types/event-handler.js'
import {
  Fragment,
  KeyboardEvent,
  MouseEventHandler,
  forwardRef,
  useCallback
} from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { IconCaretRight16 } from '../../icons/icon-16/icon-caret-right-16.js'
import { noop } from '../../utilities/no-op.js'
import styles from './disclosure.module.css'

export interface DisclosureProps
  extends FocusableComponentProps<HTMLInputElement> {
  children: React.ReactNode
  onClick?: MouseEventHandler<HTMLInputElement>
  open: boolean
  title: string
}

export const Disclosure = forwardRef<HTMLInputElement, DisclosureProps>(
  function (
    {
      children,
      onClick = noop,
      onKeyDown = noop,
      open,
      propagateEscapeKeyDown = true,
      title,
      ...rest
    },
    ref
  ) {
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
      <Fragment>
        <label className={styles.label}>
          <input
            {...rest}
            ref={ref}
            checked={open === true}
            className={styles.input}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            type="checkbox"
          />
          <div className={styles.title}>
            <div className={styles.icon}>
              <IconCaretRight16 />
            </div>
            {title}
          </div>
        </label>
        {open === true ? (
          <div className={styles.children}>{children}</div>
        ) : null}
      </Fragment>
    )
  }
)
