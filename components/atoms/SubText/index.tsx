import { ReactElement } from "react";
import styles from "./style.module.scss";

//　用途：「使い方」の説明文

interface Props{
  text: string;
}

export const SubText: Function = (props: Props): ReactElement => {
  return(
    <p id={styles.text}>{props.text}</p>
  )
}
