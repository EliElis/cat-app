export function firebaseErrorHandler(error) {
  switch (error.code) {
    case 'auth/user-not-found':
      return "User with current credentials doesn't exist"
    case 'auth/invalid-email':
      return 'Invalid e-mail'
    case 'auth/email-already-exists':
    case 'auth/email-already-in-use':
      return 'User with current e-mail already exists'
    case 'auth/network-request-failed':
      return 'Network connection issue'
    case 'auth/invalid-login-credentials':
      return 'Invalid login credentials'
    default:
      return error
  }
}

export function buildSlug(data, id) {
  const name = encodeURI(data?.name) ?? ''
  return `${name}-${++id}`
}

export async function getApiData(url) {
  const resp = await fetch(url)
  if (!resp.ok) {
    const message = `An error has occured: ${resp.status}`
    throw new Error(message)
  }

  return await resp.json()
}

export function checkIfLogged(store) {
  return store?.userData?.email && store?.userData?.email?.length > 0
}
