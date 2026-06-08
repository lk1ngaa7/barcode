export interface ZipFileEntry {
  name: string
  content: string
}

const CRC_TABLE = makeCrcTable()

export function createZipBlob(files: ZipFileEntry[]): Blob {
  const chunks: Uint8Array[] = []
  const centralDirectory: Uint8Array[] = []
  let offset = 0

  files.forEach((file) => {
    const name = encodeUtf8(file.name)
    const data = encodeUtf8(file.content)
    const crc = crc32(data)
    const localHeader = concatBytes([
      uint32(0x04034b50),
      uint16(20),
      uint16(0),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(crc),
      uint32(data.length),
      uint32(data.length),
      uint16(name.length),
      uint16(0),
      name
    ])
    const centralHeader = concatBytes([
      uint32(0x02014b50),
      uint16(20),
      uint16(20),
      uint16(0),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(crc),
      uint32(data.length),
      uint32(data.length),
      uint16(name.length),
      uint16(0),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(0),
      uint32(offset),
      name
    ])

    chunks.push(localHeader, data)
    centralDirectory.push(centralHeader)
    offset += localHeader.length + data.length
  })

  const centralStart = offset
  const centralBytes = concatBytes(centralDirectory)
  const endRecord = concatBytes([
    uint32(0x06054b50),
    uint16(0),
    uint16(0),
    uint16(files.length),
    uint16(files.length),
    uint32(centralBytes.length),
    uint32(centralStart),
    uint16(0)
  ])

  const zipBytes = concatBytes([...chunks, centralBytes, endRecord])
  const zipBuffer = new ArrayBuffer(zipBytes.byteLength)
  new Uint8Array(zipBuffer).set(zipBytes)

  return new Blob([zipBuffer], { type: 'application/zip' })
}

function encodeUtf8(value: string): Uint8Array {
  return new TextEncoder().encode(value)
}

function concatBytes(parts: Uint8Array[]): Uint8Array {
  const totalLength = parts.reduce((sum, part) => sum + part.length, 0)
  const output = new Uint8Array(totalLength)
  let offset = 0

  parts.forEach((part) => {
    output.set(part, offset)
    offset += part.length
  })

  return output
}

function uint16(value: number): Uint8Array {
  return new Uint8Array([value & 255, (value >> 8) & 255])
}

function uint32(value: number): Uint8Array {
  return new Uint8Array([value & 255, (value >> 8) & 255, (value >> 16) & 255, (value >> 24) & 255])
}

function makeCrcTable(): number[] {
  return Array.from({ length: 256 }, (_, index) => {
    let crc = index

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 1) ? (0xedb88320 ^ (crc >>> 1)) : (crc >>> 1)
    }

    return crc >>> 0
  })
}

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff

  data.forEach((byte) => {
    crc = (CRC_TABLE[(crc ^ byte) & 255] ?? 0) ^ (crc >>> 8)
  })

  return (crc ^ 0xffffffff) >>> 0
}
