import { Event, EventHandler } from '../../types/event-handler.js'
import { MutableRefObject, forwardRef, useCallback, useRef } from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { IconCross32 } from '../../icons/icon-32/icon-cross-32.js'
import { IconSearch32 } from '../../icons/icon-32/icon-search-32.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { getCurrentFromRef } from '../../utilities/get-current-from-ref.js'
import { noop } from '../../utilities/no-op.js'
import styles from './search-textbox.module.css'

const EMPTY_STRING = ''

export interface SearchTextboxProps
  extends FocusableComponentProps<HTMLInputElement> {
  clearOnEscapeKeyDown?: boolean
  disabled?: boolean
  onFocus?: EventHandler.onFocus<HTMLInputElement>
  onInput?: EventHandler.onInput<HTMLInputElement>
  onKeyDown?: EventHandler.onKeyDown<HTMLInputElement>
  onValueInput?: EventHandler.onValueChange<string>
  placeholder?: string
  spellCheck?: boolean
  value: string
}

export const SearchTextbox = forwardRef<HTMLInputElement, SearchTextboxProps>(
  function (
    {
      clearOnEscapeKeyDown = false,
      disabled = false,
      onFocus = noop,
      onInput = noop,
      onKeyDown = noop,
      onValueInput = noop,
      placeholder,
      propagateEscapeKeyDown = true,
      spellCheck = false,
      value,
      ...rest
    },
    ref
  ) {
    const inputElementRef: MutableRefObject<HTMLInputElement | null> =
      useRef<HTMLInputElement>(null)

    const handleClearButtonClick = useCallback(function () {
      const inputElement = getCurrentFromRef(inputElementRef)
      if (!inputElement) return
      inputElement.value = EMPTY_STRING
      const inputEvent = new window.Event('input', {
        bubbles: true,
        cancelable: true
      })
      inputElement.dispatchEvent(inputEvent)
      inputElement.focus()
    }, [])

    const handleFocus = useCallback(
      function (event: Event.onFocus<HTMLInputElement>) {
        onFocus(event)
        event.currentTarget.select()
      },
      [onFocus]
    )

    const handleInput = useCallback(
      function (event: Event.onInput<HTMLInputElement>) {
        onInput(event)
        const value = event.currentTarget.value
        onValueInput(value)
      },
      [onInput, onValueInput]
    )

    const handleKeyDown = useCallback(
      function (event: Event.onKeyDown<HTMLInputElement>) {
        onKeyDown(event)
        if (event.key === 'Escape') {
          if (clearOnEscapeKeyDown === true && value !== EMPTY_STRING) {
            event.stopPropagation() // Clear the value without bubbling up the `Escape` key press
            handleClearButtonClick()
            return
          }
          if (propagateEscapeKeyDown === false) {
            event.stopPropagation()
          }
          event.currentTarget.blur()
        }
      },
      [
        clearOnEscapeKeyDown,
        handleClearButtonClick,
        onKeyDown,
        propagateEscapeKeyDown,
        value
      ]
    )

    const refCallback = useCallback(
      function (inputElement: null | HTMLInputElement) {
        inputElementRef.current = inputElement
        if (ref === null) {
          return
        }
        if (typeof ref === 'function') {
          ref(inputElement)
          return
        }
        ref.current = inputElement
      },
      [ref]
    )

    return (
      <div
        className={createClassName([
          styles.searchTextbox,
          disabled === true ? styles.disabled : null
        ])}
      >
        <input
          {...rest}
          ref={refCallback}
          className={styles.input}
          disabled={disabled === true}
          onFocus={handleFocus}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          spellCheck={spellCheck}
          tabIndex={0}
          type="text"
          value={value}
        />
        <div className={styles.searchIcon}>
          <IconSearch32 />
        </div>
        {value === EMPTY_STRING || disabled === true ? null : (
          <button
            className={styles.clearButton}
            onClick={handleClearButtonClick}
            tabIndex={0}
          >
            <IconCross32 />
          </button>
        )}
      </div>
    )
  }
)
