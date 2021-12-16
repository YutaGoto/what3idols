import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Container, Section, Columns, Notification, Button, Loader, Form } from 'react-bulma-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Meta from '../components/Meta'
import { LatLng, SelectedIdols, NotificationToast } from '../types/Type'
import idols from '../utils/idols.json'

const { Field, Select, Label, Control } = Form

const Home = (): ReactElement => {
  const [selectedIdols, setSelectedIdols] = useState<SelectedIdols>({
    idol1: "0",
    idol2: "0",
    idol3: "0",
  })
  const [mapUrl, setMapUrl] = useState<string>("https://maps.google.co.jp/maps?output=embed&q=35.685261046859836,139.75277829434054&z=13")
  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationToast>({
    show: false,
    type: 'text',
    body: '',
  })

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSelectedIdols({
      ...selectedIdols, [e.target.name]: e.target.value
    })
  }

  const onSubmitIdols = async () =>{
    setNotification({...notification, show: false})
    const arrayIdols = [parseInt(selectedIdols.idol1), parseInt(selectedIdols.idol2), parseInt(selectedIdols.idol3)].sort((a, b) => {
      if (a>b) return 1
      if (a<b) return -1
      return 0
    })

    if (arrayIdols[0] == arrayIdols[1] || arrayIdols[1] == arrayIdols[2]) {
      setNotification({
        show: true,
        type: "warning",
        body: "3人別々のアイドルを選択してください",
      })
      return
    }

    if (arrayIdols.includes(0)) {
      setNotification({
        show: true,
        type: "warning",
        body: "アイドルを選択してください",
      })
      return
    }
    setLoading(true)
    await fetch('/api/idol2map', {
      method: 'POST',
      body: arrayIdols.join(",")
    }).then((res) => {
      setLoading(false)
      if(res.ok)
        return res.json()
      else
        throw res
    }).then((json) => {
      const data = json as LatLng
      if (data == undefined) return
      setMapUrl(`https://maps.google.co.jp/maps?output=embed&q=${data.lat},${data.lng}&z=13`)
    }).catch((err) => {
      console.error(err)
      setNotification({
        show: true,
        type: "danger",
        body: "エラーが発生しました",
      })
      setLoading(false)
    })
  }

  const onCloseButtonClick = () => {
    setNotification({...notification, show: false})
  }

  return (
    <>
      <Meta description="アイドルを3人選んで位置を特定しましょう" />
      <Header />

      <Container>
        <Section>
          { notification.show &&
            <Notification color={notification.type}>
              {notification.body}
              <Button remove onClick={onCloseButtonClick} />
            </Notification>
          }
          <Columns>
            <Columns.Column>
              <Field>
                <Label>アイドル</Label>
                <Control>
                  <Select onChange={onChange} value={selectedIdols.idol1} name="idol1" >
                    {idols.idols.map( idol => <option key={idol.id} value={idol.id}>{idol.label}</option>)}
                  </Select>
                </Control>
              </Field>
            </Columns.Column>

            <Columns.Column>
              <Field>
                <Label>アイドル</Label>
                <Control>
                  <Select onChange={onChange} value={selectedIdols.idol2} name="idol2" >
                    {idols.idols.map( idol => <option key={idol.id} value={idol.id}>{idol.label}</option>)}
                  </Select>
                </Control>
              </Field>
            </Columns.Column>

            <Columns.Column>
              <Field>
                <Label>アイドル</Label>
                <Control>
                  <Select onChange={onChange} value={selectedIdols.idol3} name="idol3" >
                    {idols.idols.map( idol => <option key={idol.id} value={idol.id}>{idol.label}</option>)}
                  </Select>
                </Control>
              </Field>
            </Columns.Column>
          </Columns>

          <Button.Group>
            <Button color="primary" onClick={onSubmitIdols} disabled={loading} >What3Idols!!!</Button>
            { loading ? <Loader /> : null }
          </Button.Group>
        </Section>

        <Section>
          <figure className="image is-16by9">
            {mapUrl ? <iframe className="has-ratio" width="640" height="360" src={mapUrl}></iframe> : null}
          </figure>
        </Section>
      </Container>

      <Footer />
    </>
  )
}

export default Home
