/* 

überlegung: in my_dir steht eine Referenz auf das richtige object
-> Also sicher dir deinen gegangennen pfad

const my_dir = dynamic_traverse_tree("a.b.c.e")
my_dir["a"] = {}

*/

const FS = {
  "/": {
    files: [],
    size: 0,
  },
}

function build_object() {
  const { readFileSync } = require("fs")
  const commands = readFileSync("./input.txt", "utf8").split("\n")
  let current_path = "/" /* always inital / */

  for (let command of commands) {
    /* Read first symbol determine what action to take */

    /* command is changed inplace */
    const first_char = command[0]
    if (first_char === "$") {
      if (command === "$ cd /") {
        current_path = "/"
      } else if (command === "$ cd ..") {
        current_path = current_path.split(".").slice(0, -1).join(".")
      } else if (command === "$ ls") {
        continue
      } else {
        const directory_name = command.split(" ").at(-1)
        current_path = current_path + "." + directory_name
      }
      continue
    }
    if (first_char === "d") {
      // add directory at path position
      // add empty files array
      // add empty size value
      const directory_name = command.split(" ")[1]
      const current_dir = dynamic_traverse_tree(current_path)
      current_dir[directory_name] = {
        files: [],
        size: 0,
      }
      continue
    }
    /* add File to object */
    const file_size = command.split(" ")[0]
    const current_dir = dynamic_traverse_tree(current_path)
    current_dir.files.push(file_size)
    const file_size_int = parseInt(file_size)
    // update all parent directory sizes
    update_all_directory_sizes(current_path, file_size_int)
  }
}

function update_all_directory_sizes(current_path, file_size) {
  // updates every parent + current dir size. only if its not / directory
  let sub_paths = current_path.split(".")
  while (sub_paths.length > 0) {
    const current_dir = dynamic_traverse_tree(sub_paths.join("."))
    current_dir.size += file_size
    sub_paths.pop()
  }
}
/* ("a.b.c") */
function dynamic_traverse_tree(path) {
  const sub_paths = path.split(".")
  let current_dir = FS
  for (const dir of sub_paths) {
    /* mit jeder iteration gehen wir ein schritt tiefer */
    current_dir = current_dir[dir]
  }
  return current_dir
}

function extract_all_nested_objects(path, top_level_dirs) {
  /* 
    all the nested directories bring to the toplevel to work with them
  */
  const current_dir = dynamic_traverse_tree(path)
  const sub_dirs = Object.keys(current_dir).filter(
    (attr) => attr !== "size" && attr !== "files"
  )
  for (const dir of sub_dirs) {
    const sub_path = path + "." + dir
    extract_all_nested_objects(sub_path, top_level_dirs)
  }
  top_level_dirs.push(current_dir)
  return top_level_dirs
}

/* find all directories bigger than N and sum them up */
function find_directories_with_size_n() {
  build_object()
  console.log(FS)
  const N = 100000
  const directories = extract_all_nested_objects("/", [])
  const extracted_sizes = directories.map((dir) => dir.size)
  const sum_of_sizes = extracted_sizes.reduce((sum, current_size) => {
    if (current_size <= N) {
      sum += current_size
    }
    return sum
  }, 0)
  console.log(sum_of_sizes)
}

/* Teil 2 */
function find_smallest_directory_to_free_enough_space() {
  build_object()
  const USED_SIZE = FS["/"].size
  const MAX_SIZE = 70000000
  const AVAILABLE_SPACE = MAX_SIZE - USED_SIZE
  const NEEDED_SPACE = 30000000
  const SPACE_AMOUNT_TO_BE_FREED = NEEDED_SPACE - AVAILABLE_SPACE
  console.log(
    "At least directory size to be deleted: " + SPACE_AMOUNT_TO_BE_FREED
  )
  const directories = extract_all_nested_objects("/", [])
  const extracted_sizes = directories.map((dir) => dir.size)
  const sorted_sizes = extracted_sizes.sort((a, b) => a - b)
  for (const directorie_size of sorted_sizes) {
    if (directorie_size >= SPACE_AMOUNT_TO_BE_FREED) {
      console.log("smallest directory size: " + directorie_size)
      return
    }
  }
}

/* find_directories_with_size_n() */

find_smallest_directory_to_free_enough_space()
