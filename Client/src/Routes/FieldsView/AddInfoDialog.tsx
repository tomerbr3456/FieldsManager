import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditIcon from '@material-ui/icons/Edit';
import { updateField } from '../../Api/UpdateField'
import { IField } from '../../Types/Field';

const INITIALIZE_FIELD: IField = {
  id: '', name: '', description: '', city: '', field_type: '', address: '', lng: '', lat: '', distance: 0, picture: ''
}

export default function FormDialog(Props: any) {
  const [open, setOpen] = React.useState(false);
  const [newField, setNewField] = React.useState<IField>(INITIALIZE_FIELD);
  const { field } = Props

  function handleFormChange(event: any) {
    const { target } = event
    setNewField({ ...newField, [target.name]: target.value })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    setOpen(false);
    updateField(field.id, field.name,
      newField.description ? newField.description : field.description,
      field.city, field.address, newField.field_type ? newField.field_type : field.field_type)
  }

  return (
    <div>
      <div style={{ position: "absolute", top: "5px", right: 5, cursor: 'pointer', overflowY: 'auto', maxHeight: '100%' }} onClick={handleClickOpen} >
        <EditIcon />
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
            {'Add Information about the field'}
          </DialogContentText>
          <TextField
            onChange={handleFormChange}
            name={'description'}
            autoFocus
            margin="dense"
            label="description"
            fullWidth
          />
          <TextField
            name={'price'}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            label="price"
            fullWidth
          />
          <TextField
            name={'field_type'}
            onChange={handleFormChange}
            autoFocus
            margin="dense"
            label="type"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {'Cancel'}
          </Button>
          <Button onClick={onSubmit} color="primary">
            {'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}