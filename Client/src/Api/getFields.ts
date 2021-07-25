import { serverUrl } from '../config/paths'
export async function getFields() {
  try {
    const results = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({ query: '{ fields { id,picture,name,description,city,address,field_type,lng,lat } }' })
    })
    return results
  }
  catch (err) {
    console.error(err)
  }

}