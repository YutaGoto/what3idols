import React, { useState } from 'react'
import Head from 'next/head'
import { Container, Section, Content, Columns, Heading, Navbar, Notification, Button, Footer, Loader, Form } from 'react-bulma-components'
import idols from '../utils/idols.json'

const Home = () => {
  const [selectedIdols, setSelectedIdols] = useState({
    idol1: "0",
    idol2: "0",
    idol3: "0",
  })
  const [mapUrl, setMapUrl] = useState("https://maps.google.co.jp/maps?output=embed&q=35.685261046859836,139.75277829434054&z=13")
  const [loading, setLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const { Field, Select, Label, Control } = Form

  const onChange = (e) => {
    setSelectedIdols({
      ...selectedIdols, [e.target.name]: e.target.value
    })
  }

  const onClick = async () =>{
    setShowNotification(false)
    const arrayIdols = [parseInt(selectedIdols.idol1), parseInt(selectedIdols.idol2), parseInt(selectedIdols.idol3)].sort((a, b) => {
      if (a>b) return 1
      if (a<b) return -1
      return 0
    })

    if (arrayIdols[0] == arrayIdols[1] || arrayIdols[1] == arrayIdols[2]) {
      setShowNotification(true)
      return
    }

    if (arrayIdols.includes(0)) {
      setShowNotification(true)
      return
    }
    setLoading(true)
    await fetch('/api/hello', {
      method: 'POST',
      body: arrayIdols.join(",")
    }).then((res) => {
      setLoading(false)
      if(res.ok)
        return res.json()
      else
        throw res
    }).then((json) => {
      const data = json
      if (data == undefined) return
      setMapUrl(`https://maps.google.co.jp/maps?output=embed&q=${data.lat},${data.lng}&z=13`)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }

  const onCloseButtonClick = () => setShowNotification(false)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar>
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <Heading>What3Idols</Heading>
          </Navbar.Item>
        </Navbar.Brand>
      </Navbar>
      <Container>
        <Section>
          { showNotification ?
            <Notification>
              3人別々のアイドルを選択してください
              <Button remove onClick={onCloseButtonClick} />
            </Notification>
            : null
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
            <Button color="primary" onClick={onClick} >What3Idols!!!</Button>
            { loading ? <Loader /> : null }
          </Button.Group>
        </Section>

        <Section>
        <figure className="image is-16by9">
          {mapUrl ? <iframe className="has-ratio" width="640" height="360" src={mapUrl}></iframe> : null}
        </figure>
        </Section>
      </Container>

      <Footer>
        <Container>
          <Content style={{ textAlign: 'center' }}>
            <Columns>
              <Columns.Column size={9}>
                <p>
                  <strong>What 3 Idols</strong> by <a href="https://github.com/YutaGoto">Yuta Goto</a>.
                </p>
              </Columns.Column>
              <Columns.Column size={3}>
                <a href="https://bulma.io">
                  <img src="/made-with-bulma.png" alt="Made with Bulma" width="256" height="48" />
                </a>
              </Columns.Column>
            </Columns>
          </Content>
        </Container>
      </Footer>
    </>
  )
}

export default Home
