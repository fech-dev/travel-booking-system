import { JSONFilePreset } from 'lowdb/node'

interface Data {}

export const createDB = () => JSONFilePreset<Data>('./db.json', {} as Data)
