import React, { useState } from 'react';
import sportImg from '../../images/sport_man.svg'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FieldsViewBar from '../FieldsView/FieldsViewBar'
import { addField } from '../../Api/AddField.ts';
import FormField from './FormField';
import { Link } from 'react-router-dom';
import { IField } from '../../Types/Field';
import { getLocationByAddress } from '../../Api/getLocationByAdress';

const useStyles = makeStyles((theme) =>
  createStyles({
    formFullContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      '@media(max-width:600px)': {
        fontSize: '0.7rem'
      }
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      '@media(max-width:600px)': {
        width: '100%',
        height: '50%',
      }
    },
    formContainer: {
      boxShadow: '0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);',
      backgroundColor: '#1D2C4D',
      borderRadius: '15px',
      width: 800,
      display: 'flex',
      height: '600px',
      '@media(max-width:600px)': {
        flexDirection: 'column',
        width: '80vw',
        height: '85vh',
      }
    },
    drawerPaper: {
      width: '100%',
      height: '100px'
    },
    formLine: {
      display: 'flex',
      width: '90%',
      justifyContent: 'space-between',
      marginBottom: '30px',
      '@media(max-width:600px)': {
        marginBottom: '10px',
      }
    },
    formFieldsContainer: {
      paddingLeft: '5%',
      marginLeft: '2.5%',
      borderRadius: '5px;',
      paddingTop: '5%',
      paddingBottom: '5%',
      marginTop: 50,
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
      '@media(max-width:600px)': {
        marginTop: '0.5em',
        marginLeft: '2.5%',
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    select: {
      backgroundColor: 'rgb(240, 240, 240)',
      textAlign: 'left',
      width: '40%',
      paddingLeft: '1rem',
    },
    sportImg: {
      position: 'absolute',
      top: 100,
      right: 100,
      width: 150,
      height: 600,
      '@media(max-width:600px)': {
        top: 520,
        right: 140,
        width: 100,
        height: 120,
      }
    },
    submit: {
      width: '50%',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    input: {
      height: '70%',
      fontSize: '1.2em',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    type: {
      width: '45%',
      height: 90,
      display: 'flex',
      flexDirection: 'column',

    },
    label: {
      height: '20%',
      color: 'rgb(192,192,192)'
    },
    submitContainer: {
      display: 'flex',
      width: '100%',
      marginTop: '1.5em',
      justifyContent: 'center'
    },
    submitButton: {
      backgroundColor: 'rgba(255, 99, 71, 1)',
      fontSize: '1em',
      color: '#FFF',
      padding: '1.5em',
      width: '50%',
      textAlign: 'center',
      borderRadius: '15px'
    },
    description: {
      height: 90,
      width: '90%'
    },
    name: {
      height: 90,
      width: '45%'
    },
    city: {
      height: 90,
      width: '45%'
    },
    address: {
      height: 90,
      width: '45%'
    }
  }),
)

const INITIALIZED_FIELD: IField = { id: '', name: '', description: '', city: '', field_type: '', address: '', lng: '', lat: '', distance: 0, picture: '' }

export default function NewFieldForm() {
  const classes = useStyles()
  const [field, setField] = React.useState<IField>(INITIALIZED_FIELD);
  const [hasSubmitted, setHasSubmitted] = useState(true)

  const haveFieldsFilled = (field.name !== '' && field.field_type !== '' && field.address !== '' && field.city !== '')

  function handleFormChange(event: any) {
    const { target } = event
    setField({ ...field, [target.name]: target.value })
  }

  async function sendForm() {
    setHasSubmitted(false)
    if (haveFieldsFilled) {
      const pos = await getLocationByAddress(field.address)
      addField(field, pos)
    }
  }
  return (
    <>
      <div className={classes.formFullContainer}>
        <div className={classes.drawerPaper} />
        <FieldsViewBar onAddFieldForm={true} />
        <img src={sportImg} className={classes.sportImg} alt="" />
        <div className={classes.formContainer}>
          <div className={classes.contentContainer}>
            <div className={classes.formFieldsContainer}>
              <div className={classes.formLine}>
                <div className={classes.name}>
                  <FormField handleFormChange={handleFormChange} label={'Name'}
                    name={field.name} formField={'name'} hasSubmitted={hasSubmitted} />
                </div>
                <div className={classes.city}>
                  <FormField handleFormChange={handleFormChange} label={'City'}
                    name={field.city} formField={'city'} hasSubmitted={hasSubmitted} />
                </div>
              </div>
              <div className={classes.formLine}>
                <div className={classes.address}>
                  <FormField handleFormChange={handleFormChange} label={'Adress'}
                    name={field.address} formField={'address'} hasSubmitted={hasSubmitted} />
                </div>
                <div className={classes.type}>
                  <label className={classes.label} htmlFor="name">{'Type'}</label>
                  <select
                    className={classes.input}
                    style={{ borderColor: (!field.field_type && !hasSubmitted) ? 'red' : '' }}
                    name={'field_type'}
                    placeholder="type of field"
                    value={field.field_type}
                    onChange={handleFormChange}
                  >
                    <option value="">{'None'}</option>
                    <option value={'Hall'}>Hall</option>
                    <option value={'Asphalt'}>Asphalt</option>
                    <option value={'Synthetic Grass'}>Synthetic Grass</option>
                  </select>
                </div>
              </div>
              <div className={classes.description}>
                <FormField handleFormChange={handleFormChange} label={'Description'}
                  name={field.description} formField={'description'} hasSubmitted={hasSubmitted} />
              </div>
            </div>
            <Link style={{ textDecoration: 'none', width: '100%' }} className={classes.submitContainer} to={haveFieldsFilled ? '/' : '/NewFieldForm'}>
              <div className={classes.submitButton} onClick={sendForm}>
                {'Create'}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}