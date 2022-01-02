import { ChangeEvent } from "react"
import { NextComponentType, NextPageContext } from "next/types"
import { Container, Section, Form, Button, Columns, Loader } from "react-bulma-components"
import idols from '../../utils/idols.json'
import {SelectedIdols} from '../../types/Type'

interface MainProps {
  mapUrl: string
  loading: boolean
  selectedIdols: SelectedIdols
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSubmitIdols: () => void
}

const { Field, Select, Label, Control } = Form

const MainComponent: NextComponentType<NextPageContext, null, MainProps> = ({
  mapUrl,
  loading,
  selectedIdols,
  onChange,
  onSubmitIdols
})  => {
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
          <figure className="image is-16by9">
            {mapUrl ? <iframe className="has-ratio" width="640" height="360" src={mapUrl}></iframe> : null}
          </figure>
        </Section>
      </Container>
  )
}

export default MainComponent
