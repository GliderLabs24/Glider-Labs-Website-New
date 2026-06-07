const ASSET_BASE = '/assets/preranafndn-certificate'

export const TEMPLATE_SRC = `${ASSET_BASE}/certificate-template.png`
export const LOGO_SRC = `${ASSET_BASE}/prerana-logo.png`
export const SIGNATURE_JYOTI_SRC = `${ASSET_BASE}/signature-jyoti.png`
export const SIGNATURE_PRATYUSH_SRC = `${ASSET_BASE}/signature-pratyush.png`
export const SIGNATURE_DEBASIS_SRC = `${ASSET_BASE}/signature-debasis.png`

/** fontScale = fraction of certificate width (e.g. 0.024 ≈ 24px on 1024px template) */
export const LAYOUT = {
  certificateId: {
    top: '11.8%',
    left: '15.5%',
    fontScale: 0.0156,
    color: '#4a5d73',
    width: '13%',
  },
  date: {
    top: '11.8%',
    left: '84.5%',
    fontScale: 0.0156,
    color: '#4a5d73',
    width: '13%',
  },
  logo: { top: '2.2%', left: '50%', width: '17.5%' },
  name: { top: '62.5%', left: '50%', fontScale: 0.032, maxWidth: '70%' },
  photo: { top: '49.5%', left: '44.8%', width: '10.9%', height: '12.8%' },
  signatureJyoti: { top: '68.2%', left: '23%', width: '32.6%', rotate: '12deg' },
  signaturePratyush: { top: '74.8%', left: '50%', width: '13.2%', rotate: '12deg' },
  signatureDebasis: { top: '72.2%', left: '77%', width: '17.5%', rotate: '12deg' },
} as const
