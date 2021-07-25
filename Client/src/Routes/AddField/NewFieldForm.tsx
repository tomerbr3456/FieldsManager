import React, { useState } from 'react';
import sportField from '../../images/SportField.jpeg'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { addField } from '../../Api/AddField.ts';
import FormField from './FormField';
import { Link } from 'react-router-dom';
import { IField } from '../../Types/Field';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../../ZeroAuthHelper/LoginAndLogout/Logout0';
import LoginButton from '../../ZeroAuthHelper/LoginAndLogout/Login0';
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
      width: '50%',
      height: '100%',
      '@media(max-width:600px)': {
        width: '100%',
        height: '50%',
      }
    },
    formContainer: {
      backgroundColor: '#FFF',
      borderRadius: '15px',
      width: '1200',
      display: 'flex',
      height: '600px',
      '@media(max-width:600px)': {
        flexDirection: 'column',
        width: '80vw',
        height: '85vh',
      }
    },
    welcome: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 99, 71, 1)',
      height: '100%',
      width: '50%',
      borderRadius: '15px 0 0 15px',
      '@media(max-width:600px)': {
        height: '40%',
        width: '100%',
        borderRadius: '15px 15px 0 0',
      }
    },
    sportImg: {
      backgroundImage: `url(${sportField})`,
      marginTop: 70,
      backgroundSize: '100%',
      background: 'no-repeat',
      width: '70%',
      height: '40%',
      borderRadius: 20,
      '@media(max-width:600px)': {
        marginTop: 20,
        height: '85%',
      }

    },
    welcomeContent: {
      marginTop: 40,
      textAlign: 'center',
      marginLeft: 45,
      color: 'gray',
      width: '70%',
      fontSize: '1.5em',
      '@media(max-width:600px)': {
        marginTop: 10,
        height: '40%',
        width: '50%',
        paddingRight: 30
      }

    },
    title: {
      marginTop: '5%',
      paddingLeft: '5%',
      color: 'rgb(255, 99, 71)',
      fontSize: '3em',
      fontWeight: 700,
      '@media(max-width:600px)': {
        fontSize: '2em',
      }
    },
    drawerPaper: {
      width: '100%',
      height: '70px'
    },
    formLine: {
      display: 'flex',
      width: '90%',
      height: '30%',
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
      backgroundColor: '#f2f2f2;',
      paddingTop: '5%',
      paddingBottom: '5%',
      marginTop: 50,
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
      '@media(max-width:600px)': {
        marginTop: '0.5em',
        height: '68%',
        marginLeft: '2.5%',
      }
    },
    textField: {
      width: '40%',
      backgroundColor: '#fff'
    },
    description: {
      marginBottom: 50,
      width: '90%',
      backgroundColor: '#fff',
      '@media(max-width:600px)': {
        marginBottom: '10px',
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
    submit: {
      width: '50%',
      display: 'flex',
      justifyContent: 'flex-end'
    },

    backButton: {
      width: '50%',
    },
    loggedContainer: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      backgroundColor: 'white',
    },
    input: {
      height: '70%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    inputContainer: {
      width: '45%',
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      height: '20%',
      color: 'rgba(255, 99, 71, 1)'
    },
    resize: {
      fontSize: '0.7rem'
    },
    submitContainer: {
      display: 'flex',
      marginLeft: '10%',
      width: '80%',
      marginTop: '1.5em',
      justifyContent: 'space-between'
    },
    submitButton: {
      backgroundColor: 'rgba(255, 99, 71, 1)',
      fontSize: '1em',
      color: '#FFF',
      padding: '1em',
      textAlign: 'center',
      borderRadius: '15px'
    }
  }),
)

const INITIALIZED_FIELD: IField = { id: '', name: '', description: '', city: '', field_type: '', address: '', lng: '', lat: '', distance: 0, picture: '' }

export default function NewFieldForm() {
  const classes = useStyles()
  const { isAuthenticated } = useAuth0()

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
        <div className={classes.loggedContainer}>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
        <div className={classes.formContainer}>
          <div className={classes.welcome}>
            <div className={classes.sportImg} />
            <div className={classes.welcomeContent}>{'Please Fill Details To Create New Field'}</div>


          </div>
          <div className={classes.contentContainer}>
            <div className={classes.title}>
              {'Add Field Details'}
            </div>
            <div className={classes.formFieldsContainer}>
              <div className={classes.formLine}>
                <FormField handleFormChange={handleFormChange} name={field.name} formField={'name'} hasSubmitted={hasSubmitted} />
                <FormField handleFormChange={handleFormChange} name={field.city} formField={'city'} hasSubmitted={hasSubmitted} />
              </div>
              <div className={classes.formLine}>
                <FormField handleFormChange={handleFormChange} name={field.address} formField={'address'} hasSubmitted={hasSubmitted} />
                <div className={classes.inputContainer}>
                  <label className={classes.label} htmlFor="name">{'field type'}</label>
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
              <div className={classes.inputContainer} style={{ height: '30%', width: '100%' }}>
                <label className={classes.label} htmlFor="name">{'field description'}</label>
                <input name={'description'}
                  placeholder={'description'}
                  value={field.description}
                  className={classes.input}
                  style={{ width: '90%', borderColor: (!field.description && !hasSubmitted) ? 'red' : '' }}
                  onChange={handleFormChange} />
              </div>
            </div>
            <div className={classes.submitContainer}>
              <Link style={{ textDecoration: 'none' }} to={'/'}>
                <div className={classes.submitButton} >
                  {'Go back'}
                </div>
              </Link>
              <Link style={{ textDecoration: 'none' }} to={haveFieldsFilled ? '/' : '/NewFieldForm'}>
                <div className={classes.submitButton} onClick={sendForm}>
                  {'Create'}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}