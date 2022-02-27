// import * as fs from 'fs'

export const sortByASC = (
  array: { start: number; end: number }[]
): { start: number; end: number }[] => {
  return array.sort((a, b) => a.start - b.start)
}

export const getSubstringsFromPosition = (
  content: string,
  positions: { start: number; end: number }[]
): any[] => {
  let initialPos = 0
  const substringArr = []

  const orderedPositions = sortByASC(positions)

  for (let offset of orderedPositions) {
    const { start, end } = offset

    if (initialPos < start) {
      substringArr.push({
        start: initialPos,
        end: start,
        content: content.slice(initialPos, start),
      })
    }

    substringArr.push({
      ...offset,
      isMarked: true,
      content: content.slice(start, end),
    })

    initialPos = end
  }

  if (initialPos < content.length) {
    substringArr.push({
      start: initialPos,
      end: content.length,
      content: content.slice(initialPos, content.length),
    })
  }

  return substringArr
}

// export const extractTextFromTxtFile = () => {
//   let convertedText

//   convertedText = fs.readFileSync('./corpus/hemingway.txt')

//   return convertedText.toString()
// }

// normalizes the entire text
export const generateTokensFromText = (text: string) => {
  const tokenizedText = text
    .replace(/[^a-zA-Z ]/g, ' ') // only get all letters
    .split(' ') // create array of every word
    .filter((e) => e.length !== 0) // remove all empty items
    .map((e) => e.toLowerCase()) // all items forced to lower case

  return tokenizedText
}
