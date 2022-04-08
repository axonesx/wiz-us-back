export interface Activity {
  id: number
  ownerId: number
  attendeeId: number
  title: string
  description: string
  date: Date
  duration: number
  type: string
  image: string
  location: string
}