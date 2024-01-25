export default defineEventHandler((event) => {
  const { db } = event.context;

  return db.data.travels || [];
});
