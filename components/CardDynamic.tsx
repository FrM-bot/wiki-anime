import { classNamesJoin } from 'lib/classNamesJoin'
import { ClassAttributes, createElement, InputHTMLAttributes, type ReactNode, type ElementType } from 'react'

interface CardDynamicProps {
  className?: string
  type: ElementType
  props?: (InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>) | null | undefined
  children: ReactNode[] | ReactNode
  variant?: 'v1'
}

// className='px-4 py-2 border-b bg-tertiary border-secondary my-2 rounded-md'

function CardDynamic ({ type, props, children, className, variant }: CardDynamicProps) {
  if (variant === 'v1') {
    return createElement(type, { ...props, className: classNamesJoin(className ?? '', 'px-4 py-2 border-b bg-tertiary border-secondary my-2 rounded-md') }, children)
  }
  return createElement(type, { ...props, className: classNamesJoin(className ?? '', 'p-2 shadow-md rounded-md bg-tertiary') }, children)
}

export default CardDynamic
