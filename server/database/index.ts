import { JSONFilePreset } from 'lowdb/node'
import { join } from 'desm'

interface Data {}

interface CreateDatabaseConfig {
  databaseName: string
}
export const createDatabase = async function (config: CreateDatabaseConfig) {
  const { databaseName } = config

  const dbDir = join(import.meta.url, `${databaseName}.json`)

  const db = await JSONFilePreset<Data>(dbDir, {} as Data)

  return db
}
