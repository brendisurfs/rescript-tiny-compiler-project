type tokenEnum =
  | NoOpt(int)
  | ParenOpen
  | ParenClose
  | Name(string)
  | Number(string)

let tokenizeStrings = (input: string) => {
  let current = ref(0)
  let tokens: array<tokenEnum> = []
  let stringArray = Js.String.split("", input)

  while current.contents < Js.String.length(input) {
    let c = stringArray[current.contents]
    let value = ref(c)

    let isOpenParen = Js.Re.test_(%re("/\(/"), c)
    let isCloseParen = Js.Re.test_(%re("/\)/"), c)
    let isNumber = Js.Re.test_(%re("/^[0-9]/"), c)
    let isWhitespace = Js.Re.test_(%re("/\s/"), c)

    switch true {
    | true if isOpenParen => {
        incr(current)
        let _ = tokens |> Js.Array.push(ParenOpen)
        Js.log(ParenOpen)
      }
    | true if isCloseParen => {
        incr(current)
        let _ = tokens |> Js.Array.push(ParenClose)
        Js.log(ParenOpen)
      }

    | true if isNumber => {
        let break = ref(false)
        let isNextMatch = Js.Re.test_(%re("/^[0-9]/"), value.contents)
        while isNextMatch && current.contents < String.length(input) {
          incr(current)
          Js.log(value.contents)
        }
      }
    /* while isNumMatch == true { */
    /* incr(current) */
    /* value := value.contents ++ nc */
    /* } */

    | true if isWhitespace => incr(current)
    | _ => {
        incr(current)
        let _ = tokens |> Js.Array.push(NoOpt(0))
        Js.log(NoOpt(222))
      }
    }
  }
}

tokenizeStrings("hello nerds 12345 ( )")
/* let isInArray = Array.find(x => x == c, numRange) */
/* let matchedNum = switch isInArray { */
/* | Some(isInArray) => c */
/* | None => "" */
/* } */
/* Js.log(matchedNum) */

/* let matchSomeChar = Re.test_(%re("/[0-9]/"), nextChar) */
/* while isNextChar { */
/* switch matchSomeChar { */
/* | true => { */
/* Js.log("next char: " ++ nextChar) */
/* incr(current) */
/* } */
/* | _ => break := true */
/* } */
/* } */
