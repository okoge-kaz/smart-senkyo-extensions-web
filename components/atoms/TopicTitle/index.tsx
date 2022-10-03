import React from "react";
import styles from "./style.module.scss";

interface Props {
  text: string;
}

export const TopicTitle = React.memo((props: Props) => (
  <p id={styles.topic_title}>
    {props.text}
  </p>
))
