export function initControls(onChange, moLogoUrl) {
  const dotShape = document.getElementById('dot-shape')
  const cornerShape = document.getElementById('corner-shape')
  const logoMode = document.getElementById('logo-mode')
  const logoUpload = document.getElementById('logo-upload')

  // Dot shape
  dotShape.addEventListener('change', () => {
    onChange({ dotsOptions: { type: dotShape.value } })
  })

  // Corner shape
  cornerShape.addEventListener('change', () => {
    const value = cornerShape.value
    onChange({
      cornersSquareOptions: { type: value },
      cornersDotOptions: { type: value === 'extra-rounded' ? 'dot' : value },
    })
  })

  // Logo mode
  logoMode.addEventListener('change', () => {
    logoUpload.value = ''
    if (logoMode.value === 'none') {
      onChange({ image: '' })
    } else if (logoMode.value === 'morpheus') {
      onChange({ image: moLogoUrl })
    } else if (logoMode.value === 'custom') {
      logoUpload.click()
    }
  })

  // Logo upload
  logoUpload.addEventListener('change', () => {
    const file = logoUpload.files[0]
    if (!file) {
      logoMode.value = 'none'
      onChange({ image: '' })
      return
    }
    const reader = new FileReader()
    reader.onload = () => onChange({ image: reader.result })
    reader.onerror = () => {
      console.error('Failed to read logo file')
      logoMode.value = 'none'
      onChange({ image: '' })
    }
    reader.readAsDataURL(file)
  })

  // Handle file dialog cancel — when user clicks away without selecting
  // The 'cancel' event fires on the file input when dialog is dismissed
  logoUpload.addEventListener('cancel', () => {
    logoMode.value = 'none'
  })
}

export function getDownloadSize() {
  return parseInt(document.getElementById('download-size').value, 10)
}
