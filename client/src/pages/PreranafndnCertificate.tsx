import CertificatePasswordGate from '@/features/preranafndn-certificate/CertificatePasswordGate'
import PreranafndnCertificateApp from '@/features/preranafndn-certificate/PreranafndnCertificateApp'

export default function PreranafndnCertificate() {
  return (
    <CertificatePasswordGate>
      <PreranafndnCertificateApp />
    </CertificatePasswordGate>
  )
}
