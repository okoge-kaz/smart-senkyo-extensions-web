import { PageTitleArea } from "components/molecules/PageTitleArea";
import { ReactElement } from "react";

// 用途：ヘッダー部分
// 役割：引数をそのまま流すだけ// todo:このorganismsいる？

interface Props {
  page_title: string;
}

export const Header: Function = (props: Props): ReactElement => (
  <PageTitleArea page_title={props.page_title} />
)
