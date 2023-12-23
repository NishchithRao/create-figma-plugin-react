import { Space } from '../../types/space.js'
import { forwardRef } from 'react'
import styles from './container.module.css'

export type ContainerProps = {
  children: React.ReactNode
  space: ContainerSpace
}
export type ContainerSpace = Space

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function (
  { space, ...rest },
  ref
) {
  return <div {...rest} ref={ref} className={styles[space]} />
})
