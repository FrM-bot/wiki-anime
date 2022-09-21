import NavFilters from '../components/NavFilters'
import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/dom'

describe.concurrent('components/NavFilters.tsx', () => {
  render(<NavFilters animeGenres={[]} mangaGenres={[]} defaultType='manga' defaultMaxScore={9} defaultMinScore={7} defaultLetter='berserk' defaultSubType='manhua' />)
  it('should have the default value(manga) in type select type passed through prop\'s', async () => {
    const component = screen.getByDisplayValue('manga')
    expect(component).toBeDefined()
  })
  it('should have the default value(9) in input max score passed through prop\'s', async () => {
    const component = screen.getByDisplayValue(9)
    expect(component).toBeDefined()
  })
  it('should have the default value(7) in input min score passed through prop\'s', async () => {
    const component = screen.getByDisplayValue(7)
    expect(component).toBeDefined()
  })
  it('should have the default value(berserk) in input letter passed through prop\'s', async () => {
    const component = screen.getByDisplayValue('berserk')
    expect(component).toBeDefined()
  })
  it('should have the default value(manga) in type select Sub type passed through prop\'s', async () => {
    const component = screen.getByDisplayValue('manhua')
    expect(component).toBeDefined()
  })
})
