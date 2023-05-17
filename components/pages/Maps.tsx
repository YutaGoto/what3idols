import { GoogleMap, InfoWindow } from '@react-google-maps/api';
import { NextComponentType, NextPageContext } from 'next/types';

import { LatLng } from '../../types/Type';

interface MapsProps {
  isLoaded: boolean;
  initPosition: LatLng;
  onClick: (e: google.maps.MapMouseEvent) => void;
  center: LatLng;
  content: string;
}

const containerStyle = {
  width: '100%',
  height: '60vh',
};

const MapsComponent: NextComponentType<NextPageContext, null, MapsProps> = ({
  isLoaded,
  initPosition,
  onClick,
  center,
  content,
}) => {
  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={10}
          center={initPosition}
          onClick={onClick}
          options={{
            mapId: process.env.GOOGLE_MAPS_MAP_ID,
          }}
        >
          <InfoWindow position={center}>
            <p>{content}</p>
          </InfoWindow>
        </GoogleMap>
      )}
    </div>
  );
};

export default MapsComponent;
