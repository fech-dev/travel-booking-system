import type { BookingWithTravel } from '~/schemas'

export default defineEventHandler((event) => {
  const { db } = event.context

  const data = db.data.bookings.map((booking) => {
    const travel = db.data.travels.find(({ id }) => booking.travel_id === id)

    const updatedBooking = { ...booking, travel }
    // @ts-ignore
    delete updatedBooking.travel_id

    return updatedBooking as BookingWithTravel
  })

  return { data }
})
