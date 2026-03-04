import './style.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '@fontsource/oswald/600.css'
import moLogo from './assets/mo-logo.png'
import { createQR, updateQR } from './qr-manager.js'
import { initControls } from './controls.js'
import { downloadSVG, downloadPNG } from './download.js'
import { getUrlFromParams } from './url-params.js'

document.addEventListener('DOMContentLoaded', () => {
  // Set header logo
  document.getElementById('header-logo').src = moLogo

  // DOM elements
  const urlInput = document.getElementById('url-input')
  const qrPreview = document.getElementById('qr-preview')
  const placeholder = document.getElementById('qr-placeholder')
  const downloadButtons = document.getElementById('download-buttons')
  const btnSVG = document.getElementById('btn-download-svg')
  const btnPNG = document.getElementById('btn-download-png')

  // Initialize QR manager (creates instance but doesn't append until data is set)
  createQR(qrPreview)

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

  // Config controls
  initControls((options) => updateQR(options), moLogo)

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
