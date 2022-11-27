import { WritingOptions } from "xlsx";

const getExcelWriteOptions = (extension: string): WritingOptions => {
  /*
  Argument:
    extension: string
  Return:
    xlsx.write()に用いるオプション: WritingOptions
  */

  switch (extension){
    case "xls":
      return {
        bookType: "xls",
        bookSST: true,
        type: "array",
      };
    case "xlsx":
    default:
      return {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      };
  }
}

export default getExcelWriteOptions
