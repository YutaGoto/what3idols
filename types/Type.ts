export interface LatLng {
  lat: number
  lng: number
}

export interface SelectedIdols {
  idol1: string
  idol2: string
  idol3: string
}

export interface NotificationToast {
  show: boolean
  type: 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger' | 'dark' | 'text'
  body: string
}
