import React, { ReactElement } from "react";
import styles from "./style.module.scss";

interface Props {
  text: string;
}

export const SubText = React.memo((props: Props) => (
  <p id={styles.text}>
    {props.text}
  </p>
))
