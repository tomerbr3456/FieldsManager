import { serverUrl } from '../config/paths'
export async function getReservedFields() {
  try {
    const results = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({ query: `{reservedfields {id, reservedBy,  fieldId,date}}` })
    })
    return results
  }
  catch (err) {
    console.error(err)
  }
}