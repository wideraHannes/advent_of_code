/* 
find start of package marker, how many characters need to process:
start of package: 4 diffrent characters */
/* bvwbjplbgvbhsrlpgdmjqwftvncz */

/* b vwbj plbgvbhsrlpgdmjqwftvncz  */
/* 5 characters */

const { readFileSync } = require("fs")

function find_index_start_of_marker(markerLength) {
  const signal = readFileSync("./input.txt", "utf8")
  for (let index = 0; index < signal.length; index++) {
    if (index > markerLength + 1) {
      const last4 = signal.slice(index - markerLength, index)
      const all_diffrent = new Set(last4).size
      if (all_diffrent === markerLength) {
        return index
      }
    }
  }
}

/* Teil1 */
console.log(find_index_start_of_marker(4))
/* Teil2 */
console.log(find_index_start_of_marker(14))
