/**
 *  starting off with lexical analysis: tokenizer.
 * */

import { NotImplemented } from "./Types"

enum CharType {
  O_PAREN = "(",
  C_PAREN = ")",
  NUMBER = "number",
}

// take our string of code and break int down into an array of tokens.
//

function tokenizer(input: string) {
  // a current viarable for tracking position in the code,
  // like a cursor.
  let current = 0

  // a `tokens` array for pushing our tokens into.

  let tokens = []

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

    // STRING SUPPORT
  }
}
