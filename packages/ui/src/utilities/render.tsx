import '../css/base.css'

import { FC, JSX } from 'react'

import { render as ReactRender } from 'react-dom'

export function render<P>(Plugin: FC<P>) {
  return function (rootNode: HTMLElement, props: P & JSX.IntrinsicAttributes) {
    ReactRender(<Plugin {...props} />, rootNode)
  }
}
