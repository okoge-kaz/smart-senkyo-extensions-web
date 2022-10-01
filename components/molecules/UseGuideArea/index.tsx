import { NumberedSubTitle } from "components/atoms/NumberedSubTitle"
import { SubText } from "components/atoms/SubText"
import { TopicTitle } from "components/atoms/TopicTitle"
import React from "react"
import styles from "./style.module.scss"
// 用途：画面下部の使い方
// 役割：使い方を構成する要素の配置

export const UseGuideArea = React.memo(() => (
  <div id={styles.use_guide_container}>
    <TopicTitle text="使い方" />
    <div id={styles.step_container}>
      <div>
        <NumberedSubTitle number='1' text="ファイルを選択する" />
        <SubText text="名簿整形したいファイルを選択する。複数選択可能であり、入力可能なファイルはエクセルファイルのみ(.xlsもしくは.xlsx)。" />
      </div>
      <div>
        <NumberedSubTitle number='2' text="オプションを選択する" />
        <SubText text="住所分割を行うかどうかを選択する。" />
      </div>
      <div>
        <NumberedSubTitle number='3' text="名簿整形を実行する" />
        <SubText text="Convertボタンをクリックすると、実行され、結果がダウンロードできる。" />
      </div>
    </div>
  </div>
))
