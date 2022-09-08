import { Button } from 'components/Button'
import Card from 'components/Card'
import ValidateAndRender from 'components/ValidateAndRender'
import ArrowIcon from 'icons/ArrowIcon'
import React, { ReactElement } from 'react'
import Layout from './Layout'

interface IProps {
    children: ReactElement
    h1?: string | undefined
    h2?: string | undefined
}

const LayoutDetails = ({ children, h1, h2 }: IProps) => {
  return (
        <Layout>
            <>
                <ValidateAndRender dataToValidate={[h1]}>
                    <div className='flex flex-wrap gap-2 mb-4'>
                        <Card className='w-fit'>
                            <h1 className='text-xl'>{h1}</h1>
                        </Card>
                        <ValidateAndRender dataToValidate={[h2]}>
                            <Card className='w-fit grid place-content-center'>
                                <h2 className='text-md'>{h2}</h2>
                            </Card>
                        </ValidateAndRender>
                    </div>
                </ValidateAndRender>
                <div className='grid sm:grid-cols-[minmax(80px,300px)_1fr] gap-2'>
                    {children}
                </div>
                <div className='sticky flex justify-end bottom-3'>
                    <Button><ArrowIcon props={{ style: { transform: 'rotate(-90deg)' }, onClick: () => window.scroll(0, 0) }} /></Button>
                </div>
            </>
        </Layout>
  )
}

export default LayoutDetails
