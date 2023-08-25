import { MainContentData, type MainContent } from "$lib/types"

export function checkMainType(type?: string): MainContent {
  const mainTypes = ['anime', 'manga'] as unknown as MainContent
  if (!type) {
    return MainContentData.Anime
  }
  if (mainTypes.includes(type)) {
    return type as MainContent
  }
  throw new Error('Error Type')
}
