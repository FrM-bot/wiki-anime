import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useFetch = (url: string) => {
  const { data, error } = useSWR(url, fetcher, { suspense: true })

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export const useFetchV2 = (urls: string[]) => {
  const { data, error } = useSWR(urls, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}
