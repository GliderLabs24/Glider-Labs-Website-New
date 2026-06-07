import { useCallback, useEffect, useRef, useState } from 'react'
import {
  clampCropInRegion,
  cropRegionToDataUrl,
  getInitialCropInRegion,
  getPanRangeForRegion,
  type CropRegion,
  type CropState,
} from '../utils/cropImage'
import './PhotoAdjustModal.css'

const STAGE_SIZE = 360
const INITIAL_CROP_SIZE = 260
const MIN_CROP_SIZE = 120
const MAX_ZOOM = 3

type Corner = 'tl' | 'tr' | 'bl' | 'br'

interface PhotoAdjustModalProps {
  sourceUrl: string
  onConfirm: (croppedUrl: string) => void
  onCancel: () => void
}

function getInitialRegion(): CropRegion {
  const size = INITIAL_CROP_SIZE
  return {
    x: (STAGE_SIZE - size) / 2,
    y: (STAGE_SIZE - size) / 2,
    size,
  }
}

function clampRegion(region: CropRegion): CropRegion {
  const maxSize = STAGE_SIZE
  const size = Math.min(maxSize, Math.max(MIN_CROP_SIZE, region.size))
  const x = Math.min(STAGE_SIZE - size, Math.max(0, region.x))
  const y = Math.min(STAGE_SIZE - size, Math.max(0, region.y))
  return { x, y, size }
}

function resizeRegionFromCorner(
  corner: Corner,
  start: CropRegion,
  dx: number,
  dy: number,
): CropRegion {
  let size = start.size
  let x = start.x
  let y = start.y

  switch (corner) {
    case 'br':
      size = start.size + (dx + dy) / 2
      break
    case 'tl':
      size = start.size + (-dx - dy) / 2
      x = start.x + start.size - size
      y = start.y + start.size - size
      break
    case 'tr':
      size = start.size + (dx - dy) / 2
      y = start.y + start.size - size
      break
    case 'bl':
      size = start.size + (-dx + dy) / 2
      x = start.x + start.size - size
      break
  }

  return clampRegion({ x, y, size })
}

export default function PhotoAdjustModal({
  sourceUrl,
  onConfirm,
  onCancel,
}: PhotoAdjustModalProps) {
  const stageAreaRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null)
  const resizeRef = useRef<{
    corner: Corner
    startX: number
    startY: number
    startRegion: CropRegion
  } | null>(null)
  const cropRef = useRef<CropState>({ offsetX: 0, offsetY: 0, scale: 1 })
  const regionRef = useRef<CropRegion>(getInitialRegion())

  const [loaded, setLoaded] = useState(false)
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 })
  const [baseScale, setBaseScale] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [crop, setCrop] = useState<CropState>({ offsetX: 0, offsetY: 0, scale: 1 })
  const [region, setRegion] = useState<CropRegion>(getInitialRegion)
  const [stageScale, setStageScale] = useState(1)

  cropRef.current = crop
  regionRef.current = region

  const displayW = imgSize.w * crop.scale
  const displayH = imgSize.h * crop.scale
  const panX = getPanRangeForRegion(displayW, region.x, region.size)
  const panY = getPanRangeForRegion(displayH, region.y, region.size)

  const applyCrop = useCallback(
    (next: CropState, nextRegion = regionRef.current) => {
      if (!imgSize.w || !imgSize.h) return
      setCrop(clampCropInRegion(next, imgSize.w, imgSize.h, nextRegion))
    },
    [imgSize.w, imgSize.h],
  )

  const applyRegion = useCallback(
    (nextRegion: CropRegion) => {
      const clamped = clampRegion(nextRegion)
      setRegion(clamped)
      applyCrop(cropRef.current, clamped)
    },
    [applyCrop],
  )

  const initImage = useCallback(() => {
    const img = imgRef.current
    if (!img?.naturalWidth) return

    const w = img.naturalWidth
    const h = img.naturalHeight
    const initialRegion = getInitialRegion()
    const initialCrop = getInitialCropInRegion(w, h, initialRegion)

    setImgSize({ w, h })
    setBaseScale(initialCrop.scale)
    setZoom(1)
    setRegion(initialRegion)
    setCrop(initialCrop)
    setLoaded(true)
  }, [])

  useEffect(() => {
    setLoaded(false)
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) initImage()
  }, [sourceUrl, initImage])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  useEffect(() => {
    const area = stageAreaRef.current
    if (!area) return

    const updateScale = () => {
      const { width, height } = area.getBoundingClientRect()
      if (!width || !height) return
      const scale = Math.min(1, width / STAGE_SIZE, height / STAGE_SIZE)
      setStageScale(Math.max(0.5, scale))
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(area)
    window.addEventListener('resize', updateScale)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [loaded])

  const handleZoomChange = (nextZoom: number) => {
    const clampedZoom = Math.min(MAX_ZOOM, Math.max(1, nextZoom))
    const prev = cropRef.current
    const currentRegion = regionRef.current
    const prevScale = prev.scale
    const nextScale = baseScale * clampedZoom

    const centerX = currentRegion.x + currentRegion.size / 2
    const centerY = currentRegion.y + currentRegion.size / 2
    const imgCenterX = centerX - prev.offsetX
    const imgCenterY = centerY - prev.offsetY
    const ratio = nextScale / prevScale

    const nextOffsetX = centerX - imgCenterX * ratio
    const nextOffsetY = centerY - imgCenterY * ratio

    setZoom(clampedZoom)
    applyCrop({ offsetX: nextOffsetX, offsetY: nextOffsetY, scale: nextScale })
  }

  const onStagePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('.photo-adjust-modal__handle')) return

    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      ox: cropRef.current.offsetX,
      oy: cropRef.current.offsetY,
    }
  }

  const onStagePointerMove = (e: React.PointerEvent) => {
    if (resizeRef.current) {
      const { corner, startX, startY, startRegion } = resizeRef.current
      const dx = (e.clientX - startX) / stageScale
      const dy = (e.clientY - startY) / stageScale
      applyRegion(resizeRegionFromCorner(corner, startRegion, dx, dy))
      return
    }

    if (!dragRef.current) return
    const dx = panX.canPan ? (e.clientX - dragRef.current.x) / stageScale : 0
    const dy = panY.canPan ? (e.clientY - dragRef.current.y) / stageScale : 0
    applyCrop({
      ...cropRef.current,
      offsetX: dragRef.current.ox + dx,
      offsetY: dragRef.current.oy + dy,
    })
  }

  const onStagePointerUp = () => {
    dragRef.current = null
    resizeRef.current = null
  }

  const onCornerPointerDown = (corner: Corner, e: React.PointerEvent) => {
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    resizeRef.current = {
      corner,
      startX: e.clientX,
      startY: e.clientY,
      startRegion: { ...regionRef.current },
    }
  }

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.08 : 0.08
    handleZoomChange(zoom + delta)
  }

  const handleConfirm = () => {
    const img = imgRef.current
    if (!img?.naturalWidth) return
    const cropped = cropRegionToDataUrl(img, crop, region)
    if (cropped) onConfirm(cropped)
  }

  const corners: Corner[] = ['tl', 'tr', 'bl', 'br']

  return (
    <div className="photo-adjust-modal" role="dialog" aria-modal="true">
      <div className="photo-adjust-modal__backdrop" onClick={onCancel} />

      <div className="photo-adjust-modal__panel">
        <div className="photo-adjust-modal__header">
          <h3>Adjust Photo</h3>
          <p className="photo-adjust-modal__hint">
            <span className="photo-adjust-modal__hint--desktop">
              Drag image to move, drag corners to resize square crop, scroll to zoom
            </span>
            <span className="photo-adjust-modal__hint--mobile">
              Drag to move · pinch corners to resize · use zoom below
            </span>
          </p>
        </div>

        <div ref={stageAreaRef} className="photo-adjust-modal__stage-area">
          <div
            className="photo-adjust-modal__stage-scaler"
            style={{
              width: STAGE_SIZE,
              height: STAGE_SIZE,
              transform: `scale(${stageScale})`,
            }}
            onPointerMove={onStagePointerMove}
            onPointerUp={onStagePointerUp}
            onPointerCancel={onStagePointerUp}
          >
            <div
              className="photo-adjust-modal__stage-wrap"
              style={{ width: STAGE_SIZE, height: STAGE_SIZE }}
            >
              <div
                className="photo-adjust-modal__stage"
                onPointerDown={onStagePointerDown}
                onWheel={onWheel}
              >
                {!loaded && <div className="photo-adjust-modal__loading">Loading…</div>}

                <img
                  ref={imgRef}
                  src={sourceUrl}
                  alt="Adjust"
                  className={`photo-adjust-modal__image${loaded ? '' : ' photo-adjust-modal__image--hidden'}`}
                  draggable={false}
                  onLoad={initImage}
                  style={
                    loaded
                      ? {
                          width: `${displayW}px`,
                          height: `${displayH}px`,
                          left: `${crop.offsetX}px`,
                          top: `${crop.offsetY}px`,
                        }
                      : undefined
                  }
                />
              </div>

              <div
                className="photo-adjust-modal__crop-box"
                style={{
                  left: `${region.x}px`,
                  top: `${region.y}px`,
                  width: `${region.size}px`,
                  height: `${region.size}px`,
                }}
              >
                {corners.map((corner) => (
                  <button
                    key={corner}
                    type="button"
                    className={`photo-adjust-modal__handle photo-adjust-modal__handle--${corner}`}
                    aria-label={`Resize from ${corner} corner`}
                    onPointerDown={(e) => onCornerPointerDown(corner, e)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="photo-adjust-modal__controls">
          {loaded && (
            <label className="photo-adjust-modal__slider">
              <span>Zoom ({Math.round(zoom * 100)}%)</span>
              <input
                type="range"
                min={1}
                max={MAX_ZOOM}
                step={0.01}
                value={zoom}
                onChange={(e) => handleZoomChange(Number(e.target.value))}
              />
            </label>
          )}

          {loaded && panY.canPan && (
            <label className="photo-adjust-modal__slider photo-adjust-modal__slider--pan">
              <span>Move up / down</span>
              <input
                type="range"
                min={panY.min}
                max={panY.max}
                step={1}
                value={crop.offsetY}
                onChange={(e) =>
                  applyCrop({ ...crop, offsetY: Number(e.target.value) })
                }
              />
            </label>
          )}

          {loaded && panX.canPan && (
            <label className="photo-adjust-modal__slider photo-adjust-modal__slider--pan">
              <span>Move left / right</span>
              <input
                type="range"
                min={panX.min}
                max={panX.max}
                step={1}
                value={crop.offsetX}
                onChange={(e) =>
                  applyCrop({ ...crop, offsetX: Number(e.target.value) })
                }
              />
            </label>
          )}

          <div className="photo-adjust-modal__actions">
            <button type="button" className="btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleConfirm}
              disabled={!loaded}
            >
              Use this photo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
