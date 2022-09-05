import { ReactElement } from 'react'
import { TitleAndDescription } from './Text'

const ValidateAndRender = ({ title, data, children, dataToValidate }: { title?: string, data?: string | number | undefined, children?: ReactElement, dataToValidate?: any[] }) => {
  if (dataToValidate?.includes(undefined) || dataToValidate?.includes(null) || dataToValidate?.includes(0) || (!data && !children)) {
    return null
  }
  return title ? <TitleAndDescription title={title} description={data}>{children}</TitleAndDescription> : <>{children}</>
}
export default ValidateAndRender
