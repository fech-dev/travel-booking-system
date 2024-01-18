import { createDB } from '@/server/database'

declare module 'h3'{
  interface H3EventContext {
    db: Awaited<ReturnType<typeof createDB>>
  }
}

export default defineEventHandler(async (event) => {
  event.context.db = await createDB()
})
