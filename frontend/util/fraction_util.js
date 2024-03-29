const FRACTIONS = {
  "03125": "1/32",
  "0625": "1/16",
  "09375": "3/32",
  "125": "1/8",
  "15625": "5/32",
  "1875": "3/16",
  "21875": "7/32",
  "25": "1/4",
  "28125": "9/32",
  "3125": "5/16",
  "34375": "11/32",
  "375": "3/8",
  "40625": "13/32",
  "4375": "7/16",
  "46875": "15/32",
  "50": "1/2",
  "5": "1/2",
  "53125": "17/32",
  "5625": "9/16",
  "59375": "19/32",
  "625": "5/8",
  "65625": "21/32",
  "6875": "11/16",
  "71875": "23/32",
  "75": "3/4",
  "78125": "25/32",
  "8125": "13/16",
  "84375": "27/32",
  "875": "7/8",
  "90625": "29/32",
  "9375": "15/16",
  "96875": "31/32",
}

export const formatFractions = number => {
  if(!number) return "";
  
  const numberSplit = String(number).split(".")
  if(!numberSplit[1]) return number;
  const wholeNumber = numberSplit[0];
  const fraction = FRACTIONS[numberSplit[1]];

  return wholeNumber + " " + fraction;

}