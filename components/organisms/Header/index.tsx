import { PageTitleArea } from "components/molecules/PageTitleArea";
import React from "react";

interface Props {
  page_title: string;
}

export const Header = React.memo((props: Props) => (
  <PageTitleArea page_title={props.page_title} />
))
