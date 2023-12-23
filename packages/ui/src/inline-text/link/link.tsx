import { KeyboardEvent, forwardRef, useCallback } from 'react'

import { Event } from '../../types/event-handler.js'
import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { noop } from '../../utilities/no-op.js'
import styles from './link.module.css'

export interface LinkProps extends FocusableComponentProps<HTMLAnchorElement> {
  children: React.ReactNode
  fullWidth?: boolean
  href: string
  target?: string
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function (
  {
    children,
    fullWidth = false,
    href,
    onKeyDown = noop,
    propagateEscapeKeyDown = true,
    target,
    ...rest
  },
  ref
) {
  const handleKeyDown = useCallback(
    function (event: KeyboardEvent<HTMLAnchorElement>) {
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
    <a
      {...rest}
      ref={ref}
      className={createClassName([
        styles.link,
        fullWidth === true ? styles.fullWidth : null
      ])}
      href={href}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      target={target}
    >
      {children}
    </a>
  )
})
