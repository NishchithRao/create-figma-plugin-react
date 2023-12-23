import { forwardRef } from 'react'
import style from './preview.module.css'

export type PreviewProps = {
  children: React.ReactNode
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(function (
  { children, ...rest },
  ref
) {
  return (
    <div {...rest} ref={ref} className={style.preview}>
      {children}
    </div>
  )
})
