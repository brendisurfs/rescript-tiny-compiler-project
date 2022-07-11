import {
  BaseNode,
  CallExpressionNode,
  CharType,
  CharValue,
  NodeType,
  TokenType,
} from "./Types"

// -------------------------------------------------------
/**
 *  Parser:
 *  we aregoing to take our array of tokens and turn it into an AST.
 * */
export function parser(tokens: Array<TokenType>) {
  // keep a current vairable to use as a cursor.
  let current = 0

  // this time, we will use recursion instead of a while loop.
  function walk() {
    // grab the current token
    let token = tokens[current]

    // split each type of token into a different code path,
    // starting with the number tokens.
    if (token.type === CharType.NUMBER) {
      // if we have a number token, we increment current.
      current += 1
      return {
        type: NodeType.NumberLiteral,
        value: token.value,
      }
    }
    // -----------------------------------------------
    if (token.type === CharType.STR) {
      current += 1
      return {
        type: NodeType.StringLiteral,
        value: token.value,
      }
    }
    // this section looks for CallExpressions.
    // we will start with looking for open parens.
    if (token.type === "paren" && token.value === "(") {
      //  increment current to skip the paren.
      token = tokens[++current]
      // create a base node with the type `CallExpression`.
      // We are going to set the namse as the current tokens value,
      // since the next token afer the open paren is the name of the fn.

      let node: CallExpressionNode = {
        type: NodeType.CallExpression,
        name: token.value,
        params: [],
      }
      token = tokens[++current]

      // now, loop thorugh each token that will be the `params`
      // of our CallExpression until we encounter a closing paren.

      // this is where we use recursion. Instead of trying to parse
      // potentially infinitely nested set of nodes, we are going to
      // rely on recursion to resolve this.

      while (
        token.type !== "paren" ||
        (token.value !== "(" && token.value !== ")")
      ) {
        // we call the walk function which will return a node,
        // and we can push it into our node.params field.
        node.params.push(walk())
        token = tokens[++current]
      }
      current++
      return node
    }

    // if we dont recognize the token, throw an error.

    // throw new TypeError(JSON.stringify(token))
  }

  // create the AST which wil have a root of `Program` node.
  let ast = {
    type: NodeType.Program,
    body: [] as any,
  }

  // using our walk function, push nodes to ast.body array.
  // the reason we do this inside a loop is because
  // our program can have `CallExpression` one after another,
  // instead of being nested.

  while (current < tokens.length - 1) {
    ast.body.push(walk())
  }

  // at the end of parsing, we will return the ast.
  return ast
}
