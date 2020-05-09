export const processForSelect = (labels) => {
  return labels.map( label => {
    return {label: label, value: label}
  })
}

export const booleanSelectOptions = [
  {label: 'True', value: true,},
  {label: 'False', value: false}
]