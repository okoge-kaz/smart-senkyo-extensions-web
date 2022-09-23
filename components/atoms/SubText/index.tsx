import { ReactElement } from "react";
import styles from "./style.module.scss";

interface Props{
  text: string;
}

export const SubText: Function = (props: Props): ReactElement => {
  return(
    <p id={styles.text}>{props.text}</p>
  )
}
