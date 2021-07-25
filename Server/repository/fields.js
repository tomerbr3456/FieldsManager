import { Field } from "../mongoSchema/field.js";

export const getFields = async function () {
  try {
    const results = await Field.find()
    return results
  }
  catch (err) {
    console.error(err)
  }
};

export const addField = async function (field) {
  const fieldConnection = new Field(field)
  try {
    return await fieldConnection.save()
  }
  catch (err) {
    console.error(err)
  }

};