/**
 * I dont know what all the things it can do 
 * but for now, 1.  I know it can run migrations 
 */

import { defineConfig } from "drizzle-kit"
import { config } from "dotenv"

config({ path: '.env'})

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})

