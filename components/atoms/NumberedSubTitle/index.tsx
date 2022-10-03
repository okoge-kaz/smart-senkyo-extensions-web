import React from "react";
import styles from "./style.module.scss";

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
