import React from "react";
import styles from "./style.module.scss";

interface Props {
  text: string;
}

export const SelectLabel = React.memo((props: Props) => (
  <p className={styles.label}>
    {props.text}
  </p>
))
