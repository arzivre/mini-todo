export const fetcherWithToken = async (url, token) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    let text = await response.text()

    const data = text ? JSON.parse(text) : null

    if (response.ok) {
      return data
    } else if (response.statusCode === 401) {
      //@ts-ignore
      const error = new NotAuthorizedError(response.statusMessage)
      error.status = response.status
      throw error
    }

    const error = new Error(response.statusText)
    error.response = response
    error.status = response.status
    error.data = data
    throw error
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message }
    }
    throw error
  }
}
