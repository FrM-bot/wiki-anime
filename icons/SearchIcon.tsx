import { SVGAttributes } from 'react'

const SearchIcon = ({ props }: { props?: SVGAttributes<SVGSVGElement> }) => {
  return (
    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8.5" cy="8.5" r="5"/>
        <path d="m17.571 17.5-5.571-5.5"/>
      </g>
    </svg>
  )
}

export default SearchIcon
