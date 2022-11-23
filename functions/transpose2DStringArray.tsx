const transpose2DStringArray =  (input: string[][]) => {
  /*
  Arguments:
    inout: string[][]
  Returns:
    inputを転置したもの
  */
  const transposed_array = input[0].map((_, column_index) => { // use input[0].length array for new line
    return input.map(input_line => input_line[column_index]) // get column from each columns for new line
  })
  return transposed_array
}

export default transpose2DStringArray
