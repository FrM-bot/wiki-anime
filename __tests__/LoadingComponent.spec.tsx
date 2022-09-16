import { expect, it, describe } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import LoadingComponent, { errorText } from '../components/LoadingComponent'

describe.concurrent('<LoadingComponent />', () => {
  const textContent = 'Content'
  it('Render content if isLoading is false and isError is undefined', () => {
    render(<LoadingComponent isError={undefined} isLoading={false}><p>{textContent}</p></LoadingComponent>)
    const divLoader = within(screen.getByText(textContent))
    expect(divLoader).toBeDefined()
  })
  it('Render loader if isLoading is true and isError is undefined', () => {
    render(<LoadingComponent isError={undefined} isLoading={true}><p>{textContent}</p></LoadingComponent>)
    const divLoader = within(screen.getByRole('loader'))
    expect(divLoader).toBeDefined()
  })
  it('Render error message if isLoading is false and isError is exist', () => {
    render(<LoadingComponent isError={{ error: 'error status 4**' }} isLoading={false}><p>{textContent}</p></LoadingComponent>)
    const divLoader = within(screen.getByText(errorText))
    expect(divLoader).toBeDefined()
  })
})
