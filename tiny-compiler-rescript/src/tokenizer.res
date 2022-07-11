type token = {name: string, value: string}
let tokenize = (input: string) => {
  let wsRegex = Js.Re.fromString("/\s/")
  let numRegex = Js.Re.fromString("/[0-9]/")
  let lettersRegex = Js.Re.fromString("/[a-z]/")

  let current = ref(0)
  let break = ref(false)

  @genType
  let tokens: array<Types.token> = []

  let chars = Js.String.split("", input)
  let tokens = Js.Array.map(char => {
    let isNumber = Js.Re.test_(numRegex, char)
    let isLetter = Js.Re.test_(lettersRegex, char)
    let neArr = []
    switch char {
    | "(" => {
        incr(current)
        {name: "paren", value: char}
      }
    | ")" => {
        incr(current)
        {name: "paren", value: char}
      }
    | " " => {name: "space", value: char}
    | isLetter => {
        // NOTE: this needs fixing. dont quite have the handle on this yet.
        let maxLen = Js.Array.length(chars) - 1
        while break.contents == false && current.contents < maxLen {
          let currentChar = chars[current.contents]
          if currentChar == " " {
            break := true
          } else {
            Js.log(currentChar)

            let newArr = Js.Array.push(currentChar, neArr)
            Js.log2("curr: ", neArr)
            incr(current)
          }
        }
        let combinedValue = Js.Array.joinWith("", neArr)
        {name: "letter", value: combinedValue}
      }
    | isNumber => {name: "number", value: char}
    | _ => {name: "", value: ""}
    }
  }, chars)

  Js.log(tokens)
}
