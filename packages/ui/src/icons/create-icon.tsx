import { IconColor } from '../types/colors.js'
import { forwardRef } from 'react'
import styles from './icon.module.css'

export type IconProps = {
  color?: IconColor
}

export function createIcon(
  path: string,
  options: { width: number; height: number }
) {
  const { width, height } = options
  return forwardRef<SVGSVGElement, IconProps>(function ({ color, ...rest }) {
    return (
      <svg
        {...rest}
        className={styles.icon}
        height={height}
        style={{
          fill:
            typeof color === 'undefined'
              ? 'currentColor'
              : `var(--figma-color-icon-${color})`
        }}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path clip-rule="evenodd" d={path} fill-rule="evenodd" />
      </svg>
    )
  })
}
