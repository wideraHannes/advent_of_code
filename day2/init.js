const { readFileSync } = require("fs")

function fetch_and_clean_input(filename) {
  const data = readFileSync(filename, "utf8")
  const round_string = data.split("\n")
  const round_tuple = round_string.map((round) => round.split(" "))
  return round_tuple
}

module.exports = fetch_and_clean_input
