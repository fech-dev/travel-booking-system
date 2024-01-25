import { faker } from '@faker-js/faker'
import { createTravel } from './travel'
import type { Booking, BookingWithTravel } from '~/schemas'

export const createBooking = (): Booking => {
  return {
    id: faker.string.uuid(),
    travel_id: faker.string.uuid(),
    customer: {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      age: faker.number.int({ min: 18, max: 40 }),
      gender: faker.helpers.arrayElement(['female', 'male', 'other'])
    },
    payment_type: faker.helpers.arrayElement(['Credit Transfer', 'PayPal', 'Revolut'])

  }
}

export const createBookingWithTravel = ():BookingWithTravel => {
  return {
    id: faker.string.uuid(),
    travel: createTravel(),
    customer: {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      age: faker.number.int({ min: 18, max: 40 }),
      gender: faker.helpers.arrayElement(['female', 'male', 'other'])
    },
    payment_type: faker.helpers.arrayElement(['Credit Transfer', 'PayPal', 'Revolut'])

  }
}
