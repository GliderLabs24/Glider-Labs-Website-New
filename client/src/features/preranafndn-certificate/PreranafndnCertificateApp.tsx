import { useCallback, useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import Certificate from './components/Certificate'
import CertificateRegistry from './components/CertificateRegistry'
import PhotoAdjustModal from './components/PhotoAdjustModal'
import { LOGO_SRC } from './config/certificateLayout'
import type { IssuedCertificate } from './types/issuedCertificate'
import { formatCertificateDate } from './utils/certificate'
import {
  createIssuedCertificate,
  generateUniqueCertificateId,
  getUsedCertificateIds,
  loadIssuedCertificates,
  saveIssuedCertificate,
} from './utils/certificateRegistry'
import './prerana-certificate-app.css'

export default function PreranafndnCertificateApp() {
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [photoSource, setPhotoSource] = useState<string | null>(null)
  const [showPhotoAdjust, setShowPhotoAdjust] = useState(false)
  const [issuedCertificates, setIssuedCertificates] = useState<IssuedCertificate[]>(
    loadIssuedCertificates,
  )
  const [certificateId, setCertificateId] = useState(() =>
    generateUniqueCertificateId(getUsedCertificateIds(loadIssuedCertificates())),
  )
  const [date] = useState(() => formatCertificateDate())
  const [downloading, setDownloading] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.title = 'Prerana Foundation — Certificate Generator | Glider Labs'
  }, [])

  const issueNextCertificateId = useCallback((records: IssuedCertificate[]) => {
    setCertificateId(generateUniqueCertificateId(getUsedCertificateIds(records)))
  }, [])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPhotoSource(result)
      setPhotoUrl(null)
      setShowPhotoAdjust(true)
    }
    reader.readAsDataURL(file)
  }

  const handlePhotoConfirm = (cropped: string) => {
    setPhotoUrl(cropped)
    setShowPhotoAdjust(false)
  }

  const handlePhotoCancel = () => {
    setPhotoSource(null)
    setPhotoUrl(null)
    setShowPhotoAdjust(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleRemovePhoto = () => {
    setPhotoSource(null)
    setPhotoUrl(null)
    setShowPhotoAdjust(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleReAdjust = () => {
    if (photoSource) setShowPhotoAdjust(true)
  }

  const handleDownload = useCallback(async () => {
    const element = certificateRef.current?.querySelector('#certificate') as HTMLElement | null
    if (!element) return

    setDownloading(true)
    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      })

      const imageDataUrl = canvas.toDataURL('image/png')
      const trimmedName = name.trim()

      const link = document.createElement('a')
      const safeName = trimmedName.replace(/\s+/g, '_') || 'member'
      link.download = `Prerana_Certificate_${safeName}.png`
      link.href = imageDataUrl
      link.click()

      const record = createIssuedCertificate(certificateId, trimmedName, date, imageDataUrl)
      const updated = saveIssuedCertificate(record)
      setIssuedCertificates(updated)
      issueNextCertificateId(updated)
    } catch {
      alert('Failed to download certificate. Please try again.')
    } finally {
      setDownloading(false)
    }
  }, [name, certificateId, date, issueNextCertificateId])

  const canDownload = name.trim().length > 0 && photoUrl

  return (
    <div className="prerana-cert-app">
      <header className="prerana-cert-app__header">
        <img src={LOGO_SRC} alt="Prerana Foundation Kanpur" className="prerana-cert-app__logo" />
        <h1>Prerana Foundation</h1>
        <p>Membership Certificate Issuer</p>
      </header>

      <main className="prerana-cert-app__main">
        <section className="form-panel">
          <div className="form-panel__head">
            <h2>Issue Certificate</h2>
            <p>Fill details below to generate membership certificate</p>
          </div>

          <div className="form-section">
            <label className="form-label" htmlFor="member-name">
              Member Name
            </label>
            <input
              id="member-name"
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              autoComplete="name"
            />
          </div>

          <div className="form-section">
            <span className="form-label">Profile Photo</span>

            {!photoUrl ? (
              <label className="upload-box">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  hidden
                />
                <span className="upload-box__icon">+</span>
                <span className="upload-box__title">Upload photo</span>
                <span className="upload-box__sub">Adjust position in square frame after upload</span>
              </label>
            ) : (
              <div className="photo-done">
                <div className="photo-done__thumb">
                  <img src={photoUrl} alt="Selected" />
                </div>
                <p className="photo-done__text">Photo adjusted and ready</p>
                <div className="photo-editor__actions">
                  <button type="button" className="btn-secondary" onClick={handleReAdjust}>
                    Adjust again
                  </button>
                  <label className="btn-ghost">
                    Change photo
                    <input type="file" accept="image/*" onChange={handlePhotoChange} hidden />
                  </label>
                  <button type="button" className="btn-ghost" onClick={handleRemovePhoto}>
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="form-meta">
            <div className="form-meta__item">
              <span className="form-meta__label">Certificate ID</span>
              <span className="form-meta__value">{certificateId}</span>
            </div>
            <div className="form-meta__item">
              <span className="form-meta__label">Issued Date</span>
              <span className="form-meta__value">{date}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-download"
            onClick={handleDownload}
            disabled={!canDownload || downloading}
          >
            {downloading ? 'Generating…' : 'Download Certificate'}
          </button>

          {!canDownload && (
            <p className="form-hint">
              Enter name, upload photo, and adjust the square frame area.
            </p>
          )}
        </section>

        <section className="preview-panel" ref={certificateRef}>
          <h2>Preview</h2>
          <div className="preview-scroll">
            <Certificate
              name={name}
              photoUrl={photoUrl}
              certificateId={certificateId}
              date={date}
            />
          </div>
        </section>
      </main>

      <div className="prerana-cert-app__registry">
        <CertificateRegistry certificates={issuedCertificates} />
      </div>

      <footer className="prerana-cert-app__footer">
        <a
          href="https://www.glider.world"
          target="_blank"
          rel="noopener noreferrer"
          className="prerana-cert-app__footer-link"
        >
          © 2026 Glider Labs. All rights reserved.
        </a>
      </footer>

      {showPhotoAdjust && photoSource && (
        <PhotoAdjustModal
          key={photoSource}
          sourceUrl={photoSource}
          onConfirm={handlePhotoConfirm}
          onCancel={handlePhotoCancel}
        />
      )}
    </div>
  )
}
