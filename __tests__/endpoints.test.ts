import { URL_SEARCH_ANIME, URL_SEARCH_MANGA } from 'services/endpoints'
import { describe, expect, it } from 'vitest'

// All tests within this suite will be run in parallel
describe.concurrent('Tests endpoints', () => {
  let q, type, min_score
  // let baseURL = 'https://api.jikan.moe/v4/anime'
  it('URL_SEARCH_ANIME returns the correct value', async () => {
    q = 'death'
    type = 'tv'
    min_score = 7
    const resultURL = URL_SEARCH_ANIME({ querys: { q, type, min_score } })
    expect(resultURL).toBe(`https://api.jikan.moe/v4/anime?q=${q}&type=${type}&min_score=${min_score}`)
  })
  it('URL_SEARCH_MANGA returns the correct value', async () => {
    q = 'berserk'
    type = 'manga'
    min_score = 8
    const resultURL = URL_SEARCH_MANGA({ querys: { q, type, min_score } })
    expect(resultURL).toBe(`https://api.jikan.moe/v4/manga?q=${q}&type=${type}&min_score=${min_score}`)
  })
})
