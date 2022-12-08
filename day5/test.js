const { readFileSync } = require("fs")

/* Code  to autogenerate the map*/
const data = readFileSync("./dummy.txt", "utf8").toString().split("\n")
console.log(data)
/* starting at the top row */
const stacks = {
  1: [],
  2: [],
  3: [],
}
const NUMBER_OF_STACKS = 3

for (let index = 0; index < data.length - 1; index++) {
  const row = data[index]
  removedOpendBracket = row.replace(/\[/g, " ")
  cleaned = removedOpendBracket.replace(/\]/g, " ")

  for (let index = 0; index < cleaned.length; index++) {
    const element = cleaned[index]
    const isSymbol = !!element.trim()
    if (isSymbol) {
      console.log(`index: ${index}`, element)
      const key_in_stack = Math.floor(index / NUMBER_OF_STACKS) + 1
      console.log(key_in_stack)
    }
  }
}
