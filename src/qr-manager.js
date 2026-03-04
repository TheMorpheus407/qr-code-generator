import QRCodeStyling from 'qr-code-styling'

const PREVIEW_SIZE = 300
let qrCode = null
let container = null
let hasImage = false
let isAppended = false

const DEFAULT_OPTIONS = {
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
  type: 'svg',
  data: '',
  margin: 10,
  qrOptions: {
    errorCorrectionLevel: 'Q',
  },
  dotsOptions: {
    type: 'rounded',
    gradient: {
      type: 'linear',
      rotation: 135 * (Math.PI / 180),
      colorStops: [
        { offset: 0, color: '#6c35de' },
        { offset: 1, color: '#ff6b35' },
      ],
    },
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
    color: '#6c35de',
  },
  cornersDotOptions: {
    type: 'dot',
    color: '#6c35de',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.3,
    margin: 5,
    saveAsBlob: true,
  },
}

export function createQR(containerEl) {
  container = containerEl
  qrCode = new QRCodeStyling(DEFAULT_OPTIONS)
}

export function updateQR(options) {
  if (!qrCode) return

  // Track image state for error correction
  if ('image' in options) {
    hasImage = !!options.image
    options.qrOptions = {
      ...options.qrOptions,
      errorCorrectionLevel: hasImage ? 'H' : 'Q',
    }
  }

  qrCode.update(options)

  // Append on first real data
  if (!isAppended && options.data) {
    qrCode.append(container)
    isAppended = true
  }
}

export function getQR() {
  return qrCode
}
