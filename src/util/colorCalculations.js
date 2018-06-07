import tinycolor from 'tinycolor2'

export const closestColor = (target, colors) => {
  let closest = colors[0]
  let minDistance = 1000000
  const targetRgb = tinycolor(target).toRgb()
  
  colors.forEach(color => {
    const rgb = tinycolor(color).toRgb()
    const distance = calculateColorDistance(targetRgb, rgb)
    if(distance < minDistance) {
      closest = color
      minDistance = distance
    }
  })

  return closest
}

function calculateColorDistance(rgb1, rgb2) {
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  )
}
