const { readFileSync } = require("fs")

function fetchData() {
  const data = readFileSync("./input.txt", "utf8")
  const rucksack = data.split("\n")
  return rucksack
}

function split_into_compartments(rucksack) {
  return Promise.all(
    rucksack.map((items) => {
      const index_to_split_compartments = items.length / 2
      first_compartment = items.slice(0, index_to_split_compartments)
      second_compartment = items.slice(index_to_split_compartments)
      return [first_compartment, second_compartment]
    })
  )
}

/* intersection of compartmentA and compartmentB */
function intersection([compartmentA, compartmentB]) {
  const setA = new Set(compartmentA)
  const setB = new Set(compartmentB)
  const intersection = new Set()

  for (const elem of setA) {
    if (setB.has(elem)) {
      intersection.add(elem)
    }
  }

  return intersection
}

/* 

To help prioritize item rearrangement, every item type can be converted to a priority:

Lowercase item types a through z have priorities 1 through 26.
Uppercase item types A through Z have priorities 27 through 52.
*/
function mapToPriority(setOfItems) {
  const arr = [...setOfItems]
  return arr.map((item) => {
    // item has 1 character
    const charCode = item.charCodeAt(0)
    const UPPERCASE_PRIORITY_CLEANER = 38
    const LOWERCASE_PRIORITY_CLEANER = 96
    let priority
    if (charCode > 65 && charCode < 91) {
      // Uppercase
      priority = charCode - UPPERCASE_PRIORITY_CLEANER
    }
    if (charCode > 96 && charCode < 123) {
      // lowercase
      priority = charCode - LOWERCASE_PRIORITY_CLEANER
    }
    return priority
  })
}

module.exports = {
  intersection,
  mapToPriority,
  fetchData,
  split_into_compartments,
}
