export enum CharType {
  PAREN = "paren",
  D_QUOTE = `quote`,
  NUMBER = "number",
  STR = "string",
  OP = "op",
}

export enum CharValue {
  OpenParen = "(",
  CloseParen = ")",
  DQuote = `"`,
}

export type NotImplemented = any

export interface TokenType {
  type: CharType
  value: string
}

export enum NodeType {
  Program = "Program",
  NumberLiteral = "NumberLiteral",
  CallExpression = "CallExpression",
  StringLiteral = "StringLiteral",
}

export interface BaseNode {
  type: NodeType
  name: string
  params: Array<BaseNode>
}
