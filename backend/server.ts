import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { setupRoutes } from './routes'

const fastify: FastifyInstance = Fastify({ logger: true })

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies, authorization headers)
})

setupRoutes(fastify)

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: 8000, host: '0.0.0.0' })
    console.log(`🚀 Server running at http://0.0.0.0:8000`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()