import type { ButtonHTMLAttributes, FC, ReactElement } from 'react'
import { classNamesJoin } from 'lib/classNamesJoin'

interface Props {
    children: ReactElement | string
    props?: ButtonHTMLAttributes<HTMLButtonElement>
    className?: string
    variant?: 'Transparent'
}

const Button: FC<Props> = ({ children, props, className, variant }) => {
  if (variant === 'Transparent') {
    return (
            <button
                className={classNamesJoin(className ?? '', 'backdrop-blur-[2px] bg-secondary/50 hover:bg-secondary/80 duration-300 rounded h-fit grid place-content-center outline-none')}
                {...props}
            >
            {children}
            </button>
    )
  }
  return (

        <button
            className={classNamesJoin(className ?? '', 'rounded bg-primary shadow-md hover:shadow-black/40 py-1 px-2 border-tertiary border-[2px] duration-300')}
            {...props}
        >
            {children}
        </button>
  )
}

export default Button
