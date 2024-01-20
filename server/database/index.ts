import { JSONFilePreset } from "lowdb/node";
import { join } from "desm";
import type { Travel, Booking } from "~/schemas";

export interface DbSchema {
  travels: Travel[];
  bookings: Booking[];
}

const defaultData: DbSchema = {
  travels: [],
  bookings: [],
};

interface CreateDatabaseConfig {
  databaseName: string;
}
export const createDatabase = async function (config: CreateDatabaseConfig) {
  const { databaseName } = config;

  const dbDir = join(import.meta.url, `${databaseName}.json`);

  const db = await JSONFilePreset<DbSchema>(dbDir, defaultData);

  return db;
};
