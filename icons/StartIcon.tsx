import { SVGAttributes } from 'react'

const StartIcon = ({ props }: { props?: SVGAttributes<SVGSVGElement> }) => {
  return (
    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="m7.5 11.5-5 3 2-5.131-4-3.869h5l2-5 2 5h5l-4 4 2 5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)"/>
    </svg>
  )
}

export default StartIcon
