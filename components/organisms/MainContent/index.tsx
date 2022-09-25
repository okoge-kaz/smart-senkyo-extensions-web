import { MainActionArea } from "components/molecules/MainActionArea";
import { MainChoiceArea } from "components/molecules/MainChoiceArea";
import { UseGuideArea } from "components/molecules/UseGuideArea";
import { ReactElement } from "react";


// 用途：ページ中央にあるメインの表示要素をまとめたもの
// 役割：引数をほぼそのまま流す
//      ステップ数により表示内容を変更する// todo: pages/indexとの役割分けが不十分であるためこちらにボタン要素等の作成や引数の割り当ての役割を移すべき
interface Props{
  main_action_direction: string[];
  main_button_elements: ReactElement;
  stepState: number;
  onAddressSeparaterActed?: Function;// todo: 引数に?はあまり好ましくない
  address_separater_selected?: boolean;// todo: 引数に?はあまり好ましくない
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
      {main_area(props.stepState)}
      <UseGuideArea/>
    </div>
  )
}
