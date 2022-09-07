
export const setFormat = (date: number | Date | string, locale?: string, option?: string) => {
  try {
    return new Intl.DateTimeFormat('en-EN', { dateStyle: 'long' }).format(new Date(date))
  } catch (error) {
    console.error(error)
  }
}
