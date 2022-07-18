type tokenEnum =
  | NoOpt
  | Str(string)
  | Paren(string)
  | Number(string)

let tokenizeStrings = (input: string) => {
  let current = ref(0)
  let tokens: array<tokenEnum> = []
  let inputLen = Js.String.length(input)

  while current.contents < inputLen {
    let stringArray = Js.String.split("", input)
    let char = ref(stringArray[current.contents])

    let isNumber = Js.Re.test_(%re("/^[0-9]/"), char.contents)
    let isLetter = Js.Re.test_(%re("/^[a-z]/i"), char.contents)
    let isWhitespace = Js.Re.test_(%re("/\s/"), char.contents)

    switch true {
    | true if char.contents == "(" || char.contents == ")" => {
        let _ = Js.Array2.push(tokens, Paren(char.contents))
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
        let _ = Js.Array2.push(tokens, Number(value.contents))
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
        let _ = Js.Array2.push(tokens, Str(value.contents))
      }

    | true if isWhitespace || char.contents == " " => incr(current)

    | _ =>
      Js.Exn.raiseTypeError(
        "dont know this char: " ++
        char.contents ++
        " " ++
        "at index " ++
        Belt.Int.toString(current.contents),
      )
    }
  }
  Js.log(tokens)
}

tokenizeStrings("(add 222 4)")
