import React, { ReactElement } from "react";
import styles from "./style.module.scss";

// 用途：「使い方」のタイトル等項目ごとのタイトル

interface Props {
  text: string;
}

export const TopicTitle = React.memo((props: Props) => (
  <p id={styles.topic_title}>
    {props.text}
  </p>
))
