export interface CropState {
  offsetX: number
  offsetY: number
  scale: number
}

export interface CropRegion {
  x: number
  y: number
  size: number
}

export function getInitialCrop(
  imgWidth: number,
  imgHeight: number,
  viewportSize: number,
): CropState {
  const baseScale = Math.max(viewportSize / imgWidth, viewportSize / imgHeight)
  return {
    offsetX: (viewportSize - imgWidth * baseScale) / 2,
    offsetY: (viewportSize - imgHeight * baseScale) / 2,
    scale: baseScale,
  }
}

export function getInitialCropInRegion(
  imgWidth: number,
  imgHeight: number,
  region: CropRegion,
): CropState {
  const baseScale = Math.max(region.size / imgWidth, region.size / imgHeight)
  const displayW = imgWidth * baseScale
  const displayH = imgHeight * baseScale

  return {
    offsetX: region.x + (region.size - displayW) / 2,
    offsetY: region.y + (region.size - displayH) / 2,
    scale: baseScale,
  }
}

export function getPanRange(displaySize: number, viewportSize: number) {
  const min = Math.min(0, viewportSize - displaySize)
  return { min, max: 0, canPan: min < 0 }
}

export function getPanRangeForRegion(
  displaySize: number,
  regionStart: number,
  regionSize: number,
) {
  const min = regionStart + regionSize - displaySize
  const max = regionStart
  return { min, max, canPan: min < max }
}

export function clampCrop(
  crop: CropState,
  imgWidth: number,
  imgHeight: number,
  viewportSize: number,
): CropState {
  const displayW = imgWidth * crop.scale
  const displayH = imgHeight * crop.scale

  const minX = viewportSize - displayW
  const minY = viewportSize - displayH

  return {
    ...crop,
    offsetX: Math.min(0, Math.max(minX, crop.offsetX)),
    offsetY: Math.min(0, Math.max(minY, crop.offsetY)),
  }
}

export function clampCropInRegion(
  crop: CropState,
  imgWidth: number,
  imgHeight: number,
  region: CropRegion,
): CropState {
  const displayW = imgWidth * crop.scale
  const displayH = imgHeight * crop.scale

  const minX = region.x + region.size - displayW
  const maxX = region.x
  const minY = region.y + region.size - displayH
  const maxY = region.y

  return {
    ...crop,
    offsetX: Math.min(maxX, Math.max(minX, crop.offsetX)),
    offsetY: Math.min(maxY, Math.max(minY, crop.offsetY)),
  }
}

export function cropImageToDataUrl(
  image: HTMLImageElement,
  crop: CropState,
  viewportSize: number,
  outputSize = 400,
): string {
  const region: CropRegion = { x: 0, y: 0, size: viewportSize }
  return cropRegionToDataUrl(image, crop, region, outputSize)
}

export function cropRegionToDataUrl(
  image: HTMLImageElement,
  crop: CropState,
  region: CropRegion,
  outputSize = 400,
): string {
  const canvas = document.createElement('canvas')
  canvas.width = outputSize
  canvas.height = outputSize
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  const sx = (region.x - crop.offsetX) / crop.scale
  const sy = (region.y - crop.offsetY) / crop.scale
  const sw = region.size / crop.scale
  const sh = region.size / crop.scale

  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, outputSize, outputSize)
  return canvas.toDataURL('image/jpeg', 0.92)
}
