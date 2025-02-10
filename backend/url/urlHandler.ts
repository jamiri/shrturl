import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { UrlShorteningRequest, UrlShorteningResponse, urlShorteningSchema } from './urlModel'
import { IUrlUseCase } from './urlUseCase'

export class UrlHandler {
  constructor(private urlUseCase: IUrlUseCase, private fastify: FastifyInstance) {
  }

  public register() {
    this.fastify.post('/shorten', {schema: urlShorteningSchema} ,this.shortenUrl)
    this.fastify.get('/:shortUrl', this.getUrl)
  }

  public shortenUrl = async (request: FastifyRequest<{
    Body: UrlShorteningRequest
  }>, reply: FastifyReply): Promise<UrlShorteningResponse> => {
    const { url } = request.body
    const shortUrl = await this.urlUseCase.shortenUrl(url)
    return { shortUrl }
  }

  public getUrl = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { shortUrl } = request.params as { shortUrl: string }
    try {
      const originalUrl = await this.urlUseCase.getUrl(shortUrl)
      reply.redirect(originalUrl)
    } catch (error) {
      reply.status(404).send({ message: 'URL not found' })
    }
  }
}