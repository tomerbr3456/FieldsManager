import React, { useState, createContext, ReactNode } from 'react';
import { IReservedField } from '../Types/ReservedField'
type ReservedFields = {
  reservedFields: IReservedField[];
  setReservedFields: (fields: IReservedField[]) => void
};

const initialState: ReservedFields = {
  reservedFields: [],
  setReservedFields: () => { }
}
export const ReservedFieldsContext = createContext<ReservedFields>(initialState)

export const ReservedFieldsProvider = (props: { children: ReactNode }) => {
  const [reservedFields, setReservedFields] = useState([] as IReservedField[])
  return (
    <ReservedFieldsContext.Provider value={{ reservedFields, setReservedFields }}>
      {props.children}
    </ReservedFieldsContext.Provider>
  )
}

