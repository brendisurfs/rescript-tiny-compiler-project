import { parser } from "./parser"
import { tokenizer } from "./tokenizer"
import { NotImplemented } from "./Types"
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

  let tokens = tokenizer(file)
  let parsed = parser(tokens)
  console.log(parsed)
}

main()
