<<<<<<< HEAD:app/maps/page.tsx
'use client';

import React, { ReactElement, useState } from 'react';
=======
>>>>>>> main:pages/maps.tsx
import { useJsApiLoader } from '@react-google-maps/api';
import React, { ReactElement, useState } from 'react';
import { Button, Notification } from 'react-bulma-components';
<<<<<<< HEAD:app/maps/page.tsx
import { Layout, Meta } from '../../components';
import MapsComponent from '../../components/pages/Maps';
import { LatLng, NotificationToast } from '../../types/Type';
=======

import { Layout, Meta } from '../components';
import MapsComponent from '../components/pages/Maps';
import { LatLng, NotificationToast } from '../types/Type';
>>>>>>> main:pages/maps.tsx

const Maps = (): ReactElement => {
  const [content, setContent] = useState<string>('');
  const [center, setCenter] = useState<LatLng>({
    lat: 35.69575,
    lng: 139.77521,
  });
  const [notification, setNotification] = useState<NotificationToast>({
    show: false,
    type: 'text',
    body: '',
  });

  const initPosition: LatLng = {
    lat: 35.69575,
    lng: 139.77521,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    language: 'ja',
    region: 'JP',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const onClick = async (e: google.maps.MapMouseEvent) => {
    setNotification({ ...notification, show: false });
    const latLng: LatLng = e.latLng.toJSON();
    await fetch('/api/map2idol', {
      method: 'POST',
      body: JSON.stringify(latLng),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw res;
      })
      .then((json) => {
        const data = json;
        if (data == undefined) return;
        const idolsData = data.idols.split(',');

        setContent(idolsData.join(', '));
        setCenter({
          lat: latLng.lat,
          lng: latLng.lng,
        });
      })
      .catch((err) => {
        console.error(err);
        setNotification({
          show: true,
          type: 'danger',
          body: 'エラーが発生しました',
        });
        return;
      });
  };

  const onNotificationClose = () => {
    setNotification({ ...notification, show: false });
  };

  return (
    <>
      <Meta description="位置を選んでアイドルを見てみましょう" />
      <Layout>
        {notification.show && (
          <Notification color={notification.type}>
            {notification.body}
            <Button remove onClick={onNotificationClose} />
          </Notification>
        )}

        <MapsComponent
          isLoaded={isLoaded}
          initPosition={initPosition}
          onClick={onClick}
          center={center}
          content={content}
        />
      </Layout>
    </>
  );
};

export default Maps;
