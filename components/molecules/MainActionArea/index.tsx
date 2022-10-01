import { MainDirection } from "components/atoms/MainDirection";
import { ReactElement } from "react";
import styles from "./style.module.scss";

// 用途：操作指示やボタンといったメイン部分(オプション選択画面はMainChoiceArea)
// 役割：上記部分の構成要素の配置

interface Props {
  main_action_direction: string[];
  main_button_elements: ReactElement;
}

export const MainActionArea: Function = (props: Props): ReactElement => (
  <div id={styles.main_action_container}>
    <MainDirection texts={props.main_action_direction} />
    {props.main_button_elements}
  </div>
)
