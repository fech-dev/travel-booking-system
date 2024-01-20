import { faker } from "@faker-js/faker";
import { validate } from "~/server/utils";
import { CreateTravelBodySchema } from "~/schemas";
import type { CreateTravelBody } from "~/schemas";

export default defineEventHandler(async (event) => {
  const { db } = event.context;
  const body = await readBody<CreateTravelBody>(event);

  const validated = validate(CreateTravelBodySchema, body);

  const data = {
    id: faker.string.uuid(),
    ...validated,
  };

  await db.update(({ travels }) => travels.push(data));

  setResponseStatus(event, 201);
  return { data };
});
