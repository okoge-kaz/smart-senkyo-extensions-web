import { ReactElement } from "react";
import { MainDirection } from "components/atoms/MainDirection";
import styles from "./style.module.scss";

interface Props{
  main_action_direction: string;
  main_button_elements: ReactElement;
}

export const MainActionArea: Function = (props: Props): ReactElement => {
  return(
    <div id={styles.main_action_container}>
      <MainDirection text={props.main_action_direction}/>
      {props.main_button_elements}
    </div>
  )
}
