import { MainDirection } from "components/atoms/MainDirection";
import React, { ReactElement } from "react";
import styles from "./style.module.scss";

// 操作指示やボタンといったメイン部分(オプション選択画面はMainChoiceArea)

interface Props {
  main_action_direction: string[];
  main_button_elements: ReactElement;
}

export const MainActionArea = React.memo((props: Props) => (
  <div>
    <MainDirection texts={props.main_action_direction} />
    {props.main_button_elements}
  </div>
))
