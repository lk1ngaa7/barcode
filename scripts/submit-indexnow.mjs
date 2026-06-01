import { readFile } from 'node:fs/promises'
import { URL } from 'node:url'

const sitemapPath = new URL('../public/sitemap.xml', import.meta.url)
const keyPath = new URL('../public/indexnow-key.txt', import.meta.url)
const endpoint = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow'
const dryRun = process.argv.includes('--dry-run')

const [sitemapXml, keyFile] = await Promise.all([
  readFile(sitemapPath, 'utf8'),
  readFile(keyPath, 'utf8')
])

const key = keyFile.trim()
const urlList = extractSitemapUrls(sitemapXml)
const host = process.env.INDEXNOW_HOST || getHost(urlList)
const keyLocation = process.env.INDEXNOW_KEY_LOCATION || `https://${host}/indexnow-key.txt`

if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  throw new Error('IndexNow key must be 8-128 characters and contain only letters, numbers, or dashes.')
}

if (urlList.length === 0) {
  throw new Error('No URLs found in public/sitemap.xml.')
}

for (const url of urlList) {
  const parsedUrl = new URL(url)
  if (parsedUrl.hostname !== host) {
    throw new Error(`Sitemap URL host ${parsedUrl.hostname} does not match IndexNow host ${host}: ${url}`)
  }
}

const payload = {
  host,
  key,
  keyLocation,
  urlList
}

if (dryRun) {
  console.log(JSON.stringify({
    endpoint,
    ...payload,
    urlCount: urlList.length
  }, null, 2))
  process.exit(0)
}

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify(payload)
})

const responseText = await response.text()

if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow submission failed with ${response.status}: ${responseText}`)
}

console.log(`Submitted ${urlList.length} URLs to IndexNow. Status: ${response.status}`)
if (responseText.trim()) {
  console.log(responseText.trim())
}

function extractSitemapUrls(xml) {
  return Array.from(xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g), match => match[1])
}

function getHost(urls) {
  return new URL(urls[0]).hostname
}
