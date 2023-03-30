import { ClassAttributes, createElement, InputHTMLAttributes, type ReactNode, type ElementType } from 'react'

function CustomCard ({ type, props, children }: { type: ElementType, props?: (InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>) | null | undefined, children: ReactNode[] | ReactNode }) {
  return createElement(type, { ...props, className: 'p-2 shadow-md rounded-md bg-tertiary' }, children)
}

export default CustomCard
