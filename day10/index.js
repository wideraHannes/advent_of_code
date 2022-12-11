const { readFileSync } = require("fs")
/* 
we have 1 Register X
command:
  - noop: 1 cycle to execute does nothing
  - addx V: adds V to Register X after 2 cycles
*/
const commands = readFileSync("./input.txt", "utf-8").split("\n")

let cycle = 1
const register_value = { 1: 1 }
commands.forEach((command) => {
  const [action, count] = command.split(" ")
  if (count) {
    /* first cycle no value change take value from last round */
    increase_cycle()
    register_value[cycle] = register_value[cycle - 1]
    /* second cycle no value change take value from last round */
    increase_cycle()
    /* third cycle change value in register with count */
    register_value[cycle] = register_value[cycle - 1] + parseInt(count)
  } else {
    increase_cycle()
    register_value[cycle] = register_value[cycle - 1]
  }
})

let sprite_middle_position = 1 // sprite width +-1
let picture = ""
function increase_cycle() {
  const crt_position = calculate_crt_position(cycle)
  sprite_middle_position = register_value[cycle]
  draw_crt(crt_position, sprite_middle_position)
  cycle++
}

function draw_crt(crt_position, sprite_middle_position) {
  const start = sprite_middle_position - 1
  const mid = sprite_middle_position
  const end = sprite_middle_position + 1
  if (crt_position === start || crt_position === mid || crt_position === end) {
    picture += "#"
  } else {
    picture += "."
  }
  if (crt_position === 39) {
    picture += "\n"
  }
}

function calculate_score() {
  const cycles = [20, 60, 100, 140, 180, 220]
  return cycles.reduce((score, cycle) => {
    const cycle_score = cycle * register_value[cycle]
    score += cycle_score
    return score
  }, 0)
}

function calculate_crt_position(cycle) {
  return (cycle - 1) % 40
}

console.log(calculate_score())

console.log(picture)
