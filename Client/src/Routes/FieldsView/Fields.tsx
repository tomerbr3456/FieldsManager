import React, { useState, useMemo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FieldsViewBar from './FieldsViewBar'
import { IField } from '../../Types/Field'
import FieldContainer from './FieldContainer';
import MapFunction from '../../Leaflet/Map'

interface Props {
  fields: IField[] | never
  getTimeDifference: Function
  currentPosition: any
}

const useStyles = makeStyles((theme) =>
  createStyles({

    fieldContainer: {
      position: 'fixed',
      maxHeight: '150%',
      overflow: 'scroll',
      '@media(max-width:600px)': {
        width: '100%',
      }
    },
    makeSpace: {
      height: '37vh',
    },

    filter: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        backgroundColor: '#fff'
      },
    },
    drawerPaper: {
      width: '100%',
      height: '64px'
    },
    filters: {

      justifyContent: 'center',
      display: 'flex'
    },
    searchField: {
      position: 'relative',
      borderRadius: '10px',
    },

  }),
);


export default function Fields(props: Props) {
  const { fields, getTimeDifference, currentPosition } = props
  const [searchedField, setSearchedField] = useState('')
  const [mapData, setMapData] = useState({ lat: '0', lng: '0', id: '' })


  const handleFieldClick = (lat: any, lng: any, id: any) => {
    setMapData({ lat, lng, id })
  }

  function handleChangeSearchedField(event: any) {
    setSearchedField(event.target.value)
  }

  const searchedFields = useMemo(() => fields.filter(
    (currentField: IField) => currentField.name.toLowerCase().includes(searchedField.toLowerCase()),
  ),
    [fields, searchedField]);
  const classes = useStyles();

  return (
    <>
      {searchedFields ?
        <React.Fragment>
          <FieldsViewBar />
          <div className={classes.drawerPaper} />
          {currentPosition ? <MapFunction data={mapData} fields={fields} currentPosition={currentPosition} /> : null}
          <div className={classes.makeSpace} />
          <div className={classes.filters}>
            <form className={classes.filter} noValidate autoComplete="off" >
              <TextField style={{ zIndex: 700 }} id="filled-basic" value={searchedField} label="Reserve Sport Field" variant="filled" onChange={handleChangeSearchedField} />
            </form>
          </div>
          <div className={classes.fieldContainer}>
            <Grid container justify={'space-evenly'} spacing={8} xs={12} lg={12} style={{ margin: 0, overflowY: 'scroll', boxSizing: 'content-box', paddingRight: 17 }}>
              {searchedFields.map((field: IField) => {
                return (
                  <Grid container item={true} key={field.id} xs={12} lg={4}>
                    <FieldContainer
                      key={field.id}
                      handleFieldClick={handleFieldClick}
                      field={field}
                      getTimeDifference={getTimeDifference}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </div>
        </React.Fragment> : null}
    </>
  );
}