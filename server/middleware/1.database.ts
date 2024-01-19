import { createDatabase } from '@/server/database'

declare module 'h3'{
  interface H3EventContext {
    db: Awaited<ReturnType<typeof createDatabase>>
  }
}

export default defineEventHandler(async (event) => {
  const { databaseName } = useRuntimeConfig(event)

  event.context.db = await createDatabase({ databaseName })
})
