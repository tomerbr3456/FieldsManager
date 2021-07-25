import React, { useContext } from 'react';
import { IReservedField } from '../../Types/ReservedField';
import { useAuth0 } from "@auth0/auth0-react";
import Field from './Field';
import { IField } from '../../Types/Field';
import { addReservedField } from '../../Api/AddReservedField'
import { removeReservedField } from '../../Api/RemoveReservedField';
import { ReservedFieldsContext } from '../../StateManagement/ReservedFieldsContext';

interface Props {
  getTimeDifference: Function;
  field: IField;
  handleFieldClick: Function
}

const FieldContainer = (props: Props) => {
  const { user } = useAuth0()
  const { getTimeDifference, field, handleFieldClick } = props
  const { reservedFields, setReservedFields } = useContext(ReservedFieldsContext)

  function getReservedFieldById(id: string, reservedfields: IReservedField[]) {
    return reservedfields.find(currentField => currentField.fieldId === id && getTimeDifference(new Date(), new Date(currentField.date)) < 3)
  }


  async function handleRelease(reservedFieldById: IReservedField) {
    removeReservedField(reservedFieldById.fieldId)
    setReservedFields(reservedFields.filter((current: IReservedField) => current.fieldId === reservedFieldById.id))
  }

  async function handleReserve() {
    if (user) {
      const newReservedField = {
        reservedBy: user.name,
        fieldId: field.id,
        date: new Date()
      }

      await addReservedField({ ...newReservedField, fieldId: newReservedField.fieldId })
        .then((res: any) => res.json())
        .then((data: any) => {
          setReservedFields([...reservedFields, { ...newReservedField, id: data.id, fieldId: newReservedField.fieldId }])
        });
    }
  }

  function getReservedFieldByUser(reservedFields: IReservedField[]) {
    return reservedFields.find(reservedField => {
      const isReserved = reservedField.date !== null
      const hasCurrentFieldReservedByUser = reservedField.reservedBy === user?.name
      const hasCurrentFieldReservedInPastThreeHours = getTimeDifference(new Date(), new Date(reservedField.date)) < 3

      return (isReserved && hasCurrentFieldReservedByUser && hasCurrentFieldReservedInPastThreeHours)
    }
    )
  }
  return (
    <Field
      field={field}
      reservedFieldByUser={getReservedFieldByUser(reservedFields)}
      reservedFieldById={getReservedFieldById(field.id, reservedFields)}
      reservedFields={reservedFields}
      onHandleRelease={handleRelease}
      onHandleReserve={handleReserve}
      handleFieldClick={handleFieldClick}
    />
  )

}
export default FieldContainer