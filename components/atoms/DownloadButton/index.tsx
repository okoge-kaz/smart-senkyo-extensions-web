import type { ReactElement } from "react";
import styles from "./style.module.scss";

interface Props{
  label: string;
  onActed: Function;
  setFile: Function;
}

export const DownloadButton: Function = (props: Props): ReactElement =>{
  const handleFileImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) props.setFile(e.target.files) // File
    props.onActed();
  };
  return(
    <div id={styles.upload_container}>
      {/* todo:idにまとめて書きたいが{styles.~}と"~"の併用方法がわからない */}
      <input className={styles.upload_input} id="upload_input" type='file' onChange={handleFileImportChange} multiple/>
      <label htmlFor="upload_input" id={styles.upload_label}>{props.label}</label>
    </div>
  )
}
