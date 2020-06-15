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

export const calculateCsLocation = (height, lockset, frameType) => {
  if(height == 0 || lockset === '' || frameType === '') { return '' }
  if(['Hinges Only','Panic Bar','Inactive','SVR'].includes(lockset) || height == 0 ) { return '' }
  if(frameType === 'A/L') { return alCsLocation(height) }
  let offset = 38.125
  if(['Panic & Trim', 'SVR & Trim','Mortise Panic'].includes(lockset)){
    offset = 40.124
  }
  return height - offset;

}

const alCsLocation = (height) => {
  if(height >= 78 && height < 82 ) { return 41.875 }
  if(height >= 82 && height < 86 ) { return 45.875 }
  
  return '';
}

export const calculateLockLocation = (csLocation, lockset) => {
  if(csLocation === '' || lockset === '') { return '' }
  if(['161 Lock', 'DBL 161 Lock'].includes(lockset)) { return csLocation - 1.125 }
  if(['Apartment', 'Mortise Lock', '86 Edge'].includes(lockset)) { 
    return csLocation - 3.625
  }
  if(lockset === '91A') { return csLocation - 3.25 }

  return ''
}

export const calculateLockSizeWidth = (lockset) => {
 const sizes =  {
   '161 Lock': 1.125,
   'DBL 161 Lock': 1.125,
   '86 Edge': 1.25,
   'Apartment': 1.25,
   'Mortise Lock': 1.25,
   'Mortise Panic': 1.25,
   '91A': 1.062
  }
  if(sizes[lockset]) { return sizes[lockset] }

  return ''
}

export const calculateLockSizeHeight = (lockset) => {
  const sizes = {
    '161 Lock': 2.25,
    'DBL 161 Lock': 2.25,
    '86 Edge': 8,
    'Apartment': 8,
    'Mortise Lock': 8,
    'Mortise Panic': 8,
    '91A': 7.625,
  };
  if (sizes[lockset]) { return sizes[lockset];}

  return '';
};

export const calculateTopCsLocation = (lockset, csLocation) => {
  if(csLocation === '' || lockset !== 'DBL 161 Lock') return ''
  return csLocation - 10;
}

export const calculateLockBackset = (lockset) => {
  if(lockset === '161 Lock') { return "B/S: 57/64"; }
  if(['Apartment', 'Mortise Lock', '86 Edge'].includes(lockset)) { return "B/S: 27/32";}
  if(lockset === '91A') { return "B/S: 1 1/32"; }
  return ""
}

export const calculateHingeBackset = (hingeSize) => {
  if(hingeSize === "4.5" || hingeSize === "5") { return "B/S: 69/85" }
  if(hingeSize === "6") { return "B/S: 1 9/64" }
  if(hingeSize === "7") { return "B/S: 1 17/64" }
  return "";
}

export const calculateActualHeight = (height, undercut, frameType) => {
  if (height === 0 || frameType === "") return "";
  if (frameType === "A/L") {
    if (undercut !== "") {
      return height - undercut - 0.25;
    }
    return height - 0.625;
  }
  if (undercut !== "") {
    return height - undercut - 0.125;
  }
  return height - 0.875;
};

export const calculateActualWidth = (width, hingeType, frameType) => {
  if (width === 0 || frameType === "" || hingeType === ""){ return ""; }

  if (frameType === "A/L") {
    if (hingeType === "H/S Cont.") {
      return width - 0.5;
    }
    if (hingeType === "F/M Cont.") {
      return width - 0.625;
    }
    return width - 0.375;
  }
  if (hingeType !== "H/S Cont.") {
    return width - 0.375;
  }
  if (hingeType === "F/M Cont.") {
    return width - 0.5;
  }
  return width - 0.25;
};

export const calculateWideSideWidth = (doorType, actualWidth) => {
  if(doorType === "" || actualWidth === "") { return "" }

  if(["16 Flush", "16 Vision", "16 Panel", "16 Louver", "16 Misc"].includes(doorType)){
    return actualWidth + 4.688 - 0.125;
  }
  if(["KL Flush", "KL Vision", "KL Panel", "KL Louver"].includes(doorType)){
    return actualWidth + 5;
  }
  return actualWidth + 4.688
}

export const calculateWideSideHeight = (doorType, actualHeight) => {
  if(doorType === "" || actualHeight === "") { return "" }

  if(["KL Flush", "KL Vision", "KL Panel", "KL Louver"].includes(doorType)){
    return actualHeight + 3;
  }
  return actualHeight
}