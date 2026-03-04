import { getQR } from './qr-manager.js'
import { getDownloadSize } from './controls.js'

const PREVIEW_SIZE = 300
let isDownloading = false

export async function downloadSVG() {
  if (isDownloading) return
  const qr = getQR()
  if (!qr) return

  isDownloading = true
  const size = getDownloadSize()
  try {
    qr.update({ width: size, height: size })
    await qr.download({ name: 'qr-code', extension: 'svg' })
  } finally {
    qr.update({ width: PREVIEW_SIZE, height: PREVIEW_SIZE })
    isDownloading = false
  }
}

export async function downloadPNG() {
  if (isDownloading) return
  const qr = getQR()
  if (!qr) return

  isDownloading = true
  const size = getDownloadSize()
  try {
    qr.update({ width: size, height: size })
    await qr.download({ name: 'qr-code', extension: 'png' })
  } finally {
    qr.update({ width: PREVIEW_SIZE, height: PREVIEW_SIZE })
    isDownloading = false
  }
}
