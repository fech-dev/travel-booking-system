export default defineEventHandler((event) => {
  const { db } = event.context

  const data = db.data.travels

  return { data }
})
