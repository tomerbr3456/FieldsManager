import * as rep from "../repository/fields.js";

export const getFields = async () => {
  return await rep.getFields();
};

export const addField = async (field) => {
  return await rep.addField(field)
}