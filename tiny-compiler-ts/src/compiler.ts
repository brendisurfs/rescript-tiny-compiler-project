import { newTokenizer, tokenizer } from "./tokenizer"
import { CharType, CharValue, NotImplemented } from "./Types"
import fs from "node:fs"
import { match } from "node:assert"
// NumberLiteral interface
interface INumberLiteral {
  enter: (node: NotImplemented, parent: NotImplemented) => void
  exit: (node: NotImplemented, parent: NotImplemented) => void
}

// Visitor Interface
interface Visitor {
  NumberLiteral: INumberLiteral
}

function main() {
  let file = "(add 2 (subtract 4 2))"
  // let tokens = tokenizer(file)
  // console.log(tokens)
  let letters = /[a-z]/
  let numbers = /[0-9]/
  let spaces = /\s/

  // file.split("").forEach((char, idx) => {
  //   if (letters.test(char)) {
  //     console.log("letter")
  //   }
  //   if (numbers.test(char)) {
  //     console.log("number")
  //   }
  //   if (spaces.test(char)) {
  //     console.log("space")
  //   }
  // })

  let tokensNew = newTokenizer(file)
  console.log(tokensNew)
}

main()
