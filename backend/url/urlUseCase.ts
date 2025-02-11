// @ts-ignore
import * as uuid62 from 'uuid62'
import { IUrlService } from './urlService'

export interface IUrlUseCase {
  shortenUrl(url: string): Promise<string>
  getUrl(shortUrl: string): Promise<string>
}

const shrinkedUrlLength = 6

export class UrlUseCase implements IUrlUseCase {
  constructor(private urlService: IUrlService, private baseUrl: string) {
  }

  public async shortenUrl(url: string): Promise<string> {
    const maxRetries = 5
    let retryCount = 0

    while (retryCount < maxRetries) {
      const short = this.generateShortUrl(shrinkedUrlLength)

      const dbResult = await this.urlService.saveUrl({ originalUrl: url, shortUrl: short })

      if (dbResult.success) {
        return `${this.baseUrl}/${dbResult.url}`
      } else if (dbResult.message === 'Duplicate entry') {
        // Short URL is already taken, retry with a new one
        retryCount++
      } else {
        throw new Error(dbResult.message || 'Failed to shorten URL')
      }
    }

    // Max retries are reached
    throw new Error('Failed to generate a unique short URL after multiple attempts.')
  }

  public async getUrl(shortUrl: string): Promise<string> {
    const dbResult = await this.urlService.getUrl(shortUrl)

    if (dbResult.success) {
      return dbResult.originalUrl
    } else if (dbResult.message === 'URL not found') {
      throw new Error('URL not found')
    }

    throw new Error(dbResult.message || 'Failed to get original URL')
  }

  private generateShortUrl(length: number = 10): string {
    return `${uuid62.v4().substring(2, 2 + length)}`
  }
}
