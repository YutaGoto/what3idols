import React, { ReactElement, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api'
import { Button, Container, Notification, Section } from 'react-bulma-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Meta from '../components/Meta'
import { LatLng, NotificationToast } from '../types/Type'
import idols from '../utils/idols.json'

const Maps = (): ReactElement  => {
  const [, setMap] = useState(null)
  const [content, setContent] = useState<string>('')
  const [center, setCenter] = useState<LatLng>({
    lat: 35.69575,
    lng: 139.77521,
  })
  const [notification, setNotification] = useState<NotificationToast>({
    show: false,
    type: 'text',
    body: '',
  })


  const initPosition: LatLng = {
    lat: 35.69575,
    lng: 139.77521,
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onClick = async (e: { latLng: { toJSON: () => LatLng } }) => {
    setNotification({...notification, show: false})
    const latLng: LatLng = e.latLng.toJSON()
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
      console.error(err)
      setNotification({
        show: true,
        type: "danger",
        body: "エラーが発生しました",
      })
      return
    })
  }

  const containerStyle = {
    width: "100%",
    height: "60vh",
  }

  const onNotificationClose = () => {
    setNotification({...notification, show: false})
  }

  return (
    <>
      <Meta description="位置を選んでアイドルを見てみましょう" />
      <Header />

      <Container>
        <Section>
          { notification.show &&
            <Notification color={notification.type}>
              {notification.body}
              <Button remove onClick={onNotificationClose} />
            </Notification>
          }

          <div>
            {isLoaded && <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={10}
              center={initPosition}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={onClick}
            >
              <InfoWindow position={center} onCloseClick={() => {}}>
                <p>{content}</p>
              </InfoWindow>
            </GoogleMap>}
          </div>
        </Section>
      </Container>

      <Footer />
    </>
  )
}

export default Maps
