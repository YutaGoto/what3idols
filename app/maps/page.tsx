'use client';

import { MapMouseEvent } from '@vis.gl/react-google-maps';
import { Pane, toaster } from 'evergreen-ui';
import { ReactElement, useState } from 'react';

import { Layout, Meta } from '../../components';
import MapsComponent from '../../components/pages/Maps';
import { LatLng } from '../../types/Type';

const Maps = (): ReactElement => {
  const [content, setContent] = useState<string>('');
  const [center, setCenter] = useState<LatLng>({
    lat: 35.69575,
    lng: 139.77521,
  });

  const initPosition: LatLng = {
    lat: 35.69575,
    lng: 139.77521,
  };

  const onClick = async (e: MapMouseEvent) => {
    const latLng = { lat: e.detail.latLng?.lat, lng: e.detail.latLng?.lng };
    console.log(latLng);
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
          lat: latLng?.lat || initPosition.lat,
          lng: latLng?.lng || initPosition.lng,
        });
      })
      .catch((err) => {
        console.error(err);
        toaster.danger('エラーが発生しました');
        return;
      });
  };

  return (
    <>
      <Meta description="位置を選んでアイドルを見てみましょう" />
      <Layout>
        <Pane marginX="auto" width={960}>
          <Pane marginY={10}>
            <MapsComponent
              initPosition={initPosition}
              onClick={onClick}
              center={center}
              content={content}
            />
          </Pane>
        </Pane>
      </Layout>
    </>
  );
};

export default Maps;
