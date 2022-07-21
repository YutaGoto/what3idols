import { ChangeEvent } from 'react';
import { NextComponentType, NextPageContext } from 'next/types';
import { Container, Section, Form, Button, Columns, Loader } from 'react-bulma-components';
import idols from '../../utils/idols.json';
import { LatLng, SelectedIdols } from '../../types/Type';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

interface MainProps {
  isLoaded: boolean;
  pinLatLng?: LatLng;
  initPosition: LatLng;
  loading: boolean;
  selectedIdols: SelectedIdols;
  register: UseFormRegister<SelectedIdols>;
  handleSubmit: UseFormHandleSubmit<SelectedIdols>;
  onSubmit: SubmitHandler<SelectedIdols>;
}

const { Field, Select, Label, Control } = Form;

const containerStyle = {
  width: '100%',
  height: '60vh',
};

const MainComponent: NextComponentType<NextPageContext, null, MainProps> = ({
  pinLatLng,
  initPosition,
  loading,
  selectedIdols,
  isLoaded,
  register,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <Container>
      <Section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Columns>
            <Columns.Column>
              <Field>
                <Label>アイドル</Label>
                <Control>
                  <Select color="info" {...register('idol1')}>
                    {idols.idols.map((idol) => (
                      <option key={idol.id} value={idol.label}>
                        {idol.label}
                      </option>
                    ))}
                  </Select>
                </Control>
              </Field>
            </Columns.Column>

            <Columns.Column>
              <Field>
                <Label>アイドル</Label>
                <Control>
                  <Select color="info" {...register('idol2')}>
                    {idols.idols.map((idol) => (
                      <option key={idol.id} value={idol.label}>
                        {idol.label}
                      </option>
                    ))}
                  </Select>
                </Control>
              </Field>
            </Columns.Column>

            <Columns.Column>
              <Field>
                <Label>アイドル</Label>
                <Control>
                  <Select color="info" {...register('idol3')}>
                    {idols.idols.map((idol) => (
                      <option key={idol.id} value={idol.label}>
                        {idol.label}
                      </option>
                    ))}
                  </Select>
                </Control>
              </Field>
            </Columns.Column>
          </Columns>

          <Button.Group>
            <Form.Field kind="group">
              <Form.Control>
                <Button color="primary" disabled={loading} className="has-text-white">
                  What3Idols!!!
                </Button>
                {loading ? <Loader /> : null}
              </Form.Control>
            </Form.Field>
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
  );
};

export default MainComponent;
