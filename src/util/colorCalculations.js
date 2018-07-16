import tinycolor from 'tinycolor2'

export const closestColor = (target, colors) => {
  let closest = colors[0]
  let minDistance = 1000000
  const targetRgb = tinycolor(target).toRgb()
  
  colors.forEach(color => {
    const distance = colorDistance(targetRgb, color)
    if(distance < minDistance) {
      closest = color
      minDistance = distance
    }
  })

  return closest
}

export const sortPlayersByClosest = (targetHex, players) => {
  const targetRgb = tinycolor(targetHex).toRgb()
  players.forEach(player => {
    player.colorDistance = colorDistance(targetRgb, player.guess)
  })

  return players.sort((a, b) => 
    a.colorDistance - b.colorDistance
  )
}

export const colorDistance = (targetRgb, hex) => {
  if(!hex) return 10000
  const rgb = tinycolor(hex).toRgb()

  return Math.sqrt(
    Math.pow(targetRgb.r - rgb.r, 2) +
    Math.pow(targetRgb.g - rgb.g, 2) +
    Math.pow(targetRgb.b - rgb.b, 2)
  )
}
