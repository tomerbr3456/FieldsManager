import React, { } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) =>
  createStyles({
  
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
  }),
)


export default function FormField(props: any) {
  const { handleFormChange, formField, name,hasSubmitted } = props
  const classes = useStyles()

  return (
      <div className={classes.inputContainer}>
        <label className={classes.label} htmlFor="name">{`${formField}`}</label>
        <input name={`${formField}`}
          style={{borderColor:(!name && !hasSubmitted)?'red':''}}
          placeholder={`${formField}`}
          value={name}
          className={classes.input} onChange={handleFormChange} />
      </div>
      )
}