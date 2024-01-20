import { validate } from "~/server/utils";
import { EditTravelBodySchema } from "~/schemas";
import type { EditTravelBody } from "~/schemas";

export default defineEventHandler(async (event) => {
  const { db } = event.context;
  const id = getRouterParam(event, "id");
  const body = await readBody<EditTravelBody>(event);

  const validated = validate(EditTravelBodySchema, body);

  const travelIndex = db.data.travels.findIndex((travel) => travel.id === id);

  if (travelIndex === -1) {
    return createError({
      statusCode: 404,
      message: "Travel not found.",
    });
  }

  const data = {
    ...db.data.travels[travelIndex],
    ...validated,
  };

  await db.update(({ travels }) => travels.splice(travelIndex, 1, data));

  return { data };
});
