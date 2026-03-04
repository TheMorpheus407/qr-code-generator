/**
 * Gets the URL from the ?url= query parameter.
 * Returns the URL string if present, null otherwise.
 */
export function getUrlFromParams() {
  const params = new URLSearchParams(window.location.search)
  return params.get('url')
}
