import { serverUrl } from '../config/paths'

const query = `mutation removeReservedField(
  $fieldId: String,
     )
  { removeReservedField(fieldId: $fieldId ){id}}`

export async function removeReservedField(fieldId: string) {
  const results = await fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        fieldId: fieldId
      }
    })
  })
  return results
}




