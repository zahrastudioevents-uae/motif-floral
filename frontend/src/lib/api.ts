/**
 * The forms post to the functions that sit beside the site, so the path stays
 * relative on purpose: same origin, no CORS, nothing to configure per deploy.
 *
 * An absolute base used to be configurable here, and it outlived the host it
 * pointed at: the build kept sending enquiries to an API that answered "Email
 * not configured" while the site itself looked fine. One address, one place to
 * configure, and the two cannot drift apart again.
 */
export async function postJson<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  let r: Response
  try {
    r = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('We could not reach the server.')
  }
  if (!r.ok) throw new Error(await readError(r))
  return (await r.json()) as T
}

/**
 * The server's wording when the visitor can act on it, ours when they cannot:
 * "Privacy consent is required" helps them, "Email not configured" only worries.
 */
async function readError(r: Response): Promise<string> {
  if (r.status >= 500) return 'We could not send your message.'
  try {
    const j = (await r.json()) as { error?: unknown; detail?: unknown }
    const detail =
      typeof j.error === 'string' ? j.error : typeof j.detail === 'string' ? j.detail : ''
    if (detail) return detail
  } catch {
    // Not JSON, so there is nothing worth quoting back.
  }
  return 'We could not send your message.'
}
