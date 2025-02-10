import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { UrlHandler } from './url/urlHandler'
import { UrlService } from './url/urlService'
import { UrlUseCase } from './url/urlUseCase'
import knex from 'knex'

const db = knex({
  client: 'postgres',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'test',
    database: process.env.DB_NAME || 'url',
  },
})

export const setupRoutes = (fastify: FastifyInstance) => {
  registerHealthcheck(fastify)
  registerUrlHandler(fastify)
}

function registerUrlHandler(fastify: FastifyInstance): void {
  const urlService = new UrlService(db)
  const urlUseCase = new UrlUseCase(urlService, process.env.BASE_URL || 'http://localhost:8000')
  const urlHandler = new UrlHandler(urlUseCase, fastify)

  urlHandler.register()
}

function registerHealthcheck(fastify: FastifyInstance): void {
  fastify.get('/healthcheck', async (_request: FastifyRequest, _reply: FastifyReply) => {
    return { status: 'ok' }
  })
}