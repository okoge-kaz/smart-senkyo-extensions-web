import React from "react";
import styles from "./style.module.scss";

// 用途：ファイルのアップロードボタン
// 役割：ファイルの保存(setFile)
//      次の画面への遷移(onActed)

interface Props {
  label: string;
  onActed: Function;
  setFile: Function;
}


export const UploadButton = React.memo((props: Props) => {
  const handleFileImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) props.setFile(e.target.files) // File
    props.onActed();
  };
  return (
    <div id={styles.upload_container}>
      {/* todo:idにまとめて書きたいが{styles.~}と"~"の併用方法がわからない */}
      <input className={styles.upload_input} id="upload_input" type='file' onChange={handleFileImportChange} multiple />
      <label htmlFor="upload_input" id={styles.upload_label}>{props.label}</label>
    </div>
  )
})
