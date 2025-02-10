import knex, { Knex } from 'knex'

export interface SaveUrlResult {
  success: boolean
  message: string
  url: string
}

export interface GetUrlResult {
  success: boolean
  message: string
  originalUrl: string
}

export interface SaveUrlParams {
  originalUrl: string
  shortUrl: string
}

export interface IUrlService {
  saveUrl(data: SaveUrlParams): Promise<SaveUrlResult>
  getUrl(shortUrl: string): Promise<GetUrlResult>
}

export class UrlService implements IUrlService {
  readonly tableName: string

  constructor(private db: Knex) {
    this.tableName = 'url_shortener'
  }

  public async saveUrl(data: SaveUrlParams): Promise<SaveUrlResult> {
    try {

      const res = await this.db.raw(`
          WITH inserted AS (
              INSERT INTO ${this.tableName} (original_url, short_url)
                  VALUES (?, ?)
                  ON CONFLICT (original_url) DO NOTHING
                  RETURNING short_url)
          SELECT short_url
          FROM inserted
          UNION ALL
          SELECT short_url
          FROM ${this.tableName}
          WHERE original_url = ?
          LIMIT 1;
      `, [data.originalUrl, data.shortUrl, data.originalUrl])

      return { success: true, message: 'URL saved successfully', url: res.rows[0].short_url }
    } catch (error: any) {
      if (error.code === '23505') { // Unique violation error code for PostgreSQL
        return { success: false, message: 'Duplicate entry', url: '' }
      }
      return { success: false, message: 'Database error', url: '' }
    }
  }

  public async getUrl(shortUrl: string): Promise<GetUrlResult> {
    const res = await this.db(this.tableName)
      .select('original_url')
      .where({ short_url: shortUrl })
      .first()

    return res ? { success: true, message: 'URL found', originalUrl: res.original_url } : {
      success: false,
      message: 'URL not found',
      originalUrl: '',
    }
  }
}