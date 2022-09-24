import { ReactElement } from "react";
import { PageTitleArea } from "components/molecules/PageTitleArea"
import styles from "./style.module.css"

interface Props{
  page_title: string;
}

export const Header: Function = (props: Props): ReactElement => {
  return(
    <PageTitleArea page_title={props.page_title}/>
  )
}
