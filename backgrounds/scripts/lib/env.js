/**
 * Loads .env.local from the repo root (three levels up from scripts/lib/).
 * Import this as the FIRST import in any generation script.
 */
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const here = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(here, '../../../.env.local') })
