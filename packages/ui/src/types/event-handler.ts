/* eslint-disable @typescript-eslint/no-namespace */

import {
  ChangeEventHandler,
  ClipboardEventHandler,
  DragEventHandler,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler
} from 'react'

type First<T extends never[]> = T[0]

type FirstArgument<EventHandler extends ((...args: any) => any) | undefined> =
  First<Parameters<NonNullable<EventHandler>>>

export namespace EventHandler {
  export type onBlur<Target extends EventTarget> = FocusEventHandler<Target>
  export type onChange<Target extends EventTarget> = ChangeEventHandler<Target>
  export type onClick<Target extends EventTarget> = MouseEventHandler<Target>
  export type onDragEnd<Target extends EventTarget> = DragEventHandler<Target>
  export type onDragEnter<Target extends EventTarget> = DragEventHandler<Target>
  export type onDragOver<Target extends EventTarget> = DragEventHandler<Target>
  export type onDrop<Target extends EventTarget> = DragEventHandler<Target>
  export type onFocus<Target extends EventTarget> = FocusEventHandler<Target>
  export type onInput<Target extends EventTarget> = FormEventHandler<Target>
  export type onKeyDown<Target extends EventTarget> =
    KeyboardEventHandler<Target>
  export type onMouseDown<Target extends EventTarget> =
    MouseEventHandler<Target>
  export type onMouseMove<Target extends EventTarget> =
    MouseEventHandler<Target>
  export type onMouseUp<Target extends EventTarget> = MouseEventHandler<Target>
  export type onPaste<Target extends EventTarget> =
    ClipboardEventHandler<Target>
  export type onSelectedFiles = (files: Array<File>) => void
  export type onValueChange<Value> = (value: Value) => void
}

export namespace Event {
  export type onBlur<Target extends EventTarget> = FirstArgument<
    EventHandler.onBlur<Target>
  >
  export type onChange<Target extends EventTarget> = FirstArgument<
    EventHandler.onChange<Target>
  >
  export type onClick<Target extends EventTarget> = FirstArgument<
    EventHandler.onClick<Target>
  >
  export type onDragEnd<Target extends EventTarget> = FirstArgument<
    EventHandler.onDragEnd<Target>
  >
  export type onDragEnter<Target extends EventTarget> = FirstArgument<
    EventHandler.onDragEnter<Target>
  >
  export type onDragOver<Target extends EventTarget> = FirstArgument<
    EventHandler.onDragOver<Target>
  >
  export type onDrop<Target extends EventTarget> = FirstArgument<
    EventHandler.onDrop<Target>
  >
  export type onFocus<Target extends EventTarget> = FirstArgument<
    EventHandler.onFocus<Target>
  >
  export type onInput<Target extends EventTarget> = FirstArgument<
    EventHandler.onInput<Target>
  >
  export type onKeyDown<Target extends EventTarget> = FirstArgument<
    EventHandler.onKeyDown<Target>
  >
  export type onMouseDown<Target extends EventTarget> = FirstArgument<
    EventHandler.onMouseDown<Target>
  >
  export type onMouseMove<Target extends EventTarget> = FirstArgument<
    EventHandler.onMouseMove<Target>
  >
  export type onMouseUp<Target extends EventTarget> = FirstArgument<
    EventHandler.onMouseUp<Target>
  >
  export type onPaste<Target extends EventTarget> = FirstArgument<
    EventHandler.onPaste<Target>
  >
}
