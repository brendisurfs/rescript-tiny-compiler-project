/**
 *  starting off with lexical analysis: tokenizer.
 * */

import { TokenType, CharType } from "./Types"

// take our string of code and break int down into an array of tokens.
//

export function tokenizer(input: string): Array<TokenType> {
  // a current viarable for tracking position in the code,
  // like a cursor.
  let current = 0

  // a `tokens` array for pushing our tokens into.

  let tokens: TokenType[] = []

  // using a while loop to increment as many times as the current value,
  // as our tokens can be N length.

  while (current < input.length) {
    let char = input[current]

    //first: check for open parentheses.
    if (char === CharType.O_PAREN) {
      // if yes, push a new token with the type `paren`
      // and set the value to an open paren.
      tokens.push({
        type: CharType.O_PAREN,
        value: "(",
      })
      current += 1
      continue
    }

    // if close paren
    if (char === CharType.C_PAREN) {
      tokens.push({
        type: CharType.C_PAREN,
        value: ")",
      })
      current += 1
      continue
    }

    // HANDLING NUMBERS
    // tokenizing numbers is different, as they could be any length.
    // we want to capture the entire sequence of a number
    // in one token.

    let NUMBERS_REGEX = /[0-9]/
    if (NUMBERS_REGEX.test(char)) {
      // create a value string that we push chars to.
      let valueString = ""

      while (NUMBERS_REGEX.test(char)) {
        valueString += char
        char = input[++current] // TODO: I HATE this front ++ syntax. C was a mistake and should never have done this.
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
    if (char === CharType.D_QUOTE) {
      // keep a value to build our string token.
      let value = ""
      // skip the opening double quote .
      char = input[++current]

      // iterate through each character until we reach another double quote.

      while (char !== CharType.D_QUOTE) {
        value += char
        char = input[++current]
      }

      // and skip the closing double quote
      char = input[++current]

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

    let lettersRe = /[a-z]/i
    let isLetter = lettersRe.test(char)
    if (isLetter) {
      let value = ""

      // loop through all letters, pushing them to the value.
      while (isLetter) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: CharType.NAME, value: value })
      continue
    }

    // if we have not matched any caracters, throw an error and exit.
    throw new TypeError("I dont know what this character is: " + char)
  }
  // return all the tokens
  return tokens
}
