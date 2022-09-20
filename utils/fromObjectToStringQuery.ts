export const fromObjectToStringQuery = (object: any, baseString = '') => {
  Object.entries(object)?.forEach(([key, value], index) => {
    if (value) {
      baseString =
          index === 0
            ? baseString.concat(`?${key}=${value}`)
            : baseString.concat(`&${key}=${value}`)
    }
  })
  return baseString
}
