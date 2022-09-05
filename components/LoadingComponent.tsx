import React, { ReactElement } from 'react'
import Loader from './Loader'

const LoadingComponent = ({ isLoading, isError, children }: { isLoading: boolean, isError: any, children: ReactElement }) => {
  if (isLoading) {
    return <div className='w-full grid place-content-center'><Loader /></div>
  }
  if (isError) {
    return <div>Error... Click to reaload</div>
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
