export const setNumberFormat = ({ value, locales, option }: {value: number, locales?: string | string[] | undefined, option?: Intl.NumberFormatOptions | undefined}) => {
  try {
    return new Intl.NumberFormat(locales ?? 'en-EN', option ?? { notation: 'compact' }).format(value)
  } catch (error) {
    console.error(error)
  }
}
