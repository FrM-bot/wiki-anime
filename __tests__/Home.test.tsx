import Home from '../components/Carrousel'
import { it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

describe.concurrent('pages/index.tsx', () => {
  render(<Home data={[]} />)
  it('', async () => {
    const component = screen.getAllByRole('div')
    console.log(component)
  })
})
