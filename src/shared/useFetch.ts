// type Callback = (...args: any) => void
import store from '@/store'

interface IParams {
  path: string,
  data?: {
    [key: string]: any // eslint-disable-line
  }
  formData?: FormData,
  url?: string
  // callback: Callback
}

const useFetch = async ({
  path, data, formData, url
}: IParams) => {
  // const url = 'https://api.findcreek.com'
  // eslint-disable-next-line
  if (typeof url === 'undefined') url = 'https://api.findcreek.com'

  if (formData) {
    if (!store.state.token) return null
    formData.append('token', `${store.state.token}`)

    try {
      const res = await fetch(`${url}/${path}/`, {
        method: 'POST',
        body: formData
      })

      const result = await res.json()
      return result
    } catch (error) {
      return {
        error: {
          error_code: '6',
          error_msg: 'Ошибка загрузки данных'
        }
      }
    }
  } else {
    const form = new FormData()

    if (!store.state.token) return null
    form.append('token', `${store.state.token}`)

    /* eslint-disable */
    if (data) {
      for (let [key, value] of Object.entries(data)) {
        form.append(key, value)
      }
    }
    /* eslint-enable */

    try {
      const res = await fetch(`${url}/${path}/`, {
        method: 'POST',
        body: form
      })

      const result = await res.json()
      return result
    } catch (error) {
      return {
        error: {
          error_code: '6',
          error_msg: 'Ошибка загрузки данных'
        }
      }
    }
  }
}

export default useFetch
