import React from 'react';
import { useTheme, createStyles, makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Basketball from '../../images/Basketball.svg'
import { IField } from '../../Types/Field';
import FormDialog from './AddInfoDialog';
import { Button } from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Place';
import LockIcon from '@material-ui/icons/Lock';
import { IReservedField } from '../../Types/ReservedField';
import { useAuth0 } from '@auth0/auth0-react';

const red = 'linear-gradient(0deg, rgba(195,58,34,1) 0%, rgba(253,69,45,1) 87%)'
const green = '#fff'
var image = ''

interface Props {
  field: IField
  reservedFieldById: IReservedField | undefined
  reservedFieldByUser: IReservedField | undefined
  reservedFields: IReservedField[]
  onHandleReserve: Function
  onHandleRelease: Function
  handleFieldClick: Function
}

const useStyles = makeStyles((theme) => createStyles({

  root: {
    boxShadow: '0px 2px 10px #888888',
    height: '180px',
    width: '33vw',
    position: 'relative',
    borderRadius: '1rem',
    background: 'radial-gradient(circle, rgba(63,251,154,1) 0%, rgba(70,252,75,1) 100%)',
    transition: 'transform .3s,background .3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '@media(max-width:600px)': {
      width: '100vh'
    }
  },
  media: {
    height: '40px',
    borderRadius: '50%',
    width: '40px',
    marginLeft: 5
  },
  info: {
    position: 'absolute',
    width: 30,
    left: 20,
    top: 100
  },
  reservedButton: {
    width: '100%',
    height: 40
  },
  mediaAndContent: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: 140
  },
  CardContent: {
    width: '80%'
  },
  distance: {
    display: 'flex',
    position: 'absolute',
    top: 5,
    left: 5
  },
  fieldname: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  unactiveField: {
    height: 20,
    display: 'flex',
    justifyContent: 'center'
  },
  fieldInfoContainer: {
    height: 100,
    textAlign: 'left'
  },
  fieldContent: {
    textAlign: 'left',

  }
}))

export default function Field(props: Props) {
  const theme = useTheme()
  const { isAuthenticated } = useAuth0()
  const classes = useStyles(theme);
  const { field, reservedFieldByUser, reservedFieldById, onHandleReserve, onHandleRelease, handleFieldClick } = props

  const handleOpenFieldDetailsDialog = () => {
    handleFieldClick(field.lat, field.lng, field.id)
  };
  image = field.picture !== '' ? field.picture : Basketball
  const hasCurrentFieldReservedByUser = (reservedFieldByUser && reservedFieldByUser.fieldId === field.id)
  const isReservedBySomeOne = reservedFieldById?.reservedBy !== undefined ? true : false
  const isReservedBySomeOneWhoIsntCurrentUser = (!hasCurrentFieldReservedByUser && isReservedBySomeOne)

  const handleReserve = () => {
    onHandleReserve()
  }

  const handleRelease = () => {
    onHandleRelease(reservedFieldById)
  }

  return (
    <>
      <Card className={classes.root} style={(reservedFieldById?.reservedBy !== undefined) ? { background: red } : { background: green }} >
        <div className={classes.mediaAndContent}>
          <div className={classes.distance}>
            <PlaceIcon />
            <Typography variant="caption" display="block" gutterBottom style={{ fontWeight: 700, fontSize: 13 }}>
              {field.distance / 1000}{'KM'}
            </Typography>
          </div>
          <FormDialog field={field} />
          <img src={image} alt="Soccer" className={classes.media} />
          <div className={classes.info}>
          </div>
          <CardContent className={classes.CardContent}
            style={{ cursor: 'pointer' }}
          >

            <div onClick={handleOpenFieldDetailsDialog}>
              {reservedFieldById ?
                (
                  <div className={classes.unactiveField}>
                    <Typography variant="caption" display="block" gutterBottom style={{ fontSize: 13, fontWeight: 700 }}>
                      {reservedFieldById.reservedBy}
                    </Typography>
                    <LockIcon fontSize="small" style={{ marginLeft: 5 }} />
                  </div>
                ) : (
                  <div className={classes.unactiveField}>
                    <Typography variant="caption" display="block" gutterBottom>
                      {''}
                    </Typography>
                  </div>
                )}
              <div className={classes.fieldInfoContainer}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.fieldname}>
                  {field.name}
                </Typography>
                <Typography variant="subtitle1" component="p" className={classes.fieldname}>
                  {field.description}
                </Typography>
                <Typography className={classes.fieldname} color="textSecondary" variant="subtitle1" component="div">
                  {field.address}
                </Typography>
              </div>
            </div>
          </CardContent>
        </div>
        {
          hasCurrentFieldReservedByUser ?
            <Button variant="contained" color={'primary'}
              className={classes.reservedButton} onClick={handleRelease}>
              {'release'}
            </Button> : (isReservedBySomeOneWhoIsntCurrentUser || reservedFieldByUser || !isAuthenticated) ?
              <Button variant="contained" color={'primary'}
                className={classes.reservedButton} >
                {'login to reserve'}
              </Button> :
              <Button variant="contained" color={'primary'}
                className={classes.reservedButton} onClick={handleReserve} >
                {'reserve'}
              </Button>
        }
      </Card >
    </>
  );
}
