import { createClassName } from '../../utilities/create-class-name.js'
import { forwardRef } from 'react'
import styles from './banner.module.css'

export type BannerProps = {
  children: React.ReactNode
  icon: React.ReactNode
  variant?: BannerVariant
}
export type BannerVariant = 'success' | 'warning'

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function (
  { children, icon, variant, ...rest },
  ref
) {
  return (
    <div
      {...rest}
      ref={ref}
      className={createClassName([
        styles.banner,
        typeof variant === 'undefined' ? null : styles[variant]
      ])}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.children}>{children}</div>
    </div>
  )
})
