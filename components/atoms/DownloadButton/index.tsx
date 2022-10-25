import React from "react"
import styles from "./style.module.scss"

interface Props {
  label: string
  onActed: Function
  setFile: Function
}

export const DownloadButton = React.memo((props: Props) => {
  const handle_file_import_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) props.setFile(e.target.files) // File
    props.onActed()
  };
  return (
    <div id={styles.upload_container}>
      <input className={styles.upload_input} id="upload_input" type='file' onChange={handle_file_import_change} multiple />
      <label htmlFor="upload_input" id={styles.upload_label}>
        {props.label}
      </label>
    </div>
  )
})
