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

  input.split("").forEach((char, currentIndex) => {
    if (char === CharValue.OpenParen) {
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

      // add our string token to our token array.
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
    // BUG: continues after add as a whole string??

    let isLetter = LETTERS.test(char)
    if (isLetter) {
      let letterValue = ""
      if (isLetter) {
        letterValue += char
      }
      tokens.push({ type: CharType.NAME, value: letterValue })
    }
    // if we have not matched any caracters, throw an error and exit.
    throw TypeError("I dont know what this character is: " + char)
  })
  return tokens
}

export function tokenizer(input: string): Array<TokenType> {
  console.log("INPUT: " + input)
  // a currentIndex viarable for tracking position in the code,
  // like a cursor.
  let currentIndex = 0

  // a `tokens` array for pushing our tokens into.
  let tokens: TokenType[] = []
  let inputLength = input.length

  // using a while loop to increment as many times as the currentIndex value,
  // as our tokens can be N length.

  while (currentIndex < inputLength) {
    let char = input[currentIndex]
    console.log("current index: ", currentIndex)
    //first: check for open parentheses.
    if (char === CharValue.OpenParen) {
      console.log("OPEN PAREN : ", char)
      // if yes, push a new token with the type `paren`
      // and set the value to an open paren.
      tokens.push({
        type: CharType.PAREN,
        value: CharValue.OpenParen,
      })
      currentIndex++
    }

    // if close paren
    if (char === CharValue.CloseParen) {
      console.log("CLOSED PAREN : ", char)
      tokens.push({
        type: CharType.PAREN,
        value: CharValue.CloseParen,
      })
      currentIndex++
      continue
    }

    /**
     * WHITESPACE
     * handling whitespace.
     * its important we handle it, but not important that we store it.
     * We are going to test for its existence, but just move on if it exists.
     * */
    let WHITESPACE = /\s/
    let isWhitespace = WHITESPACE.test(char)
    if (isWhitespace) {
      currentIndex++
      continue
    }

    // HANDLING NUMBERS
    // tokenizing numbers is different, as they could be any length.
    // we want to capture the entire sequence of a number
    // in one token.

    let NUMBERS_REGEX = /[0-9]/
    let isNumber = NUMBERS_REGEX.test(char)
    if (isNumber) {
      // create a value string that we push chars to.
      let valueString = ""

      while (isNumber) {
        valueString += char
        currentIndex++
        char = input[currentIndex] // TODO: I HATE this front ++ syntax. C was a mistake and should never have done this.
      }
      tokens.push({ type: CharType.NUMBER, value: valueString })
      continue
    }

    /** STRING SUPPORT
     * adding support with strings, surrounded by double quotes.
     *
     *    (concat "surf" "time")
     *             ^^^^    ^^^^ - string tokens.
     */
    if (char === CharValue.DQuote) {
      // keep a value to build our string token.
      let value = ""
      // skip the opening double quote .
      char = input[++currentIndex]

      // iterate through each character until we reach another double quote.
      while (char !== CharValue.DQuote) {
        value += char
        char = input[++currentIndex]
      }

      // and skip the closing double quote
      char = input[++currentIndex]

      // add our string token to our token array.
      tokens.push({ type: CharType.STR, value: value })
      continue
    }

    /**
     * NAME TOKEN
     * The last type of token will be a `name` token.
     * this is a sequence of letters that are the names of
     * reserved functions in our syntax.
     * example: (add 2 4)
     *           ^^^ Name Token
     */
    // BUG: continues after add as a whole string??

    let LETTERS = /[a-z]/
    let isLetter = LETTERS.test(char)
    console.log(isLetter)
    if (isLetter) {
      let letterValue = ""
      // loop through all letters, pushing them to the value.
      while (isLetter) {
        if (typeof char === "undefined") {
          throw TypeError(
            "I dont know what this character is: " +
              char +
              " at index: " +
              currentIndex +
              " Here is where it is: " +
              input.charCodeAt(currentIndex)
          )
        }
        letterValue += char
        char = input[++currentIndex]
      }
      tokens.push({ type: CharType.NAME, value: letterValue })
      continue
    }

    console.log(typeof char)

    // if we have not matched any caracters, throw an error and exit.
    throw TypeError("I dont know what this character is: " + char)
  }
  // return all the tokens
  return tokens
}
