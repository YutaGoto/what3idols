'use client';

import { ErrorMessage } from '@hookform/error-message';
import { Map, Marker } from '@vis.gl/react-google-maps';
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
        <Pane marginX="auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Pane
              className="form-selects"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              gap={20}
              marginY={20}
              marginX={20}
            >
              <Pane width="100%">
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
              <Pane width="100%">
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

              <Pane width="100%">
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

            <Pane marginX={20}>
              <Button appearance="primary" isLoading={loading}>
                What3Idols!!!
              </Button>
            </Pane>
          </form>

          <Pane marginY={10}>
            <Map style={containerStyle} defaultZoom={10} defaultCenter={pinLatLng || initPosition}>
              <Marker position={pinLatLng || initPosition} />
            </Map>
          </Pane>
        </Pane>
      </Layout>
    </>
  );
};

export default Home;
