import express from 'express'
import cors from 'cors'
import { connectDB } from './connect'
import authRoutes from './routes/auth.route'

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Define routes

// @desc Authentication routes
// @route /api/auth
app.use('/api/auth', authRoutes);



// @desc Check if the server is running
connectDB()
  .then(() => {
    console.log("🚀 Starting server...")
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error("App failed to start:", err)
  })