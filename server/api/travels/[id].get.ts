export default defineEventHandler((event) => {
  const { db } = event.context;
  const id = getRouterParam(event, "id");

  const data = db.data.travels.find((travel) => travel.id === id);

  if (!data) {
    return createError({
      statusCode: 404,
      message: "Travel not found",
    });
  }

  return { data };
});
