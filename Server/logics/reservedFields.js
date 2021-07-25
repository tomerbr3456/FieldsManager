import * as rep from "../repository/reservedFields.js";

export const getReservedFields = async () => {
  return await rep.getReservedFields();
};

export const addReservedField = async (reservedField) => {
  return await rep.addReservedField(reservedField);
}

export const removeReservedField = async (reservedFieldId) => {
  return await rep.removeReservedField(reservedFieldId)
}

