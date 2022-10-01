import React from "react";
import styles from "./style.module.scss";

// 用途：「使い方」の各手順のタイトルのように数字付きのサブタイトル

interface Props {
  number: number;
  text: string;
}

export const NumberedSubTitle = React.memo((props: Props) => (
  <div id={styles.title_container}>
    <p id={styles.title_number}>{props.number}</p>
    <p id={styles.title}>{props.text}</p>
  </div>
))
