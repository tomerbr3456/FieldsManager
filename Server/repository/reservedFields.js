import { ReservedField } from "../mongoSchema/reservedField.js";

export const getReservedFields = async function () {
  try {
    const results = await ReservedField.find()
    return results
  }
  catch (err) {
    console.err(err)
  }
};

export const addReservedField = async function (reservedField) {
  const reservedFieldConnection = new ReservedField(reservedField)
  try {
    return reservedFieldConnection.save()
  }
  catch (err) {
    console.error(err)
  }
}

export const removeReservedField = async function (reservedFieldId) {
  try {
    return await ReservedField.deleteOne({ fieldId: reservedFieldId.fieldId })
  } catch (error) {
    console.log(error)
  }
}
