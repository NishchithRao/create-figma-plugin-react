import { KeyboardEvent, KeyboardEventHandler } from 'react'

import { EventHandler } from './event-handler.js'

export interface FocusableComponentProps<Target extends EventTarget> {
  onKeyDown?: KeyboardEventHandler<Target>
  propagateEscapeKeyDown?: boolean
}
