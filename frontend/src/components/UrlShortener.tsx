import React, { useState } from 'react'
import './UrlShortenerForm.css'

const UrlShortenerForm = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setShortUrl('')

    try {
      // Replace with your API call to shorten the URL
      const response = await fetch('http://localhost:8000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (response.ok) {
        setShortUrl(data.shortUrl)
      } else {
        setError(data.message || 'Failed to shorten URL')
      }
    } catch (err) {
      setError('An error occurred while shortening the URL')
    }
  }

  return (
    <div className="url-shortener-container">
      <h2>URL Shortener</h2>
      <form className="url-shortener-form" onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter the URL to shorten"
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div className="success-message">
          <h3>Success! Here's your short URL:</h3>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <button
            className="copy-button"
            onClick={() => navigator.clipboard.writeText(shortUrl)}
          >
            Copy
          </button>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default UrlShortenerForm