
import { FieldErrorProps,
  Group,
  GroupProps,
  InputProps,
  LabelProps,
  FieldError as RACFieldError,
  Input as RACInput,
  Label as RACLabel,
  TextArea as RACTextArea,
  Text,
  TextProps,
  composeRenderProps } from "react-aria-components"
import { twMerge } from 'tailwind-merge'
import { composeTailwindRenderProps } from "./utils"
import { fieldGroupStyles } from "./styles/field"

export function Label(props: LabelProps) {
  return <RACLabel {...props} className={twMerge('text-sm text-gray-500 dark:text-zinc-400 font-medium cursor-default w-fit', props.className)} />
}

export function Description(props: TextProps) {
  return <Text {...props} slot="description" className={twMerge('text-sm text-gray-600', props.className)} />
}

export function FieldError(props: FieldErrorProps) {
  return <RACFieldError {...props} className={composeTailwindRenderProps(props.className, 'text-sm text-red-600 forced-colors:text-[Mark]')} />
}

export function FieldGroup(props: GroupProps) {
  return <Group {...props} className={composeRenderProps(props.className, (className, renderProps) => fieldGroupStyles({...renderProps, className}))} />
}

export function Input(props: InputProps) {
  return <RACInput {...props} className={composeTailwindRenderProps(props.className, 'px-2 py-1.5 flex-1 min-w-0 outline outline-0 bg-white dark:bg-zinc-900 text-sm text-gray-800 dark:text-zinc-200 disabled:text-gray-200 dark:disabled:text-zinc-600')} />
}

export function TextArea(props: React.ComponentProps<typeof RACTextArea>) {
  return (
    <RACTextArea
      {...props}
      className={composeTailwindRenderProps(props.className, 'px-2 py-1.5 flex-1 min-w-0 outline outline-0 bg-white dark:bg-zinc-900 text-sm text-gray-800 dark:text-zinc-200 disabled:text-gray-200 dark:disabled:text-zinc-600')}
    />
  )
}
