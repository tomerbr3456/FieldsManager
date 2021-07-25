import React, { useState, createContext, ReactNode } from 'react'
import { IField } from '../Types/Field'

type Fields = {
  fields: IField[];
  setFields: (fields: IField[]) => void
}

const initialState: Fields = {
  fields: [],
  setFields: () => { }
}

export const FieldsContext = createContext<Fields>(initialState)


export const FieldsProvider = (props: { children: ReactNode }) => {
  const [fields, setFields] = useState([] as IField[])
  return (
    <FieldsContext.Provider value={{ fields, setFields }}>
      {props.children}
    </FieldsContext.Provider>
  )
}

