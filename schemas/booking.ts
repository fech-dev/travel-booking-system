import { z } from 'zod'

const CustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  age: z.number(),
  gender: z.enum(['male', 'female', 'other'])
})

export const BookingSchema = z.object({
  id: z.string(),
  customer: CustomerSchema,
  travel_id: z.string(),
  payment_type: z.enum(['Credit Transfer', 'PayPal', 'Revolut']),
  notes: z.string().optional()
})

export type Booking = z.infer<typeof BookingSchema>

export const CreateBookingBodySchema = BookingSchema.omit({ id: true })

export type CreateBookingBody = z.infer<typeof CreateBookingBodySchema>
