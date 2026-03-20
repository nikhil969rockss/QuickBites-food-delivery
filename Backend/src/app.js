//library
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()


//middlewares imports
import errorMiddleware from './middlewares/error.middlerware.js'


const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(errorMiddleware)

export default app;