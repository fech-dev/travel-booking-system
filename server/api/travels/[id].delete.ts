export default defineEventHandler(async (event) => {
  const { db } = event.context;
  const id = getRouterParam(event, "id");

  const travelIndex = db.data.travels.findIndex(
    (travel) => travel.id === Number(id)
  );

  if (travelIndex === -1) {
    return createError({
      statusCode: 404,
      message: "Travel not found.",
    });
  }

  await db.update(({ travels }) => travels.splice(travelIndex, 1));

  setResponseStatus(event, 204);
  return;
});
