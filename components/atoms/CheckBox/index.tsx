import React from "react";
import styles from "./style.module.scss";

// 用途：オプション選択肢のチェックボックス部分
// 役割：onActedでフラグを立て、checkedで選択されているかを判断し表示変更

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  checked: boolean;
}

export const CheckBox = React.memo((props: Props) => {
  return (
    <div className={styles.select_container}>
      <button className={props.checked ? styles.select_box_checked : styles.select_box_empty} onClick={props.onClick} />
    </div>
  )
})
