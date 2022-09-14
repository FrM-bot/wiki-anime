import { ReactElement } from 'react'
import Loader from './Loader'

export const errorText = 'An error has occurred. Reload the page or try again later.'

const LoadingComponent = ({ isLoading, isError, children }: { isLoading: boolean, isError: any, children: ReactElement }) => {
  if (isLoading) {
    return <div className='w-full grid place-content-center h-[40vh]'><Loader /></div>
  }
  if (isError) {
    return (
      <div>
        <p>
          {errorText}
        </p>
      </div>
    )
  }
  return (
    <>
      {
        children
      }
    </>
  )
}

export default LoadingComponent
