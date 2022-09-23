import { ReactElement } from "react";
import styles from "./style.module.scss";

interface Props{
  number: number;
  text: string;
}

export const NumberedSubTitle: Function = (props: Props): ReactElement =>{
  return(
    <div id={styles.title_container}>
      <p id={styles.title_number}>{props.number}</p>
      <p id={styles.title}>{props.text}</p>
    </div>
  )
}
