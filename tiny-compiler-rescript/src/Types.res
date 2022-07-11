type node =
  | AstNode
  | CallExpressionNode
  | StringLiteralNode
  | NumberLiteralNode

type nodeType =
  | CallExpression
  | StringLiteral
  | NumberLiteral
  | Program

type astNode = {
  nodeType: nodeType,
  body: array<node>,
}

type token =
  | ParenOpen
  | ParenClose
  | Name(string)
  | Number(string)

type callExpressionNode = {
  nodeType: nodeType,
  name: string,
  params: array<node>,
}
