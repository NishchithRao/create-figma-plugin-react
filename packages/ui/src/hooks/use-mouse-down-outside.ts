import { MutableRefObject, useEffect } from 'react'

import { getCurrentFromRef } from '../utilities/get-current-from-ref.js'

export function useMouseDownOutside<P = HTMLElement>(options: {
  ref: MutableRefObject<P>
  onMouseDownOutside: () => void
}): void {
  const { ref, onMouseDownOutside } = options
  useEffect(
    function (): () => void {
      function handleBlur() {
        // This is triggered when clicking outside the plugin `iframe`
        onMouseDownOutside()
      }
      function handleMouseDown(event: MouseEvent): void {
        const element = getCurrentFromRef(ref)
        if (
          element === event.target ||
          (element as HTMLElement).contains(event.target as HTMLElement)
        ) {
          return
        }
        onMouseDownOutside()
      }
      window.addEventListener('blur', handleBlur)
      window.addEventListener('mousedown', handleMouseDown)
      return function (): void {
        window.removeEventListener('blur', handleBlur)
        window.removeEventListener('mousedown', handleMouseDown)
      }
    },
    [ref, onMouseDownOutside]
  )
}
