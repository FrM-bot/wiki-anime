export function fromObjectQueriesToUrl({
  queries,
  baseUrl
}: {
  queries: { [k: string]: string }
  baseUrl: string | URL
}): URL | undefined {
  let url
  try {
    url = new URL(baseUrl)
  } catch {
    return
  }
  const params = new URLSearchParams(url.search)

  Object.entries(queries).forEach(([key, value]) => {
    if (value) {
      params.append(key, String(value))
    }
  })
  url.search = params.toString()
  return url
}

export function fromUrlStringToObject({ url }: { url: string }) {
  let objectUrl
  try {
    objectUrl = new URL(url)
  } catch {
    return
  }
  return objectUrl
}
