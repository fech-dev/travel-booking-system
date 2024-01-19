import { faker } from '@faker-js/faker'
import { validate } from '~/server/utils'
import { CreateBookingBodySchema } from '~/schemas'
import type { CreateBookingBody } from '~/schemas'

export default defineEventHandler(async (event) => {
  const { db } = event.context
  const body = await readBody<CreateBookingBody>(event)

  const validated = validate(CreateBookingBodySchema, body)

  const data = {
    id: faker.string.uuid(),
    ...validated
  }

  await db.update(({ bookings }) => bookings.push(data))

  setResponseStatus(event, 201)
  return { data }
})
