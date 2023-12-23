import { MutableRefObject, forwardRef, useEffect, useRef } from 'react'

import { EventHandler } from '../../types/event-handler.js'
import { IconButton } from '../icon-button/icon-button.js'
import { IconCross32 } from '../../icons/icon-32/icon-cross-32.js'
import { Text } from '../text/text.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { createFocusTrapKeyDownHandler } from '../../utilities/private/create-focus-trap-key-down-handler.js'
import { createPortal } from 'react-dom'
import { getCurrentFromRef } from '../../utilities/get-current-from-ref.js'
import { getFocusableElements } from '../../utilities/private/get-focusable-elements.js'
import styles from './modal.module.css'

export type ModalProps = {
  children: React.ReactNode
  closeButtonIcon?: JSX.Element
  closeButtonPosition?: ModalCloseButtonPosition
  open: boolean
  transition?: boolean
  onCloseButtonClick?: EventHandler.onClick<HTMLButtonElement>
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onOverlayClick?: EventHandler.onClick<HTMLDivElement>
  position?: ModalPosition
  title?: string
}

export type ModalCloseButtonPosition = 'left' | 'right'
export type ModalPosition = 'bottom' | 'center' | 'left' | 'right'

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function (
  {
    children,
    closeButtonIcon = <IconCross32 />,
    closeButtonPosition = 'right',
    open,
    transition = true,
    onCloseButtonClick,
    onEscapeKeyDown,
    onOverlayClick,
    position = 'center',
    title,
    ...rest
  },
  ref
): JSX.Element | null {
  const portalElementRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null)
  const modalElementsRef = useRef<HTMLDivElement[]>([]) // Stack of currently-open modals
  const previousFocusedElementRef: MutableRefObject<HTMLElement | null> =
    useRef<HTMLElement>(null)

  useEffect(function () {
    const portalElement = document.createElement('div')
    document.body.appendChild(portalElement)
    portalElementRef.current = portalElement
    return function () {
      document.body.removeChild(portalElement)
    }
  }, [])

  useEffect(
    function () {
      const portalElement = getCurrentFromRef<HTMLDivElement>(portalElementRef)
      if (portalElement) {
        const focusTrapKeyDownHandler =
          createFocusTrapKeyDownHandler(portalElement)
        function handleTabKeyDown(event: KeyboardEvent) {
          if (open === true) {
            focusTrapKeyDownHandler(event)
          }
        }
        window.addEventListener('keydown', handleTabKeyDown)

        return function () {
          window.removeEventListener('keydown', handleTabKeyDown)
        }
      }
    },
    [open]
  )

  useEffect(
    function () {
      function handleEscapeKeyDown(event: KeyboardEvent) {
        const modalElements =
          getCurrentFromRef<Array<HTMLDivElement>>(modalElementsRef)
        const portalElement =
          getCurrentFromRef<HTMLDivElement>(portalElementRef)
        if (
          open === false ||
          event.key !== 'Escape' ||
          typeof onEscapeKeyDown === 'undefined' ||
          modalElements?.[modalElements.length - 1] !== portalElement
        ) {
          return
        }
        onEscapeKeyDown(event)
      }
      window.addEventListener('keydown', handleEscapeKeyDown)
      return function () {
        window.removeEventListener('keydown', handleEscapeKeyDown)
      }
    },
    [open, onEscapeKeyDown]
  )

  useEffect(
    function () {
      const modalElements =
        getCurrentFromRef<Array<HTMLDivElement>>(modalElementsRef)
      const portalElement = getCurrentFromRef<HTMLDivElement>(portalElementRef)
      const bodyElement = document.body
      if (open === true) {
        if (modalElements?.length === 0) {
          const hasScrollbar = bodyElement.scrollHeight > window.innerHeight
          bodyElement.style.cssText += `position:fixed;overflow-y:${
            hasScrollbar === true ? 'scroll' : 'hidden'
          };width:100%;`
        }
        if (portalElement) {
          modalElements?.push(portalElement)
          portalElement.style.cssText =
            'position:absolute;top:0;left:0;bottom:0;right:0;z-index:1'
          previousFocusedElementRef.current =
            document.activeElement as HTMLElement
          const focusableElements = getFocusableElements(portalElement)
          if (focusableElements.length > 0) {
            focusableElements[0].focus()
          } else {
            previousFocusedElementRef.current.blur()
          }
        }
      } else {
        if (modalElements?.length === 1) {
          bodyElement.style.removeProperty('position')
          bodyElement.style.removeProperty('overflow-y')
          bodyElement.style.removeProperty('width')
        }
        modalElements?.pop()
        if (portalElement) portalElement.style.cssText = 'position:static'
      }
      return function () {
        if (previousFocusedElementRef.current !== null) {
          previousFocusedElementRef.current.focus()
        }
      }
    },
    [open]
  )

  const portalElement = getCurrentFromRef<HTMLDivElement>(portalElementRef)
  if (!portalElement) return null
  return createPortal(
    <div ref={ref}>
      <div
        {...rest}
        className={createClassName([
          styles.modal,
          open === true ? styles.open : null,
          transition === false ? styles.noTransition : null,
          styles[position]
        ])}
      >
        {children}
        {typeof onCloseButtonClick === 'undefined' &&
        typeof title === 'undefined' ? null : (
          <div className={styles.topBar}>
            <div className={styles.title}>
              {typeof title === 'undefined' ? null : (
                <Text>
                  <strong>{title}</strong>
                </Text>
              )}
            </div>
            {typeof onCloseButtonClick === 'undefined' ? null : (
              <div
                className={
                  closeButtonPosition === 'left'
                    ? styles.closeButtonLeft
                    : undefined
                }
              >
                <IconButton onClick={onCloseButtonClick}>
                  {closeButtonIcon}
                </IconButton>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={styles.overlay}
        onClick={
          typeof onOverlayClick === 'undefined' ? undefined : onOverlayClick
        }
      />
    </div>,
    portalElement
  )
})
