import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useAnimes = (url: string) => {
  const { data, error } = useSWR(url, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}
