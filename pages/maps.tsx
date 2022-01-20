import React, { ReactElement, useState, useCallback } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import { Button, Notification } from 'react-bulma-components'
import { Layout, Meta } from '../components'
import MapsComponent from '../components/pages/Maps'
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

  const onNotificationClose = () => {
    setNotification({...notification, show: false})
  }

  return (
    <>
      <Meta description="位置を選んでアイドルを見てみましょう" />
      <Layout>
        {notification.show &&
          <Notification color={notification.type}>
            {notification.body}
            <Button remove onClick={onNotificationClose} />
          </Notification>
        }

        <MapsComponent
          isLoaded={isLoaded}
          initPosition={initPosition}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={onClick}
          center={center}
          content={content}
        />
      </Layout>
    </>
  )
}

export default Maps
