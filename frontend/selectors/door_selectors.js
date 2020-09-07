import { values } from 'lodash';

export const getDoors = (doors) => {
  const doorHash = {};
  values(doors).map( door => doorHash[door.letter] = door)
  return doorHash;
}