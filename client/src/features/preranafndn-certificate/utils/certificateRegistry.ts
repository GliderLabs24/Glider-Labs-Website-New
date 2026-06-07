import type { IssuedCertificate } from '../types/issuedCertificate'

const STORAGE_KEY = 'prerana-issued-certificates'

export function loadIssuedCertificates(): IssuedCertificate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as IssuedCertificate[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveIssuedCertificate(record: IssuedCertificate): IssuedCertificate[] {
  const existing = loadIssuedCertificates()
  const next = [record, ...existing]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function getUsedCertificateIds(certificates = loadIssuedCertificates()): Set<string> {
  return new Set(certificates.map((c) => c.certificateId))
}

export function generateUniqueCertificateId(usedIds?: Set<string>): string {
  const year = new Date().getFullYear()
  const prefix = `PFM/${year}/`
  const ids = usedIds ?? getUsedCertificateIds()

  let maxSerial = 999
  for (const id of ids) {
    if (!id.startsWith(prefix)) continue
    const serial = Number.parseInt(id.slice(prefix.length), 10)
    if (!Number.isNaN(serial) && serial > maxSerial) maxSerial = serial
  }

  let next = maxSerial + 1
  let candidate = `${prefix}${next}`
  while (ids.has(candidate)) {
    next += 1
    candidate = `${prefix}${next}`
  }

  return candidate
}

export function searchCertificates(
  certificates: IssuedCertificate[],
  query: string,
): IssuedCertificate[] {
  const q = query.trim().toLowerCase()
  if (!q) return certificates
  return certificates.filter((c) => c.name.toLowerCase().includes(q))
}

export function createIssuedCertificate(
  certificateId: string,
  name: string,
  date: string,
  imageDataUrl: string,
): IssuedCertificate {
  return {
    id: crypto.randomUUID(),
    certificateId,
    name: name.trim(),
    date,
    issuedAt: new Date().toISOString(),
    imageDataUrl,
  }
}
