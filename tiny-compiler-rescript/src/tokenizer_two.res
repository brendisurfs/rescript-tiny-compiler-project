type tokenEnum =
  | NoOpt(int)
  | ParenOpen
  | ParenClose
  | Name(string)
  | Number(string)

let tokenizeStrings = (input: string) => {
  let current = ref(0)
  let tokens: array<tokenEnum> = []
  let inputLen = Js.String.length(input)

  while current.contents < inputLen {
    let stringArray = Js.String.split("", input)
    let char = ref(stringArray[current.contents])

    let isOpenParen = Js.Re.test_(%re("/\(/"), char.contents)
    let isCloseParen = Js.Re.test_(%re("/\)/"), char.contents)
    let isNumber = Js.Re.test_(%re("/^[0-9]/"), char.contents)
    let isLetter = Js.Re.test_(%re("/^[a-z]/i"), char.contents)
    let isWhitespace = Js.Re.test_(%re("/\s/"), char.contents)

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
        let value = ref("")
        let break = ref(false)
        while isNumber && current.contents < inputLen && break.contents != true {
          value := value.contents ++ char.contents
          incr(current)
          char := stringArray[current.contents]
          if char.contents == " " {
            break := true
          }
        }
        Js.log(value)
      }

    | true if isLetter => {
        let value = ref("")
        let break = ref(false)
        while isLetter && current.contents < inputLen && break.contents != true {
          value := value.contents ++ char.contents
          incr(current)
          char := stringArray[current.contents]
          if char.contents == " " {
            break := true
          }
        }
        Js.log(value)
      }

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
