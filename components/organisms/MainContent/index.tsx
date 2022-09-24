import { ReactElement } from "react";
import { MainActionArea } from "components/molecules/MainActionArea"
import { UseGuideArea } from "components/molecules/UseGuideArea"
import styles from "./styles.module.scss"
import { getStaticProps } from "pages/exp/excel_json";
import { MainChoiceArea } from "components/molecules/MainChoiceArea";

interface Props{
  main_action_direction: string;
  main_button_elements: ReactElement;
  stepState: number;
  onAddressSeparaterActed?: Function;
  address_separater_selected?: boolean;
}

export const MainContent: Function = (props: Props) => {
  const main_area: Function = (step: number):ReactElement => {
    if(step==1 || step==2 || step==4 || step==5 || step==6 || step==7){
      return <MainActionArea main_action_direction={props.main_action_direction} main_button_elements={props.main_button_elements}/>
    }else if(step==3){
      return <MainChoiceArea main_action_direction={props.main_action_direction} main_button_elements={props.main_button_elements} onAddressSeparaterActed={props.onAddressSeparaterActed} address_separater_selected={props.address_separater_selected}/>
    }else{
      return <></>
    }
  }
  return(

    <div>
      <div>{props.stepState}</div>
      {main_area(props.stepState)}
      <UseGuideArea/>
    </div>
  )
}
