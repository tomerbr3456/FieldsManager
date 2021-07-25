import { IField } from "../Types/Field";

export const sortByDistance = (FieldsWithDistances: IField[]) => {
  function compare(a: any, b: any) {

    const disA = a.distance;
    const disB = b.distance;

    let comparison = 0;
    if (disA > disB) {
      comparison = 1;
    } else if (disA < disB) {
      comparison = -1;
    }
    return comparison;
  }
  const x = FieldsWithDistances.sort(compare);
  return x
}