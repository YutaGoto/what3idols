'use client';

import { ErrorMessage } from '@hookform/error-message';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { Pane, Button, SelectField, toaster } from 'evergreen-ui';
import { ReactElement, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Meta, Layout } from '../components';
import { LatLng, SelectedIdols } from '../types/Type';
import idols from '../utils/idols.json';

const containerStyle = {
  width: '100%',
  height: '60vh',
};

const Home = (): ReactElement => {
  const [pinLatLng, setPinLatLng] = useState<LatLng | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    language: 'ja',
    region: 'JP',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SelectedIdols>();

  const initPosition: LatLng = {
    lat: 35.69575,
    lng: 139.77521,
  };

  const isUnique = () => {
    const idols = [watch('idol1'), watch('idol2'), watch('idol3')];
    if (idols[0] !== idols[1] && idols[1] !== idols[2] && idols[2] !== idols[0]) {
      return true;
    } else {
      return '同じアイドルを選択しています';
    }
  };

  const onSubmit: SubmitHandler<SelectedIdols> = async (values) => {
    const idols = [values.idol1, values.idol2, values.idol3];

    setLoading(true);
    await fetch('/api/idol2map', {
      method: 'POST',
      body: JSON.stringify({ idols }),
      headers: {
        'Content-Type': 'application/json',
      },
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
        toaster.danger('エラーが発生しました');
        setLoading(false);
      });
  };

  return (
    <>
      <Meta description="アイドルを3人選んで位置を特定しましょう" />
      <Layout>
        <Pane marginX="auto" width={960}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Pane
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginY={20}
            >
              <Pane>
                <Controller
                  name="idol1"
                  control={control}
                  rules={{ required: 'アイドルを選択してください', validate: isUnique }}
                  render={({ field }) => (
                    <SelectField label="アイドル" {...field}>
                      {idols.idols.map((idol) => (
                        <option key={idol.id} value={idol.label}>
                          {idol.label}
                        </option>
                      ))}
                    </SelectField>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="idol1"
                  render={({ message }) => <>{message}</>}
                />
              </Pane>
              <Pane>
                <Controller
                  name="idol2"
                  control={control}
                  rules={{ required: 'アイドルを選択してください', validate: isUnique }}
                  render={({ field }) => (
                    <SelectField label="アイドル" {...field}>
                      {idols.idols.map((idol) => (
                        <option key={idol.id} value={idol.label}>
                          {idol.label}
                        </option>
                      ))}
                    </SelectField>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="idol2"
                  render={({ message }) => <>{message}</>}
                />
              </Pane>

              <Pane>
                <Controller
                  name="idol3"
                  control={control}
                  rules={{ required: 'アイドルを選択してください', validate: isUnique }}
                  render={({ field }) => (
                    <SelectField label="アイドル" {...field}>
                      {idols.idols.map((idol) => (
                        <option key={idol.id} value={idol.label}>
                          {idol.label}
                        </option>
                      ))}
                    </SelectField>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="idol3"
                  render={({ message }) => <>{message}</>}
                />
              </Pane>
            </Pane>

            <Pane>
              <Button appearance="primary" isLoading={loading}>
                What3Idols!!!
              </Button>
            </Pane>
          </form>

          <Pane marginY={10}>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={10}
                center={pinLatLng || initPosition}
                options={{
                  mapId: process.env.GOOGLE_MAPS_MAP_ID,
                }}
              >
                <Marker position={pinLatLng} />
              </GoogleMap>
            )}
          </Pane>
        </Pane>
      </Layout>
    </>
  );
};

export default Home;
