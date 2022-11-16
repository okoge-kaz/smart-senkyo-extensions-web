const transpose2DStringArray =  (input: string[][]) => input[0].map((_, c) => input.map(r => r[c]))

/*
Arguments:
  inout: string[][]
Returns:
  inputを転置したもの
*/

export default transpose2DStringArray
