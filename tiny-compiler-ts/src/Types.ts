export enum CharType {
  O_PAREN = "(",
  C_PAREN = ")",
  D_QUOTE = `"`,
  NUMBER = "number",
  STR = "string",
  NAME = "name",
}

export type NotImplemented = any

export interface TokenType {
  type: CharType
  value: string
}

export enum NodeType {
  NumberLiteral = "NumberLiteral",
  CallExpression = "CallExpression",
}

export interface BaseNode {
  type: NodeType
  name: string
  params?: Array<BaseNode>
}
