import { PageTitleArea } from "components/molecules/PageTitleArea";
import React from "react";

// 用途：ヘッダー部分
// 役割：引数をそのまま流すだけ// todo:このorganismsいる？

interface Props {
  page_title: string;
}

export const Header = React.memo((props: Props) => (
  <PageTitleArea page_title={props.page_title} />
))
