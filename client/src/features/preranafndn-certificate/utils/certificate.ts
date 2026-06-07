export { generateUniqueCertificateId as generateCertificateId } from './certificateRegistry'

export function formatCertificateDate(date = new Date()): string {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
