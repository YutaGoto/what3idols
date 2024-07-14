import { Map, InfoWindow, MapMouseEvent } from '@vis.gl/react-google-maps';

import type { LatLng } from '../../types/Type';

interface MapsProps {
  initPosition: LatLng;
  onClick: (e: MapMouseEvent) => void;
  center: LatLng;
  content: string;
}

const containerStyle = {
  width: '100%',
  height: '60vh',
};

const MapsComponent = ({ initPosition, onClick, center, content }: MapsProps) => {
  return (
    <div>
      <Map style={containerStyle} defaultZoom={10} defaultCenter={initPosition} onClick={onClick}>
        <InfoWindow position={center}>
          <p>{content}</p>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default MapsComponent;
