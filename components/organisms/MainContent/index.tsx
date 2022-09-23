import { ReactElement } from "react";
import { MainActionArea } from "../../molecules/MainActionArea"
import { UseGuideArea } from "../../molecules/UseGuideArea"
import styles from "./styles.module.scss"

interface Props{
  main_action_direction: string;
  main_button_elements: ReactElement;
}

export const MainContent: Function = (props: Props) => {
  return(
    <div>
      <MainActionArea main_action_direction={props.main_action_direction} main_button_elements={props.main_button_elements}/>
      <UseGuideArea/>
    </div>
  )
}
