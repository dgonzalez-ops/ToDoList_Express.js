import express from 'express'
import { AuthRoutes } from './routes/authRoutes.js'
import { sequelize } from './config/database.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT ?? 8080
const authRoutes = new AuthRoutes()

// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error al conectar DB:', err))

app.disable('x-powered-by')// Disable 'X-Powered-By' header for security
app.use(express.json()) // Middleware to parse JSON bodies
app.use(cookieParser())

// Configura CORS para permitir desde el frontend
app.use(cors({
  origin: 'http://localhost:3000', // tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Rutas de login y registro
app.use('/auth', authRoutes.routes())

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
