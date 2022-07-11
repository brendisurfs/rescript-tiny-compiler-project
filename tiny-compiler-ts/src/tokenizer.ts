/**
 *  starting off with lexical analysis: tokenizer.
 * */

import { TokenType, CharType, CharValue } from "./Types"

// take our string of code and break int down into an array of tokens.
//

export function newTokenizer(input: string): Array<TokenType> {
  let tokens: TokenType[] = []
  let NUMBERS_REGEX = /[0-9]/
  let LETTERS = /[a-z]/
  let letterValue = ""

  input.split("").forEach((char, currentIndex) => {
    if (char == CharValue.OpenParen) {
      tokens.push({ type: CharType.PAREN, value: CharValue.OpenParen })
    }

    if (char === CharValue.CloseParen) {
      tokens.push({ type: CharType.PAREN, value: CharValue.CloseParen })
    }

    // NUMBER
    let isNumber = NUMBERS_REGEX.test(char)
    if (isNumber) {
      // create a value string that we push chars to.
      let valueString = ""

      if (isNumber) {
        valueString += char
      }
      tokens.push({ type: CharType.NUMBER, value: valueString })
    }

    // DOUBLE QUOTE
    if (char === CharValue.DQuote) {
      // keep a value to build our string token.
      let value = ""

      // skip the opening double quote .
      let next = currentIndex + 1
      char = input[next]

      // iterate through each character until we reach another double quote.
      if (char !== CharValue.DQuote) {
        value += char
      }

      // and skip the closing double quote
      next = currentIndex + 1
      char = input[next]

      tokens.push({ type: CharType.STR, value: value })
    }
    /**
     * NAME TOKEN
     * The last type of token will be a `name` token.
     * this is a sequence of letters that are the names of
     * reserved functions in our syntax.
     * example: (add 2 4)
     *           ^^^ Name Token
     */

    let isLetter = LETTERS.test(char)
    while (isLetter && char !== " ") {
      console.log(" LETTER VALU: ", letterValue)
      // BUG HERE
      letterValue += char
      char = input[++currentIndex]
    }
    tokens.push({ type: CharType.NAME, value: letterValue })
    letterValue = ""
    // if we have not matched any caracters, throw an error and exit.
  })
  return tokens
}

function handleTokenError(char: string, currentIndex: number) {
  throw TypeError(
    "I dont know what this character is: " +
      char +
      " " +
      "at index: " +
      currentIndex
  )
}
