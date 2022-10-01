import { ReactElement } from "react";
import styles from "./style.module.scss";

// 用途：オプション選択時の選択肢の文字部分

interface Props {
  text: string;
}

export const SelectLabel: Function = (props: Props): ReactElement => (
  <p className={styles.label}>{props.text}</p>
)
