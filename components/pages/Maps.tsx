import { Container, Section } from 'react-bulma-components';
import { GoogleMap, InfoWindow } from '@react-google-maps/api';
import { NextComponentType, NextPageContext } from 'next/types';
import { LatLng } from '../../types/Type';

interface MapsProps {
  isLoaded: boolean;
  initPosition: LatLng;
  onLoad: (e: any) => void;
  onUnmount: (e: any) => void;
  onClick: (e: any) => void;
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
  onLoad,
  onUnmount,
  onClick,
  center,
  content,
}) => {
  return (
    <Container>
      <Section>
        <div>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={10}
              center={initPosition}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={onClick}
              options={{
                mapId: process.env.GOOGLE_MAPS_MAP_ID,
              }}
            >
              <InfoWindow position={center} onCloseClick={() => {}}>
                <p>{content}</p>
              </InfoWindow>
            </GoogleMap>
          )}
        </div>
      </Section>
    </Container>
  );
};

export default MapsComponent;
