const { readFileSync } = require("fs")
/* https://en.wikipedia.org/wiki/Lexicographic_order */

const stacks2 = {
  1: ["Z", "N"],
  2: ["M", "C", "D"],
  3: ["P"],
}

const stacks = {
  1: ["G", "T", "R", "W"],
  2: ["G", "C", "H", "P", "M", "S", "V", "W"],
  3: ["C", "L", "T", "S", "G", "M"],
  4: ["J", "H", "D", "M", "W", "R", "F"],
  5: ["P", "Q", "L", "H", "S", "W", "F", "J"],
  6: ["P", "J", "D", "N", "F", "M", "S"],
  7: ["Z", "B", "D", "F", "G", "C", "S", "J"],
  8: ["R", "T", "B"],
  9: ["H", "N", "W", "L", "C"],
}

function cargo_crane(command_as_arr) {
  command_as_arr.forEach(([count, from, to]) => {
    while (count > 0) {
      const top_of_stack = stacks[from].pop()
      stacks[to].push(top_of_stack)
      count--
    }
  })
}

function cargo_crane_version2(command_as_arr) {
  command_as_arr.forEach(([count, from, to]) => {
    /* splice removes inplace from given index and returns
      the removed items */
    const top_of_stack = stacks[from].splice(-count)
    stacks[to].push(...top_of_stack)
  })
}

function log_tos() {
  let full_tos = ""
  for (const [key, value] of Object.entries(stacks)) {
    const tos = value.slice(-1)[0]
    full_tos += tos
  }
  console.log(full_tos)
}

async function fetchData() {
  const data = readFileSync("./input.txt", "utf8")
  const command_as_string = data.split("\n")
  return Promise.all(
    command_as_string.map((string) => {
      const [_1, count, _2, from, _3, to] = string.split(" ")
      return [parseInt(count), parseInt(from), parseInt(to)]
    })
  )
}

async function teil1() {
  const command_as_arr = await fetchData()
  cargo_crane(command_as_arr)
  log_tos()
}

async function teil2() {
  const command_as_arr = await fetchData()
  cargo_crane_version2(command_as_arr)
  log_tos()
}

teil2()
/* teil1() */
