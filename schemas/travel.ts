import { z } from "zod";

const greaterThanDate = (...args: (Date | string)[]) => {
  let [a, b] = args;

  if (typeof a === "string") a = new Date(a);
  if (typeof b === "string") b = new Date(b);

  return a > b;
};

export const TravelSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z.string().min(1).max(200),
  picture: z.string().url(),
  price: z
    .string()
    .min(1)
    .regex(/([0-9]+)(\.|,)([0-9]{2})/, "Invalid price"),
  average_user_rating: z.number(),
  departure_date: z.coerce.date().or(z.string()),
  return_date: z.coerce.date().or(z.string()),
});

export type Travel = z.infer<typeof TravelSchema>;

export const CreateTravelBodySchema = TravelSchema.omit({
  id: true,
  // departure_date: true,
  // return_date: true,
})
  // .extend({
  //   departure_date: z.coerce.date().or(z.string()),
  //   return_date: z.coerce.date().or(z.string()),
  // })
  .refine(
    (schema) => greaterThanDate(schema.return_date, schema.departure_date),
    {
      path: ["return_date"],
      message: "Return date must be greater than departure date",
    }
  );
export type CreateTravelBody = z.infer<typeof CreateTravelBodySchema>;

export const EditTravelBodySchema = z.optional(CreateTravelBodySchema);
export type EditTravelBody = z.infer<typeof EditTravelBodySchema>;
