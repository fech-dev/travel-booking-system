import { getNextId, validate } from "~/server/utils";
import { CreateTravelBodySchema } from "~/schemas";
import type { CreateTravelBody } from "~/schemas";

export default defineEventHandler(async (event) => {
  const { db } = event.context;
  const body = await readBody<CreateTravelBody>(event);

  const validated = validate(CreateTravelBodySchema, body);

  const data = {
    id: getNextId(db.data.travels),
    ...validated,
  };

  await db.update(({ travels }) => travels.push(data));

  setResponseStatus(event, 201);
  return { data };
});
