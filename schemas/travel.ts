import { z } from "zod";

export const TravelSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  picture: z.string(),
  price: z.string(),
  average_user_rating: z.number(),
  starts_at: z.string(),
  ends_at: z.string(),
});

export type Travel = z.infer<typeof TravelSchema>;

export const CreateTravelBodySchema = TravelSchema.omit({ id: true });
export type CreateTravelBody = z.infer<typeof CreateTravelBodySchema>;

export const EditTravelBodySchema = CreateTravelBodySchema.partial();
export type EditTravelBody = z.infer<typeof EditTravelBodySchema>;
