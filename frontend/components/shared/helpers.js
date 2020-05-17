export const processForSelect = (labels) => {
  return labels.map( label => {
    return {label: label, value: label}
  })
}

export const customStyles = {
  container: provided => ({
    ...provided,
    width: 265,
    height: '35px',
    'min-height': '35px',
    marginLeft: 5,
    cursor: 'pointer'
  }),
  valueContainer: provided => ({
    ...provided,
    height: '35px',
    'min-height': '35px',
  }),
  control: provided => ({
    ...provided,
    height: '35px',
    'min-height': '35px',
  }),
  indicatorsContainer: provided => ({
    ...provided,
    height: '35px',
    'min-height': '35px',
  })
};

export const customFixedStyles = {
  container: provided => ({
    ...provided,
    width: 240,
    height: '35px',
    'min-height': '35px',
    marginLeft: 70,
    cursor: 'pointer'
  }),
  valueContainer: provided => ({
    ...provided,
    height: '35px',
    'min-height': '35px',
  }),
  control: provided => ({
    ...provided,
    height: '35px',
    'min-height': '35px',
  }),
  indicatorsContainer: provided => ({
    ...provided,
    height: '35px',
    'min-height': '35px',
  })
};

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

const overSizedFive = [OVER_SIZED_2_HINGE_5, OVER_SIZED_3_HINGE_5, OVER_SIZED_4_HINGE_5]
const overSizedFour = [OVER_SIZED_2_HINGE_4_5, OVER_SIZED_3_HINGE_4_5, OVER_SIZED_4_HINGE_4_5]



export const booleanSelectOptions = [
  {label: 'True', value: true,},
  {label: 'False', value: false}
]

export const doorHingeHelper = (hingeNumber, hingeSize, height, totalDoors) => {
  if(invalidDoor(hingeSize, height, totalDoors)) return ''
  if(hingeNumber === 1) return "4.875"
  if(height > 88) return oversizedHingeHelper(hingeNumber, hingeSize, height)
  if(hingeNumber === 2) return secondHingeDoor(hingeSize, height)
  if(hingeNumber === 3) return thirdHingeDoor(hingeSize, height)
  return ''
}

const invalidDoor = (hingeSize, height, totalDoors) => {
  if(hingeSize !== "5" && hingeSize !=="4.5") return true
  if(height <= 0) return true
  if(totalDoors <=0) return true
  return false
}

const secondHingeDoor = (hingeSize, height) => {
  const hingeLocation = (trueHeight(height) / 2) - 4.875
  return (hingeSize === "4.5") ? hingeLocation : Math.floor(hingeLocation) - 0.125
}

const thirdHingeDoor = (hingeSize, height) => {
  console.log(trueHeight(height))
  return hingeSize === '4.5' ? 
    trueHeight(height) - 14.625 :
    (Math.floor(trueHeight(height) - 15.125)) - 0.125
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