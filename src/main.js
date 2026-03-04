import './style.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '@fontsource/oswald/600.css'
import moLogo from './assets/mo-logo.png'
import { createQR, updateQR } from './qr-manager.js'
import { initControls } from './controls.js'
import { downloadSVG, downloadPNG } from './download.js'
import { getUrlFromParams } from './url-params.js'

/**
 * Creates a version of the white logo with a dark circular background
 * so it's visible on the white QR code background.
 */
function createLogoWithBackground(logoUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const padding = 20
      const size = Math.max(img.width, img.height) + padding * 2
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')

      // Dark circular background
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.fillStyle = '#0d0d11'
      ctx.fill()

      // Draw logo centered
      const x = (size - img.width) / 2
      const y = (size - img.height) / 2
      ctx.drawImage(img, x, y)

      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = reject
    img.src = logoUrl
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  // Header logo (also set by HTML src, but ensure JS import path works too)
  document.getElementById('header-logo').src = moLogo

  // DOM elements
  const urlInput = document.getElementById('url-input')
  const qrPreview = document.getElementById('qr-preview')
  const placeholder = document.getElementById('qr-placeholder')
  const downloadButtons = document.getElementById('download-buttons')
  const btnSVG = document.getElementById('btn-download-svg')
  const btnPNG = document.getElementById('btn-download-png')

  // Initialize QR manager
  createQR(qrPreview)

  // Process logo for QR center use (add dark background to white logo)
  let processedLogo = moLogo
  try {
    processedLogo = await createLogoWithBackground(moLogo)
  } catch (e) {
    console.warn('Failed to process logo, using original:', e)
  }

  // URL input with debounce
  let debounceTimer
  urlInput.addEventListener('input', () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      const url = urlInput.value.trim()
      if (url) {
        placeholder.classList.add('hidden')
        updateQR({ data: url })
        downloadButtons.classList.remove('hidden')
      } else {
        placeholder.classList.remove('hidden')
        downloadButtons.classList.add('hidden')
        updateQR({ data: '' })
      }
    }, 300)
  })

  // Config controls — pass processed logo (with dark background) for QR center
  initControls((options) => updateQR(options), processedLogo)

  // Download buttons
  btnSVG.addEventListener('click', () => downloadSVG())
  btnPNG.addEventListener('click', () => downloadPNG())

  // Pre-fill from URL params
  const paramUrl = getUrlFromParams()
  if (paramUrl) {
    urlInput.value = paramUrl
    urlInput.dispatchEvent(new Event('input'))
  }
})
