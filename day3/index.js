const {
  fetchData,
  split_into_compartments,
  intersection,
  mapToPriority,
} = require("./helper")

async function items_in_both_compartments() {
  const rucksack = fetchData()
  const rucksack_in_compartments = await split_into_compartments(rucksack)
  const same_items = rucksack_in_compartments.map((compartments) => {
    return intersection(compartments)
  })
  const prioritize_items_per_rucksack = same_items.map((item_set) =>
    mapToPriority(item_set)
  )
  const all_priority_items = prioritize_items_per_rucksack.flat()
  const sum_of_all_priority_items = all_priority_items.reduce(
    (sum, priority) => {
      sum += priority
      return sum
    },
    0
  )
  /* Solution of Part1 */
  console.log(`Teil 1 ${sum_of_all_priority_items}`)
}

async function items_in_group_of_3_elves() {
  const rucksacks = await fetchData()
  const unique_items_in_rucksack = rucksacks.map((rucksack) => [
    ...new Set(rucksack),
  ])
  const group_of_3 = unique_items_in_rucksack.reduce(
    (groups, currentRucksack, index) => {
      groupNr = Math.floor(index / 3)
      if (!groups[groupNr]) groups[groupNr] = []
      groups[groupNr].push(currentRucksack)
      return groups
    },
    []
  )
  intersecting_items_in_group = group_of_3.map((group) => {
    const [elv1, elv2, elv3] = group
    const intersecting_items_in_1_and_2_as_set = intersection([elv1, elv2])
    const intersecting_in_1_2_3 = intersection([
      [...intersecting_items_in_1_and_2_as_set],
      elv3,
    ])
    return intersecting_in_1_2_3
  })
  const prioritize_items_group = intersecting_items_in_group.map((item_set) =>
    mapToPriority(item_set)
  )
  const all_priority_items = prioritize_items_group.flat()
  const sum_of_all_priority_items = all_priority_items.reduce(
    (sum, priority) => {
      sum += priority
      return sum
    },
    0
  )
  console.log(`Teil 2 ${sum_of_all_priority_items}`)
}

items_in_both_compartments()
items_in_group_of_3_elves()
