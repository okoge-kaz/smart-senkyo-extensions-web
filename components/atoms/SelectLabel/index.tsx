import { ReactElement } from "react"
import styles from "./style.module.scss"

interface Props{
  text: string;
}

export const SelectLabel: Function = (props: Props): ReactElement => {
  return(
    <p className={styles.label}>{props.text}</p>
  )
}
