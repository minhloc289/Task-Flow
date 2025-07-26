import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


dotenv.config({ path: resolve(__dirname, '../../.env') })

export const connectDB = async () => {
  const uri = process.env.MONGO_URI
  if (!uri) {
    throw new Error("MONGO_URI is not defined in .env")
  }

  try {
    await mongoose.connect(uri)
    console.log("MongoDB connected")
  } catch (err: any) {
    console.error("MongoDB connection error:", err.message)
    throw err
  }
}
