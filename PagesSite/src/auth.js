// Credentials are stored as SHA-256 hashes — never as plaintext.
// Default: username = Bobathon_UMB  /  password = Mainframe2026!
// To change: run `node -e "require('crypto').createHash('sha256').update('yourvalue').digest('hex') |> console.log"` and replace the hashes below.
// Then redeploy. Optionally set VITE_USERNAME_HASH and VITE_PASSWORD_HASH as GitHub repo secrets and
// reference them in vite.config.js define{} to avoid committing hashes to source.

export const USERNAME_HASH = import.meta.env.VITE_USERNAME_HASH ||
  'c6d248a374f46c08277535152b84a3a09870bf4a8b672f5286fcfdf4ec159394'

export const PASSWORD_HASH = import.meta.env.VITE_PASSWORD_HASH ||
  '534d2a97c0445ecb2400bcf5c09b83afab75119682563af976f77b3573a5e094'

const SESSION_KEY = 'bob-lab-auth'

export async function sha256(str) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  )
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function checkCredentials(username, password) {
  const [uHash, pHash] = await Promise.all([sha256(username), sha256(password)])
  return uHash === USERNAME_HASH && pHash === PASSWORD_HASH
}

export function isAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === 'true'
}

export function setAuthenticated() {
  sessionStorage.setItem(SESSION_KEY, 'true')
}

export function clearAuthenticated() {
  sessionStorage.removeItem(SESSION_KEY)
}
