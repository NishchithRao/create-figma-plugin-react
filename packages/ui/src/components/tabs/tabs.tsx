import { Event, EventHandler } from '../../types/event-handler.js'
import { Fragment, forwardRef, useCallback } from 'react'

import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { ITEM_ID_DATA_ATTRIBUTE_NAME } from '../../utilities/private/constants.js'
import { noop } from '../../utilities/no-op.js'
import styles from './tabs.module.css'

export interface TabsProps extends FocusableComponentProps<HTMLDivElement> {
  onChange?: EventHandler.onChange<HTMLInputElement>
  onValueChange?: EventHandler.onValueChange<string>
  options: Array<TabsOption>
  value: null | string
}
export type TabsOption = {
  children: React.ReactNode
  value: string
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function (
  {
    onChange = noop,
    onKeyDown = noop,
    onValueChange = noop,
    options,
    propagateEscapeKeyDown = true,
    value,
    ...rest
  },
  ref
) {
  const handleChange = useCallback(
    function (event: Event.onChange<HTMLInputElement>) {
      onChange(event)
      const id = event.currentTarget.getAttribute(ITEM_ID_DATA_ATTRIBUTE_NAME)
      if (id === null) {
        console.warn('`id` is `null`')
      }
      const newValue = options[parseInt(id || '0', 10)].value
      onValueChange(newValue)
    },
    [onChange, onValueChange, options]
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

  const activeOption = options.find(function (option: TabsOption): boolean {
    return option.value === value
  })

  return (
    <Fragment>
      <div ref={ref} className={styles.tabs}>
        {options.map(function (option: TabsOption, index: number) {
          return (
            <label key={index} className={styles.label}>
              <input
                {...rest}
                checked={value === option.value}
                className={styles.input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                type="radio"
                value={option.value}
                {...{ [ITEM_ID_DATA_ATTRIBUTE_NAME]: `${index}` }}
              />
              <div className={styles.value}>{option.value}</div>
            </label>
          )
        })}
      </div>
      {typeof activeOption === 'undefined' ? null : (
        <div className={styles.children}>{activeOption.children}</div>
      )}
    </Fragment>
  )
})
