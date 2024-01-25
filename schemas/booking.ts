import { z } from "zod";
import type { Travel } from "~/schemas";

const CustomerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(1),
  phone: z.string().length(10),
  age: z.number({ coerce: true }).max(100),
  gender: z.enum(["male", "female", "other"]),
});

export const BookingSchema = z.object({
  id: z.number(),
  customer: CustomerSchema,
  travel_id: z.number(),
  payment_type: z.enum(["Credit Transfer", "PayPal", "Revolut"]),
  notes: z.string().max(100).optional(),
});

export type Booking = z.infer<typeof BookingSchema>;

export const CreateBookingBodySchema = BookingSchema.omit({ id: true });

export type CreateBookingBody = z.infer<typeof CreateBookingBodySchema>;

export type BookingWithTravel = Omit<Booking, "travel_id"> & { travel: Travel };
