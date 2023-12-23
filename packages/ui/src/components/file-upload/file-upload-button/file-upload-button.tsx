import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  forwardRef,
  useCallback
} from 'react'

import { FocusableComponentProps } from '../../../types/focusable-component-props.js'
import { LoadingIndicator } from '../../loading-indicator/loading-indicator.js'
import buttonStyles from '../../button/button.module.css'
import { createClassName } from '../../../utilities/create-class-name.js'
import { fileComparator } from '../private/file-comparator.js'
import fileUploadButtonStyles from './file-upload-button.module.css'
import { noop } from '../../../utilities/no-op.js'

export interface FileUploadButtonProps
  extends FocusableComponentProps<HTMLInputElement> {
  acceptedFileTypes?: Array<string>
  children: React.ReactNode
  disabled?: boolean
  fullWidth?: boolean
  loading?: boolean
  multiple?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onClick?: MouseEventHandler<HTMLInputElement>
  onMouseDown?: MouseEventHandler<HTMLInputElement>
  onSelectedFiles?: (
    files: Array<ChangeEvent<HTMLInputElement>['target']['files']>
  ) => void
  secondary?: boolean
}

export const FileUploadButton = forwardRef<
  HTMLInputElement,
  FileUploadButtonProps
>(function (
  {
    acceptedFileTypes = [],
    children,
    disabled = false,
    fullWidth = false,
    loading = false,
    multiple = false,
    onChange = noop,
    onClick = noop,
    onKeyDown = noop,
    onMouseDown = noop,
    onSelectedFiles = noop,
    propagateEscapeKeyDown = true,
    secondary = false,
    ...rest
  },
  ref
) {
  const handleChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>) {
      onChange(event)
      const fileList = event.currentTarget.files
      if (fileList === null) {
        console.warn('`event.currentTarget.files` is `null`')
      }
      const files = parseFileList(fileList)
      if (files.length > 0) {
        onSelectedFiles(files)
      }
    },
    [onChange, onSelectedFiles]
  )

  const handleClick = useCallback(
    function (event: MouseEvent<HTMLInputElement>) {
      onClick(event)
      if (loading === true) {
        event.preventDefault()
      }
    },
    [onClick, loading]
  )

  const handleMouseDown = useCallback(
    function (event: MouseEvent<HTMLInputElement>) {
      onMouseDown(event)
      event.currentTarget.focus()
    },
    [onMouseDown]
  )

  const handleKeyDown = useCallback(
    function (event: KeyboardEvent<HTMLInputElement>) {
      onKeyDown(event)
      if (event.key === 'Escape') {
        if (propagateEscapeKeyDown === false) {
          event.stopPropagation()
        }
        event.currentTarget.blur()
      }
    },
    [onKeyDown, propagateEscapeKeyDown]
  )

  return (
    <div
      className={createClassName([
        buttonStyles.button,
        secondary === true ? buttonStyles.secondary : buttonStyles.default,
        secondary === true
          ? fileUploadButtonStyles.secondary
          : fileUploadButtonStyles.default,
        fullWidth === true ? buttonStyles.fullWidth : null,
        disabled === true ? buttonStyles.disabled : null,
        disabled === true ? fileUploadButtonStyles.disabled : null,
        loading === true ? buttonStyles.loading : null
      ])}
    >
      {loading === true ? (
        <div className={buttonStyles.loadingIndicator}>
          <LoadingIndicator />
        </div>
      ) : null}
      <input
        {...rest}
        ref={ref}
        accept={
          acceptedFileTypes.length === 0
            ? undefined
            : acceptedFileTypes.join(',')
        }
        className={fileUploadButtonStyles.input}
        disabled={disabled === true}
        multiple={multiple}
        onChange={handleChange}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        tabIndex={0}
        title=""
        type="file"
      />
      <button disabled={disabled === true} tabIndex={-1}>
        <div className={buttonStyles.children}>{children}</div>
      </button>
    </div>
  )
})

function parseFileList(fileList: FileList | null) {
  return Array.prototype.slice.call(fileList || []).sort(fileComparator)
}
