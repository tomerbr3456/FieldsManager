
import React, { useEffect, useState, useContext } from 'react';
import { ReservedFieldsContext } from '../../StateManagement/ReservedFieldsContext'
import { getFields } from '../../Api/getFields'
import { getReservedFields } from '../../Api/getReservedFields';
import { IField } from '../../Types/Field';

import SortedFields from './SortedFields';

export default function FieldsContainer() {
  const [currentPosition, setCurrentPosition] = useState<any>()
  const [fields, setFields] = useState<IField[]>([])
  const { setReservedFields } = useContext(ReservedFieldsContext)

  useEffect(() => {
    getFields()
      .then(res => res?.json())
      .then(res => { setFields(res.data.fields) });
  }, [setFields]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentPosition({ lat: position?.coords.latitude, lng: position?.coords.longitude })
    })
  }, [])

  useEffect(() => {
    async function getReserved() {
      let response: any = await getReservedFields()
      response = await response.json()
      setReservedFields(response.data.reservedfields)
    }
    getReserved()

  }, [setReservedFields]);

  const getTimeDifference = function (date1: any, date2: any) {
    return (Math.abs(date1 - date2) / 36e5)
  }

  return (
    <>
      {(fields && currentPosition) ?
        <SortedFields
          fields={fields}
          currentPosition={currentPosition}
          getTimeDifference={getTimeDifference}
        />
        : null
      }
    </>
  );
}
