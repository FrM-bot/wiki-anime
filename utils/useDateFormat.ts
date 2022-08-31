
export const setFormat = (date: number | Date | string, locale?: string, option?: string) =>
  new Intl.DateTimeFormat('en-EN', { dateStyle: 'long' }).format(new Date(date))
