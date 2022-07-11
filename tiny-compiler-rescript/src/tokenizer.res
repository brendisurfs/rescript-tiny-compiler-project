type token = {name: string, value: string}

// makeStringFromMatch
let makeStringFromMatch = (chars, current, break) => {
  let stringArr = []
  let maxLen = Js.Array.length(chars) - 1
  while break.contents == false && current.contents < maxLen {
    let currentChar = chars[current.contents]
    if currentChar == " " {
      break := true
    } else {
      Js.log(currentChar)

      let newArr = Js.Array.push(currentChar, stringArr)
      Js.log2("curr: ", stringArr)
      incr(current)
    }
  }
  let combinedValue = Js.Array.joinWith("", stringArr)
  combinedValue
}

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
        let combinedString = makeStringFromMatch(chars, current, break)
        {name: "letter", value: combinedString}
      }
    | isNumber => {name: "number", value: char}
    | _ => {name: "", value: ""}
    }
  }, chars)

  Js.log(tokens)
}
