import { CharType, CharValue, TokenType } from "./Types"

export function tokenizer(input: string): Array<TokenType> {
  // a currentIndex viarable for tracking position in the code,
  // like a cursor.
  let currentIndex = 0
  input = input.padEnd(1)

  // a `tokens` array for pushing our tokens into.
  let tokens: TokenType[] = []
  // using a while loop to increment as many times as the currentIndex value,
  // as our tokens can be N length.

  while (currentIndex < input.length) {
    let char = input[currentIndex]
    console.log("current index: ", currentIndex)
    //first: check for open parentheses.
    if (char === CharValue.OpenParen) {
      // if yes, push a new token with the type `paren`
      // and set the value to an open paren.
      tokens.push({
        type: CharType.PAREN,
        value: CharValue.OpenParen,
      })
      currentIndex++
    }

    // if close paren
    else if (char === CharValue.CloseParen) {
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
    while (isNumber && currentIndex < input.length) {
      // create a value string that we push chars to.
      let valueString = ""

      while (isNumber && currentIndex < input.length) {
        valueString += char
        char = input[++currentIndex] // TODO: I HATE this front ++ syntax. C was a mistake and should never have done this.
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
    if (currentIndex < input.length - 1) {
      // keep a value to build our string token.
      let value = ""
      // skip the opening double quote .
      char = input[++currentIndex]

      // iterate through each character until we reach another double quote.
      while (char !== CharValue.DQuote && currentIndex < input.length) {
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
    if (isLetter && currentIndex < input.length) {
      let letterValue = ""
      // loop through all letters, pushing them to the value.
      while (isLetter && currentIndex < input.length) {
        letterValue += char
        char = input[++currentIndex]
      }
      tokens.push({ type: CharType.NAME, value: letterValue })
      continue
    }

    // if we have not matched any caracters, throw an error and exit.
    // throw TypeError(
    //   "I dont know what this character is: " +
    //     char +
    //     " " +
    //     "at index: " +
    //     currentIndex
    // )
    console.log(char)
  }
  // return all the tokens
  return tokens
}
