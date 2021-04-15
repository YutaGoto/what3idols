import React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api'
import Head from 'next/head'
import { Container, Section, Content, Columns, Heading, Navbar, Notification, Button, Footer, Form } from 'react-bulma-components'
import idols from '../utils/idols.json'

const Maps = () => {
  const [showNotification, setShowNotification] = useState(false)
  const [map, setMap] = useState(null)
  const [content, setContent] = useState('')
  const [center, setCenter] = useState({
    lat: 35.69575,
    lng: 139.77521,
  })

  const initPosition = {
    lat: 35.69575,
    lng: 139.77521,
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAJd8pGi7Ryi-fyrK9kzherrzWgw75gg-E"
  })

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onClick = async (e) => {
    const latLng = e.latLng.toJSON()
    await fetch('/api/map2idol', {
      method: 'POST',
      body: JSON.stringify(latLng)
    }).then((res) => {
      if(res.ok)
        return res.json()
      else
        throw res
    }).then((json) => {
      const data = json
      if (data == undefined) return
      const idolsData = data.idols.split(',')
      const idol1 = idols.idols.find((v) => v.id == idolsData[0])
      const idol2 = idols.idols.find((v) => v.id == idolsData[1])
      const idol3 = idols.idols.find((v) => v.id == idolsData[2])

      setContent(`${idol1.label}, ${idol2.label}, ${idol3.label}`)
      setCenter({
        lat: latLng.lat,
        lng: latLng.lng
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  const containerStyle = {
    width: "800px",
    height: "400px",
  };

  return (
    <>
      <Head>
        <meta property="og:title" content="What3Idols" />
        <meta property="og:description" content="アイドルを3人選んで位置を特定しましょう！" />
        <title>What3Idols!</title>
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
          {isLoaded ? <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={initPosition}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={onClick}
          >
            <InfoWindow
              position={center}
            ><p>{content}</p></InfoWindow>
          </GoogleMap> : <></>}
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

export default Maps
