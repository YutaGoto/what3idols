import { ErrorMessage } from '@hookform/error-message';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import React, { ReactElement, useState } from 'react';
import {
  Button,
  Notification,
  Container,
  Section,
  Form,
  Columns,
  Loader,
} from 'react-bulma-components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Meta, Layout } from '../components';
import { LatLng, SelectedIdols, NotificationToast } from '../types/Type';
import idols from '../utils/idols.json';

const { Field, Select, Label, Help, Control: BulmaControl } = Form;

const containerStyle = {
  width: '100%',
  height: '60vh',
};

const Home = (): ReactElement => {
  const [pinLatLng, setPinLatLng] = useState<LatLng | undefined>();
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
    setNotification({ ...notification, show: false });
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
        <Container>
          <Section>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Columns>
                <Columns.Column>
                  <Field>
                    <Label>アイドル</Label>
                    <BulmaControl>
                      <Controller
                        name="idol1"
                        control={control}
                        rules={{ required: 'アイドルを選択してください', validate: isUnique }}
                        render={({ field }) => (
                          <Select color="info" {...field}>
                            {idols.idols.map((idol) => (
                              <option key={idol.id} value={idol.label}>
                                {idol.label}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                    </BulmaControl>
                    <ErrorMessage
                      errors={errors}
                      name="idol1"
                      render={({ message }) => <Help color="danger">{message}</Help>}
                    />
                  </Field>
                </Columns.Column>

                <Columns.Column>
                  <Field>
                    <Label>アイドル</Label>
                    <BulmaControl>
                      <Controller
                        name="idol2"
                        control={control}
                        rules={{ required: 'アイドルを選択してください', validate: isUnique }}
                        render={({ field }) => (
                          <Select color="info" {...field}>
                            {idols.idols.map((idol) => (
                              <option key={idol.id} value={idol.label}>
                                {idol.label}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                    </BulmaControl>
                    <ErrorMessage
                      errors={errors}
                      name="idol2"
                      render={({ message }) => <Help color="danger">{message}</Help>}
                    />
                  </Field>
                </Columns.Column>

                <Columns.Column>
                  <Field>
                    <Label>アイドル</Label>
                    <BulmaControl>
                      <Controller
                        name="idol3"
                        control={control}
                        rules={{ required: 'アイドルを選択してください', validate: isUnique }}
                        render={({ field }) => (
                          <Select color="info" {...field}>
                            {idols.idols.map((idol) => (
                              <option key={idol.id} value={idol.label}>
                                {idol.label}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                    </BulmaControl>
                    <ErrorMessage
                      errors={errors}
                      name="idol3"
                      render={({ message }) => <Help color="danger">{message}</Help>}
                    />
                  </Field>
                </Columns.Column>
              </Columns>

              <Button.Group>
                <Field kind="group">
                  <BulmaControl>
                    <Button color="primary" disabled={loading} className="has-text-white">
                      What3Idols!!!
                    </Button>
                    {loading ? <Loader /> : null}
                  </BulmaControl>
                </Field>
              </Button.Group>
            </form>
          </Section>

          <Section>
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
          </Section>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
