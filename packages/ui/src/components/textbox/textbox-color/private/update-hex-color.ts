import {
  convertHexColorToRgbColor,
  convertRgbColorToHexColor
} from '@create-figma-plugin/utilities'

export function updateHexColor(hexColor: string, delta: number): string | null {
  const rgbColor = convertHexColorToRgbColor(hexColor)
  if (rgbColor === null) {
    console.warn('Invalid `hexColor`')
    return null
  }
  const { r, g, b } = rgbColor
  const result = convertRgbColorToHexColor({
    b: updateValue(b, delta),
    g: updateValue(g, delta),
    r: updateValue(r, delta)
  })
  if (result === null) {
    console.warn('Invalid `rgbColor`')
  }
  return result
}

function updateValue(value: number, delta: number): number {
  const newValue = value * 255 + delta
  return Math.min(Math.max(newValue, 0), 255) / 255
}
