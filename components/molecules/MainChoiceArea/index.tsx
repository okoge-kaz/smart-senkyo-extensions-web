import { CheckBox } from "components/atoms/CheckBox";
import { MainDirection } from "components/atoms/MainDirection";
import { SelectLabel } from "components/atoms/SelectLabel";
import React, { ReactElement } from "react";
import styles from "./style.module.scss";

interface Props {
  main_action_direction: string[];
  main_button_elements: ReactElement;
  on_address_separator_acted: React.MouseEventHandler<HTMLButtonElement>;
  address_separator_selected_flag: boolean;
}


export const MainChoiceArea = React.memo((props: Props) => {
  const ComingSoonChoice = () => (
    <div className={styles.choice_container}>
      <SelectLabel text="Coming Soon ..." />
    </div>
  )

  const AddressSeparatorChoice = () => (
    <div className={styles.choice_container}>
      <CheckBox onClick={props.on_address_separator_acted} checked={props.address_separator_selected_flag} />
      <SelectLabel text="住所分割" />
    </div>
  )

  return (
    <div>
      <MainDirection texts={props.main_action_direction} />
      {/* todo:ここの選択要素の指定方法でうまい方法募集　現在の方法では汎用性に欠けるがギリ許容か */}
      <AddressSeparatorChoice />
      <ComingSoonChoice />
      <ComingSoonChoice />
      {props.main_button_elements}
    </div>
  )
})
