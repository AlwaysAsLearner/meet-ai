/* ***** DATABASE CONFIGURATION **** */

import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'

config({ path: '.env' })

const sql = neon(process.env.DATABASE_URL!)   // http client with fetch function provided by neon to run queries on database 
export const db = drizzle({ client: sql })  // it requires neon-http client, it wraps this client to use drizzle-orm functionlities