const FS = {
  "/": {
    files: ["14848514", "8504156"],
    size: 0,
    a: { files: [], size: 94853, x: { files: [], size: 94853 } },
    d: { files: [], size: 24933642 },
  },
}

function extract_all_nested_objects(path, top_level_dirs) {
  const current_dir = dynamic_traverse_tree(path)
  const sub_dirs = Object.keys(current_dir).filter(
    (attr) => attr !== "size" && attr !== "files"
  )
  for (const dir of sub_dirs) {
    const sub_path = path + "." + dir
    extract_all_nested_objects(sub_path, top_level_dirs)
    console.log(sub_path)
  }
  top_level_dirs.push(current_dir)
  return top_level_dirs
}

function dynamic_traverse_tree(path) {
  const sub_paths = path.split(".")
  let current_dir = FS
  for (const dir of sub_paths) {
    /* mit jeder iteration gehen wir ein schritt tiefer */
    current_dir = current_dir[dir]
  }
  return current_dir
}

console.log(extract_all_nested_objects("/", []))
