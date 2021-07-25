

const query = `mutation updateField($id: Int, $name: String, $description: String, $city: String, $address: String,$field_type:String) {
  updateField(id: $id,name:$name,description:$description,city:$city,address:$address,field_type:$field_type) {
    id
  }
}`


export async function updateField(id: number, name: string, description: string, city: string, address: string, field_type: string) {
  const results = await fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        id: id,
        name: name,
        description: description,
        city: city,
        address: address,
        field_type: field_type
      }
    })
  })
  return results
}



