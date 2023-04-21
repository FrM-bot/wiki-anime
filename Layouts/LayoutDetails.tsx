import CustomCard from '@/components/CardDynamic'
// import Card from 'components/Card'
import ValidateAndRender from 'components/ValidateAndRender'
import { ReactElement } from 'react'
import Layout from './Layout'

interface IProps {
    children: ReactElement
    h1: string
    h2?: string | undefined
}

const LayoutDetails = ({ children, h1, h2 }: IProps) => {
  return (
        <Layout title={h1}>
            <>
                <ValidateAndRender dataToValidate={[h1]}>
                    <div className='flex flex-wrap gap-2 mb-4'>
                        <CustomCard type='h1'>
                            {h1}
                        </CustomCard>
                        <ValidateAndRender dataToValidate={[h2]}>
                            <CustomCard type='h1'>
                                {h2}
                            </CustomCard>
                        </ValidateAndRender>
                    </div>
                </ValidateAndRender>
                <div className='grid grid-cols-[minmax(80px,300px)_1fr] sm:grid-cols-1 xs:grid-cols-1 gap-2'>
                    {children}
                </div>
            </>
        </Layout>
  )
}

export default LayoutDetails
