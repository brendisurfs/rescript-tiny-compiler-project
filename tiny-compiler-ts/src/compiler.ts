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
