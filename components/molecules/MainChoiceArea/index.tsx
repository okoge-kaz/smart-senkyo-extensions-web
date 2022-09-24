import { ReactElement } from "react";
import { MainDirection } from "components/atoms/MainDirection";
import styles from "./style.module.scss";
import { SelectLabel } from "components/atoms/SelectLabel";
import { CheckBox } from "components/atoms/CheckBox";

interface Props{
  main_action_direction: string;
  main_button_elements: ReactElement;
  onAddressSeparaterActed: Function;
  address_separater_selected: boolean;
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
        <CheckBox onActed={props.onAddressSeparaterActed} checked={props.address_separater_selected}/>
        <SelectLabel text="住所分割"/>
      </div>
    )
  }
  return(
    <div id={styles.main_choice_container}>
      <MainDirection text={props.main_action_direction}/>
      {/* todo:ここの選択要素の指定方法でうまい方法募集　現在の方法では汎用性に欠けるがギリ許容か */}
      <AddressSeparaterChoice onActed={props.onAddressSeparaterActed}/>
      <ComingSoonChoice/>
      <ComingSoonChoice/>
      {/* 隙間用のdiv todo:隙間空けるために新しい要素は作りたくないがこの方法は微妙 */}
      <div className={styles.margin_div}></div>
      {props.main_button_elements}
    </div>
  )
}
