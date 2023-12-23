import { MutableRefObject } from 'react'

export function getCurrentFromRef<R>(
  ref: MutableRefObject<R | null>
): R | null {
  if (ref.current === null) {
    console.warn('`ref.current` is `undefined`')
    return null
  }
  return ref.current
}
