import { Key } from "react"
import { serverUrl } from '../config/paths'

export async function getReservedField(id: Key) {
  const results = await fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query: `{ reservedField (id:${id}){reservedBy} }` })
  })
  return results
}