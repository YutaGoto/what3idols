import { useJsApiLoader } from '@react-google-maps/api';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Button, Notification } from 'react-bulma-components';
import { Meta, Layout } from '../components';
import Main from '../components/pages/Main';
import { LatLng, SelectedIdols, NotificationToast } from '../types/Type';

const Home = (): ReactElement => {
  const [selectedIdols, setSelectedIdols] = useState<SelectedIdols>({
    idol1: '0',
    idol2: '0',
    idol3: '0',
  });
  const [pinLatLng, setPinLatLng] = useState<LatLng | undefined>();

  const initPosition: LatLng = {
    lat: 35.69575,
    lng: 139.77521,
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationToast>({
    show: false,
    type: 'text',
    body: '',
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    language: 'ja',
    region: 'JP',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSelectedIdols({
      ...selectedIdols,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitIdols = async () => {
    setNotification({ ...notification, show: false });
    const arrayIdols = [
      parseInt(selectedIdols.idol1),
      parseInt(selectedIdols.idol2),
      parseInt(selectedIdols.idol3),
    ].sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });

    if (arrayIdols[0] == arrayIdols[1] || arrayIdols[1] == arrayIdols[2]) {
      setNotification({
        show: true,
        type: 'warning',
        body: '3人別々のアイドルを選択してください',
      });
      return;
    }

    if (arrayIdols.includes(0)) {
      setNotification({
        show: true,
        type: 'warning',
        body: 'アイドルを選択してください',
      });
      return;
    }
    setLoading(true);
    await fetch('/api/idol2map', {
      method: 'POST',
      body: arrayIdols.join(','),
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) return res.json();
        else throw res;
      })
      .then((json) => {
        const data = json as LatLng;
        if (data == undefined) return;
        setPinLatLng({ lat: data.lat, lng: data.lng });
      })
      .catch((err) => {
        console.error(err);
        setNotification({
          show: true,
          type: 'danger',
          body: 'エラーが発生しました',
        });
        setLoading(false);
      });
  };

  const onNotificationClose = () => {
    setNotification({ ...notification, show: false });
  };

  return (
    <>
      <Meta description="アイドルを3人選んで位置を特定しましょう" />
      <Layout>
        {notification.show && (
          <Notification color={notification.type}>
            {notification.body}
            <Button remove onClick={onNotificationClose} />
          </Notification>
        )}
        <Main
          pinLatLng={pinLatLng}
          initPosition={initPosition}
          isLoaded={isLoaded}
          loading={loading}
          selectedIdols={selectedIdols}
          onChange={onChange}
          onSubmitIdols={onSubmitIdols}
        />
      </Layout>
    </>
  );
};

export default Home;
