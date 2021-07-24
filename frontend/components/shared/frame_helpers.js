const OVER_SIZED_2_HINGE_5 = {
  90: 28.3125,
  92: 29,
  94: 29.635,
  96: 30.3125, 
}

const OVER_SIZED_3_HINGE_5 = {
  90: 51.625,
  92: 53,
  94: 54.25,
  96: 55.625,
}

const OVER_SIZED_4_HINGE_5 = {
  90: 74.9375,
  92: 77,
  94: 78.875,
  96: 80.9375,
}

const OVER_SIZED_2_HINGE_4_5 = {
  90: 28.3125,
  92: 29.1875,
  94: 29.8125,
  96: 30.5,
}

const OVER_SIZED_3_HINGE_4_5 = {
  90: 52,
  92: 53.375,
  94: 54.625,
  96: 56,
}

const OVER_SIZED_4_HINGE_4_5 = {
  90: 75.5,
  92: 77.5625,
  94: 79.4375,
  96: 81.5,
}

export const frameHingeHelper = (hingeNumber, hingeSize, height, totalFrames, jambWidth) => {
  if(invalidDoor(hingeSize, height, totalFrames, jambWidth)) return ''
  if(hingeNumber === 1) return "5"
  if(height > 88) return oversizedHingeHelper(hingeNumber, hingeSize, height)
  if(hingeNumber === 2) return secondHingeDoor(hingeSize, height)
  if(hingeNumber === 3) return thirdHingeDoor(hingeSize, height)
  return ''
}

const invalidFrame = (hingeSize, height, totalFrames, jambWidth) => {
  if(hingeSize !== "5" && hingeSize !=="4.5") return true
  if(height <= 0) return true
  if(totalFrames <=0) return true
  if(!jambWidth) return true
  return false
}

const secondHingeDoor = (hingeSize, height) => {
  const hingeLocation = (trueHeight(height) / 2) - 4.75
  return (hingeSize === "4.5") ? hingeLocation : Math.floor(hingeLocation) - 0.125
}

const thirdHingeDoor = (hingeSize, height) => {
  return hingeSize === '4.5' ? 
    trueHeight(height) - 14.5 :
    (Math.floor(trueHeight(height) - 15)) - 0.125
}

const trueHeight = (height) => {
  const flooredHeight = Math.floor(height)
  const evenedHeight = (flooredHeight % 2 === 0) ? flooredHeight : flooredHeight + 1
  return evenedHeight
}

const oversizedHingeHelper = (hingeNumber, hingeSize, height) => {
  if(hingeSize === '4.5') return overSizedFour[hingeNumber - 2][trueHeight(height)]
  return overSizedFive[hingeNumber - 2][trueHeight(height)]
}


export const calculateCsLocation = (height, strike) => {
  if(height == 0 || strike === '') { return '' }
  if(strike === "ASA 4 7/8" || strike === "ASA x Deadlock") return height - 38 - 2.4375;
  if(strike === "T Strike" || strike === "T Strike X Deadlock") return height - 38 - 1.1375;
  return ""
}

export const calculateTopStrikeLocation = (csLocation, strike) => {
  if(!csLocation || !strike) { return '' }
  if(strike === "ASA 4 7/8" || strike === "ASA x Deadlock") return csLocation - 2.4375;
  if(strike === "T Strike" || strike === "T Strike X Deadlock") return csLocation - 1.375;
  return "";
}