import { ChangeEvent } from "react"
import { NextComponentType, NextPageContext } from "next/types"
import { Container, Section, Form, Button, Columns, Loader } from "react-bulma-components"
import idols from '../../utils/idols.json'
import {LatLng, SelectedIdols} from '../../types/Type'
import { GoogleMap, Marker } from "@react-google-maps/api"

interface MainProps {
  isLoaded: boolean
  pinLatLng?: LatLng
  initPosition: LatLng
  loading: boolean
  selectedIdols: SelectedIdols
  onLoad: (e: any) => void
  onUnmount: (e: any) => void
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSubmitIdols: () => void
}

const { Field, Select, Label, Control } = Form

const containerStyle = {
  width: "100%",
  height: "60vh",
}

const MainComponent: NextComponentType<NextPageContext, null, MainProps> = ({
  pinLatLng,
  initPosition,
  loading,
  selectedIdols,
  onLoad,
  onUnmount,
  isLoaded,
  onChange,
  onSubmitIdols
}) => {
  return (
    <Container>
      <Section>
        <Columns>
          <Columns.Column>
            <Field>
              <Label>アイドル</Label>
              <Control>
                <Select onChange={onChange} value={selectedIdols.idol1} color="info" name="idol1">
                  {idols.idols.map(idol => <option key={idol.id} value={idol.id}>{idol.label}</option>)}
                </Select>
              </Control>
            </Field>
          </Columns.Column>

          <Columns.Column>
            <Field>
              <Label>アイドル</Label>
              <Control>
                <Select onChange={onChange} value={selectedIdols.idol2} color="info" name="idol2">
                  {idols.idols.map(idol => <option key={idol.id} value={idol.id}>{idol.label}</option>)}
                </Select>
              </Control>
            </Field>
          </Columns.Column>

          <Columns.Column>
            <Field>
              <Label>アイドル</Label>
              <Control>
                <Select onChange={onChange} value={selectedIdols.idol3} color="info" name="idol3">
                  {idols.idols.map(idol => <option key={idol.id} value={idol.id}>{idol.label}</option>)}
                </Select>
              </Control>
            </Field>
          </Columns.Column>
        </Columns>

        <Button.Group>
          <Button color="primary" onClick={onSubmitIdols} disabled={loading} className="has-text-white">What3Idols!!!</Button>
          {loading ? <Loader /> : null}
        </Button.Group>
      </Section>

      <Section>
        {isLoaded && <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={10}
          center={pinLatLng || initPosition}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            mapId: process.env.GOOGLE_MAPS_MAP_ID
          }}
        >
          <Marker
            position={pinLatLng}
          />
        </GoogleMap>}
      </Section>
    </Container>
  )
}

export default MainComponent
