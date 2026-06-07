import { FormEvent, useState } from 'react'
import { LOGO_SRC } from './config/certificateLayout'
import './CertificatePasswordGate.css'

const PASSWORD = 'Jyoti2026'
const AUTH_KEY = 'prerana-cert-auth'

interface CertificatePasswordGateProps {
  children: React.ReactNode
}

function isAuthenticated() {
  try {
    return sessionStorage.getItem(AUTH_KEY) === '1'
  } catch {
    return false
  }
}

export default function CertificatePasswordGate({ children }: CertificatePasswordGateProps) {
  const [unlocked, setUnlocked] = useState(isAuthenticated)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (password === PASSWORD) {
      try {
        sessionStorage.setItem(AUTH_KEY, '1')
      } catch {
        /* ignore */
      }
      setUnlocked(true)
      setError('')
      return
    }
    setError('Incorrect password. Please try again.')
    setPassword('')
  }

  if (unlocked) return <>{children}</>

  return (
    <div className="cert-password-gate">
      <div className="cert-password-gate__card">
        <img src={LOGO_SRC} alt="Prerana Foundation" className="cert-password-gate__logo" />
        <h1>Prerana Foundation</h1>
        <p>Enter password to access the certificate issuer</p>
        <form onSubmit={handleSubmit}>
          <label className="cert-password-gate__label" htmlFor="cert-password">
            Password
          </label>
          <input
            id="cert-password"
            type="password"
            className="cert-password-gate__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            autoFocus
          />
          {error && <p className="cert-password-gate__error">{error}</p>}
          <button type="submit" className="cert-password-gate__btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
