import { IReservedField } from "../Types/ReservedField"
import { serverUrl } from '../config/paths'

type AddReservedField = Omit<IReservedField, "id">;

export async function addReservedField(reservedField: AddReservedField) {
  const query = `mutation addReservedField(
    $reservedBy: String,
     $fieldId:String,
      $date:String,
       )
    { addReservedField(reservedBy: $reservedBy, fieldId: $fieldId, date: $date){id}
  }`
  const results = await fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        reservedBy: reservedField.reservedBy,
        fieldId: reservedField.fieldId,
        date: reservedField.date,
      }
    })
  })
  return results
}