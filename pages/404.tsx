import { GoogleMap, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { Button, Container, Content, Section } from 'react-bulma-components';
import { Layout, Meta } from '../components';
import { LatLng } from '../types/Type';
import idols from '../utils/idols.json';

const What3Idols404 = () => {
  const [content, setContent] = useState<string>('');
  const [center, setCenter] = useState<LatLng>({
    lat: 35.69575,
    lng: 139.77521,
  });
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    language: 'ja',
    region: 'JP',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const containerStyle = {
    width: '100%',
    height: '60vh',
  };

  useEffect(() => {
    const lat = Math.random() * 26.0 + 20.0;
    const lng = Math.random() * 32.0 + 122.0;
    fetch('/api/map2idol', {
      method: 'POST',
      body: JSON.stringify({ lat: lat, lng: lng }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw res;
      })
      .then((json) => {
        const data = json;
        if (data == undefined) return;
        const idolsData = data.idols.split(',');
        const idol1 = idols.idols.find((v) => v.id == idolsData[0]);
        const idol2 = idols.idols.find((v) => v.id == idolsData[1]);
        const idol3 = idols.idols.find((v) => v.id == idolsData[2]);

        setCenter({
          lat: lat,
          lng: lng,
        });
        setContent(`${idol1.label}, ${idol2.label}, ${idol3.label}`);
      });
  }, []);

  return (
    <>
      <Meta description="ページが見つかりませんでした" />
      <Layout>
        <Container>
          <Content className="has-text-centered">
            <h1 className="is-size-1">404</h1>
            <p>ページが見つかりませんでした</p>
            <Button color="link" renderAs="a" href="/">
              トップページへ
            </Button>

            <Section>
              {isLoaded && (
                <GoogleMap
                  zoom={10}
                  mapContainerStyle={containerStyle}
                  center={center}
                  options={{
                    mapId: process.env.GOOGLE_MAPS_MAP_ID,
                  }}
                >
                  <InfoWindow position={center}>
                    <p>{content}</p>
                  </InfoWindow>
                </GoogleMap>
              )}
            </Section>
          </Content>
        </Container>
      </Layout>
    </>
  );
};

export default What3Idols404;
