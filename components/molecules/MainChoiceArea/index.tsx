import { CheckBox } from "components/atoms/CheckBox";
import { MainDirection } from "components/atoms/MainDirection";
import { SelectLabel } from "components/atoms/SelectLabel";
import { ReactElement } from "react";
import styles from "./style.module.scss";

// 用途：オプション選択部分
// 役割：チェックボックス選択画面の構成要素の配置

interface Props{
  main_action_direction: string[];
  main_button_elements: ReactElement;
  onAddressSeparaterActed: React.MouseEventHandler<HTMLButtonElement>;
  address_separater_selected_flag: boolean;
}


export const MainChoiceArea: Function = (props: Props): ReactElement => {
  const ComingSoonChoice: Function = (): ReactElement => {
    return(
      <div className={styles.choice_container}>
        <SelectLabel text="Coming Soon ..."/>
      </div>
    )
  } 

  const AddressSeparaterChoice: Function = ():ReactElement => {
    return(
      <div className={styles.choice_container}>
        <CheckBox onClick={props.onAddressSeparaterActed} checked={props.address_separater_selected_flag}/>
        <SelectLabel text="住所分割"/>
      </div>
    )
  }
  return(
    <div id={styles.main_choice_container}>
      <MainDirection texts={props.main_action_direction}/>
      {/* todo:ここの選択要素の指定方法でうまい方法募集　現在の方法では汎用性に欠けるがギリ許容か */}
      <AddressSeparaterChoice/>
      <ComingSoonChoice/>
      <ComingSoonChoice/>
      {props.main_button_elements}
    </div>
  )
}