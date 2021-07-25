import { IField } from "../Types/Field"
import Basketball from '../images/Basketball.svg'

export async function addField(field: IField, pos: any) {
  const results = await fetch('https://fieldsserver.herokuapp.com/addField', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      variables: {
        name: field.name,
        address: field.address,
        city: field.city,
        description: field.description,
        fieldType: field.field_type,
        lng: pos.lng || '32',
        lat: pos.lat || '32',
        picture: Basketball
      }
    })
  })
  return results
}



