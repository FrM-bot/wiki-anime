/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

export default function debounce (fn: (arg: any) => any, { wait = 1000, callFirst }: { wait: number, callFirst?: boolean }) {
  let timeout: any | null = null
  let debouncedFn: (() => void) | null = null

  const clear = function () {
    if (timeout) {
      clearTimeout(timeout)

      debouncedFn = null
      timeout = null
    }
  }

  const flush = function () {
    const call = debouncedFn
    clear()

    if (call) {
      call()
    }
  }

  const debounceWrapper = function (this: any, arg: any) {
    if (!wait) {
      return fn.apply(this, arguments as unknown as [arg: any])
    }

    const context = this as globalThis.ThisType<any>
    const args = arguments
    const callNow = callFirst && !timeout
    clear()

    debouncedFn = function () {
      fn.apply(context, args as unknown as [arg: any])
    }

    timeout = setTimeout(function () {
      timeout = null

      if (!callNow) {
        const call = debouncedFn
        debouncedFn = null

        return call?.()
      }
    }, wait)

    if (callNow) {
      debouncedFn()
    }
  }

  debounceWrapper.cancel = clear
  debounceWrapper.flush = flush

  return debounceWrapper
}
