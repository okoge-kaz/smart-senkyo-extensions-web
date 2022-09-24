import { HeaderTitle } from "components/atoms/HeaderTitle";
import { SenkyoLogo } from "components/atoms/SenkyoLogo";
import styles from "./style.module.scss";
import {ReactElement} from "react";

interface Props{
  page_title: string;
}

export const PageTitleArea: Function = (props: Props): ReactElement => {
  return(
    <div id={styles.page_title_area_container}>
      <SenkyoLogo/>
      <HeaderTitle text={props.page_title}/>
    </div>
  )
}
