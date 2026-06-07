import { useEffect, useRef, useState } from 'react'
import {
  LAYOUT,
  LOGO_SRC,
  SIGNATURE_DEBASIS_SRC,
  SIGNATURE_JYOTI_SRC,
  SIGNATURE_PRATYUSH_SRC,
  TEMPLATE_SRC,
} from '../config/certificateLayout'
import './Certificate.css'

interface CertificateProps {
  name: string
  photoUrl: string | null
  certificateId: string
  date: string
}

function scaledFont(scale: number) {
  return `calc(var(--cert-w, 920px) * ${scale})`
}

export default function Certificate({
  name,
  photoUrl,
  certificateId,
  date,
}: CertificateProps) {
  const [templateLoaded, setTemplateLoaded] = useState(true)
  const certRef = useRef<HTMLDivElement>(null)
  const displayName = name.trim()

  useEffect(() => {
    const el = certRef.current
    if (!el) return

    const setWidth = () => {
      el.style.setProperty('--cert-w', `${el.offsetWidth}px`)
    }

    setWidth()
    const observer = new ResizeObserver(setWidth)
    observer.observe(el)
    return () => observer.disconnect()
  }, [templateLoaded])

  if (!templateLoaded) {
    return (
      <div className="certificate certificate--empty" id="certificate">
        <p>Certificate template not found.</p>
        <p>Add your image as <code>public/assets/certificate-template.png</code></p>
      </div>
    )
  }

  return (
    <div className="certificate" id="certificate" ref={certRef}>
      <img
        src={TEMPLATE_SRC}
        alt=""
        className="certificate__template"
        draggable={false}
        onError={() => setTemplateLoaded(false)}
      />

      <img
        src={LOGO_SRC}
        alt="Prerana Foundation Kanpur"
        className="certificate__logo"
        style={{
          top: LAYOUT.logo.top,
          left: LAYOUT.logo.left,
          width: LAYOUT.logo.width,
        }}
        draggable={false}
      />

      <span
        className="certificate__meta-value certificate__meta-value--bold"
        style={{
          top: LAYOUT.certificateId.top,
          left: LAYOUT.certificateId.left,
          width: LAYOUT.certificateId.width,
          fontSize: scaledFont(LAYOUT.certificateId.fontScale),
          color: LAYOUT.certificateId.color,
        }}
      >
        {certificateId}
      </span>

      <span
        className="certificate__meta-value certificate__meta-value--bold"
        style={{
          top: LAYOUT.date.top,
          left: LAYOUT.date.left,
          width: LAYOUT.date.width,
          fontSize: scaledFont(LAYOUT.date.fontScale),
          color: LAYOUT.date.color,
        }}
      >
        {date}
      </span>

      {displayName && (
        <p
          className="certificate__name"
          style={{
            top: LAYOUT.name.top,
            left: LAYOUT.name.left,
            fontSize: scaledFont(LAYOUT.name.fontScale),
            maxWidth: LAYOUT.name.maxWidth,
          }}
        >
          {displayName}
        </p>
      )}

      <img
        src={SIGNATURE_JYOTI_SRC}
        alt=""
        className="certificate__signature"
        style={{
          top: LAYOUT.signatureJyoti.top,
          left: LAYOUT.signatureJyoti.left,
          width: LAYOUT.signatureJyoti.width,
          transform: `translateX(-50%) rotate(${LAYOUT.signatureJyoti.rotate})`,
        }}
        draggable={false}
      />

      <img
        src={SIGNATURE_PRATYUSH_SRC}
        alt=""
        className="certificate__signature certificate__signature--strong"
        style={{
          top: LAYOUT.signaturePratyush.top,
          left: LAYOUT.signaturePratyush.left,
          width: LAYOUT.signaturePratyush.width,
          transform: `translateX(-50%) rotate(${LAYOUT.signaturePratyush.rotate})`,
        }}
        draggable={false}
      />

      <img
        src={SIGNATURE_DEBASIS_SRC}
        alt=""
        className="certificate__signature"
        style={{
          top: LAYOUT.signatureDebasis.top,
          left: LAYOUT.signatureDebasis.left,
          width: LAYOUT.signatureDebasis.width,
          transform: `translateX(-50%) rotate(${LAYOUT.signatureDebasis.rotate})`,
        }}
        draggable={false}
      />

      <div
        className="certificate__photo"
        style={{
          top: LAYOUT.photo.top,
          left: LAYOUT.photo.left,
          width: LAYOUT.photo.width,
          height: LAYOUT.photo.height,
        }}
      >
        {photoUrl && <img src={photoUrl} alt={displayName || 'Member'} />}
      </div>
    </div>
  )
}
