import React from "react";
import styles from "./style.module.scss";

// 用途：オプション選択時の選択肢の文字部分

interface Props {
  text: string;
}

export const SelectLabel = React.memo((props: Props) => (
  <p className={styles.label}>
    {props.text}
  </p>
))
