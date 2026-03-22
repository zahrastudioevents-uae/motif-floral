const base = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || ''

export async function postJson<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const r = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!r.ok) {
    const t = await r.text()
    throw new Error(t || r.statusText)
  }
  return r.json() as Promise<T>
}
