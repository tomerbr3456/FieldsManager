import React, { useEffect } from 'react';
import currentPosIcon from '../images/CurrentPos.png'
import L, { Icon, IconOptions, LatLngTuple, } from 'leaflet';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { IField } from '../Types/Field';

const useStyles = makeStyles((theme) =>
  createStyles({
    mapContainer: {
      borderRadius: 15,
      height: '30vh',
      width: '80vw',
      top: '12.5vh',
      left: '10vw',
      position: 'fixed',
      '@media(max-width:600px)': {
        height: '30vh',
      }
    },
  })
)
const createIcon = function () {
  const icon: Icon<IconOptions> = new (L.icon as any)({
    iconUrl: currentPosIcon,
    iconSize: [50, 95]
  })
  return icon
}

function PointMarker(props: any) {
  const markerRef = React.useRef<any>(null);
  const { position, name, address, openPopup } = props;

  useEffect(() => {
    if (openPopup)
      markerRef.current.leafletElement.openPopup()
  }, [openPopup])

  return (
    <Marker ref={markerRef} position={position}>
      <Popup>
        {name}
        <br></br>
        {address}
      </Popup>
    </Marker>
  );
}



const MapLocation = (props: any) => {
  const { data, fields, currentPosition } = props
  const markerRef = React.useRef<any>(null);
  const classes = useStyles()
  const position: LatLngTuple = [data.lat !== '0' ? data.lat : currentPosition?.lat || 0,
  data.lng !== '0' ? data.lng : currentPosition?.lng || 0]

  useEffect(() => {
    if (markerRef && markerRef.current && markerRef.current.leafletElement)
      markerRef.current.leafletElement.openPopup()
  }, [data])

  return (
    <div>
      <Map className={classes.mapContainer} center={position} zoom={12} scrollWheelZoom={false} >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={{ lat: parseFloat(currentPosition?.lat) || 0, lng: parseFloat(currentPosition?.lng) || 0 }} icon={createIcon()} >
          <Popup >
            <span>
              {'Youre Position'}
            </span>
          </Popup>
        </Marker >
        {fields.map((field: IField) => {
          const fieldPosition: LatLngTuple = [parseFloat(field.lat), parseFloat(field.lng)]
          return (
            <PointMarker name={field.name}
              address={field.address}
              openPopup={data.id === field.id}
              ref={markerRef}
              key={field.id}
              position={fieldPosition}  >
            </PointMarker>
          )
        })}
      </Map>
    </div>
  )
}

export default MapLocation