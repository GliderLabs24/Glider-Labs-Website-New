import { useMemo, useState } from 'react'
import type { IssuedCertificate } from '../types/issuedCertificate'
import { searchCertificates } from '../utils/certificateRegistry'
import './CertificateRegistry.css'

interface CertificateRegistryProps {
  certificates: IssuedCertificate[]
}

function downloadCertificate(record: IssuedCertificate) {
  const link = document.createElement('a')
  const safeName = record.name.replace(/\s+/g, '_') || 'member'
  link.download = `Prerana_Certificate_${safeName}.png`
  link.href = record.imageDataUrl
  link.click()
}

function formatIssuedAt(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function CertificateRegistry({ certificates }: CertificateRegistryProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => searchCertificates(certificates, query),
    [certificates, query],
  )

  return (
    <section className="registry-panel">
      <div className="registry-panel__head">
        <div>
          <h2>Issued Certificates</h2>
          <p>All generated certificates saved in this browser</p>
        </div>
        <span className="registry-panel__count">{certificates.length} total</span>
      </div>

      <div className="registry-panel__search">
        <input
          type="search"
          className="form-input"
          placeholder="Search by member name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search certificates by name"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="registry-panel__empty">
          {certificates.length === 0
            ? 'No certificates generated yet. Download one to add it here.'
            : 'No certificates match your search.'}
        </div>
      ) : (
        <ul className="registry-list">
          {filtered.map((record) => (
            <li key={record.id} className="registry-item">
              <div className="registry-item__thumb">
                <img src={record.imageDataUrl} alt={record.name} />
              </div>
              <div className="registry-item__body">
                <p className="registry-item__name">{record.name}</p>
                <p className="registry-item__id">{record.certificateId}</p>
                <p className="registry-item__meta">
                  Issued {record.date} · {formatIssuedAt(record.issuedAt)}
                </p>
              </div>
              <button
                type="button"
                className="btn-secondary registry-item__download"
                onClick={() => downloadCertificate(record)}
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
