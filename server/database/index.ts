import { JSONFilePreset } from 'lowdb/node'
import { join } from 'desm'
import type { Travel } from '~/schemas'

export interface DbSchema {
  travels: Travel[]
}

const defaultData: DbSchema = {
  travels: []
}

interface CreateDatabaseConfig {
  databaseName: string
}
export const createDatabase = async function (config: CreateDatabaseConfig) {
  const { databaseName } = config

  const dbDir = join(import.meta.url, `${databaseName}.json`)

  const db = await JSONFilePreset<DbSchema>(dbDir, defaultData)

  return db
}
