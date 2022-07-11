import { CharType, TokenType } from "./Types"

export function tokenizer(input: string): Array<TokenType> {
  let currentIndex = 0
  input = input.padEnd(input.length + 1)
  let tokens: TokenType[] = []

  while (currentIndex < input.length) {
    let char = input[currentIndex]
    let charNotSpace = char !== " "
    // open paren
    let literalRegex = /[()]/
    if (literalRegex.test(char)) {
      tokens.push({
        type: CharType.PAREN,
        value: char,
      })
      currentIndex++
      continue
    }

    // whitespace check
    if (char === " ") {
      currentIndex++
      continue
    }

    // token numbers
    let numberRe = /\d/
    let isNumber = numberRe.test(char)
    if (isNumber && currentIndex < input.length) {
      let value = ""

      while (
        isNumber &&
        currentIndex < input.length &&
        char !== " " &&
        !literalRegex.test(char)
      ) {
        value += char
        char = input.charAt(++currentIndex)
      }
      tokens.push({ type: CharType.NUMBER, value: value })
      continue
    }

    // check for quotes
    //
    if (char === `"` && currentIndex < input.length) {
      let value = ""

      // skip opening quote
      char = input[++currentIndex]
      while (char !== `"` && currentIndex < input.length) {
        value += char
        char = input[++currentIndex]
      }
      // skip the closing quote
      char = input[++currentIndex]

      tokens.push({ type: CharType.STR, value: value })
      continue
    }

    // ops/strings token
    let stringRe = /[a-z]/i
    let isString = stringRe.test(char)
    if (isString && currentIndex < input.length) {
      let value = ""

      while (isString && currentIndex < input.length && char !== " ") {
        value += char
        char = input[++currentIndex]
      }

      tokens.push({ type: CharType.NAME, value: value })
      continue
    }
    throw new TypeError(
      "I dont know what this char is: " +
        char +
        " " +
        "At index: " +
        currentIndex
    )
  }
  return tokens
}
