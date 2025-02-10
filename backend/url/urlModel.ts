export interface UrlShorteningRequest {
  url: string
}

export const urlShorteningSchema = {
  body: {
    type: 'object',
    required: ['url'],
    properties: {
      url: { type: 'string', format: 'uri' }
    }
  }
} as const;

export interface UrlShorteningResponse {
  shortUrl: string
}