import { tokenizer } from "./tokenizer_2"
import { CharType, CharValue, NotImplemented } from "./Types"
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

  let tokensNew = tokenizer(file)
  console.log(tokensNew)
}

main()
