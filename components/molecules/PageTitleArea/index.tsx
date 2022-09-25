import { HeaderTitle } from "components/atoms/HeaderTitle";
import { SenkyoLogo } from "components/atoms/SenkyoLogo";
import { ReactElement } from "react";
import styles from "./style.module.scss";

// 用途：ヘッダー部分
// 役割：ヘッダー構成要素の配置

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
