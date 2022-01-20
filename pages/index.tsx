import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Button, Notification } from 'react-bulma-components'
import {Meta, Layout} from '../components'
import Main from '../components/pages/Main'
import { LatLng, SelectedIdols, NotificationToast } from '../types/Type'

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

  const onNotificationClose = () => {
    setNotification({...notification, show: false})
  }

  return (
    <>
      <Meta description="アイドルを3人選んで位置を特定しましょう" />
      <Layout>
        {notification.show &&
          <Notification color={notification.type}>
            {notification.body}
            <Button remove onClick={onNotificationClose} />
          </Notification>
        }
        <Main
          mapUrl={mapUrl}
          loading={loading}
          selectedIdols={selectedIdols}
          onChange={onChange}
          onSubmitIdols={onSubmitIdols}
        />
      </Layout>
    </>
  )
}

export default Home
