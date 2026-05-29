export interface ParsedSpreadsheetRow {
  id: string
  lineNumber: number
  barcodeValue: string
  labelText: string
  extraText: string
}

export function parseSpreadsheetPaste(input: string): ParsedSpreadsheetRow[] {
  return input
    .split(/\r?\n/)
    .map((line, index) => ({
      lineNumber: index + 1,
      cells: parseSpreadsheetLine(line)
    }))
    .filter((row) => row.cells.some((cell) => cell.trim().length > 0))
    .map((row) => {
      const barcodeValue = (row.cells[0] || '').trim()
      const labelText = (row.cells[1] || '').trim()
      const extraText = (row.cells[2] || '').trim()

      return {
        id: `${row.lineNumber}-${barcodeValue}-${labelText}-${extraText}`,
        lineNumber: row.lineNumber,
        barcodeValue,
        labelText,
        extraText
      }
    })
}

function parseSpreadsheetLine(line: string): string[] {
  if (line.includes('\t')) {
    return line.split('\t')
  }

  if (line.includes(',')) {
    return parseCsvLine(line)
  }

  return [line]
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = []
  let currentCell = ''
  let inQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    const nextCharacter = line[index + 1]

    if (character === '"' && inQuotes && nextCharacter === '"') {
      currentCell += '"'
      index += 1
      continue
    }

    if (character === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (character === ',' && !inQuotes) {
      cells.push(currentCell)
      currentCell = ''
      continue
    }

    currentCell += character
  }

  cells.push(currentCell)

  return cells
}
