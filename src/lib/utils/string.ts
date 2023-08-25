export function capitalizeString(str: string) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string')
  }

  if (str.length === 0) {
    return str
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}
