type tokenEnum =
  | NoOpt(int)
  | ParenOpen
  | ParenClose
  | Name(string)
  | Number(string)

let tokenizeStrings = (input: string) => {
  let current = ref(0)
  let tokens: array<string> = []
  let inputLen = Js.String.length(input)

  while current.contents < inputLen {
    let stringArray = Js.String.split("", input)
    let char = ref(stringArray[current.contents])

    // let isOpenParen = Js.Re.test_(%re("/\(/"), char.contents)
    // let isCloseParen = Js.Re.test_(%re("/\)/"), char.contents)
    let isNumber = Js.Re.test_(%re("/^[0-9]/"), char.contents)
    let isLetter = Js.Re.test_(%re("/^[a-z]/i"), char.contents)
    let isWhitespace = Js.Re.test_(%re("/\s/"), char.contents)

    switch true {
    | true if char.contents == "(" || char.contents == ")" => {
        let _ = Js.Array2.push(tokens, char.contents)
        incr(current)
      }

    | true if isNumber => {
        let value = ref("")
        let break = ref(false)
        while isNumber && current.contents < inputLen - 1 && break.contents != true {
          value := value.contents ++ char.contents

          incr(current)
          char := stringArray[current.contents]
          if char.contents == " " {
            incr(current)
            break := true
          }
        }
        let _ = Js.Array2.push(tokens, value.contents)
      }

    | true if isLetter => {
        let value = ref("")
        let break = ref(false)
        while isLetter && current.contents < inputLen - 1 && break.contents != true {
          value := value.contents ++ char.contents

          incr(current)
          char := stringArray[current.contents]
          if char.contents == " " {
            break := true
          }
        }
        let _ = Js.Array2.push(tokens, value.contents)
      }

    | true if isWhitespace || char.contents == " " => incr(current)

    | _ => incr(current)
    }
  }
  Js.log(tokens)
}

tokenizeStrings("(add 222 4)")
