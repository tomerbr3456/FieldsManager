import Fields from './Fields';
import React, { useEffect, useState } from 'react';
import { getDistance } from 'geolib';
import { IField } from '../../Types/Field';
import { sortByDistance } from '../../SortHelper/SortByDistance';

export default function SortedFields(props: any) {
  const { fields, currentPosition, getTimeDifference } = props
  const [fieldsWithDistances, setFieldsWithDistances] = useState<IField[]>([])
  useEffect(() => {
    const fieldsWithDistances = fields.map((field: any) => {
      return {
        ...field, distance: getDistance(
          { latitude: currentPosition.lat || 0, longitude: currentPosition.lng || 0 },
          { latitude: parseFloat(field.lat) || 0, longitude: parseFloat(field.lng) || 0 }
        )
      }
    })
    setFieldsWithDistances(sortByDistance(fieldsWithDistances))
  }, [fields, currentPosition]);

  return (
    <Fields
      fields={fieldsWithDistances}
      currentPosition={currentPosition}
      getTimeDifference={getTimeDifference}
    />
  )
}