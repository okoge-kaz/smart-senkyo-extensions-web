import { ToBackButton } from 'components/atoms/ToBackButton';
import { ToNextButton } from 'components/atoms/ToNextButton';
import { UploadButton } from 'components/atoms/UploadButton';
import { MainActionArea } from "components/molecules/MainActionArea";
import { MainChoiceArea } from "components/molecules/MainChoiceArea";
import { UseGuideArea } from "components/molecules/UseGuideArea";
import type { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import React from "react";
import styles from './style.module.scss';

// 用途：ページ中央にあるメインの表示要素をまとめたもの
// 役割：引数をほぼそのまま流す
//      ステップ数により表示内容を変更する
//      遷移先ページでステップごとに書き換える必要がある要素の作成
interface Props {
  step_state: number;
  address_separator_selected_flag: boolean;
  on_address_separator_acted: React.MouseEventHandler<HTMLButtonElement>;
  proceed_step: React.MouseEventHandler<HTMLButtonElement>;
  back_step: React.MouseEventHandler<HTMLButtonElement>;
  set_file_state: Dispatch<SetStateAction<File[]>>;
  convert_file: React.MouseEventHandler<HTMLButtonElement>;
  download_converted_file: MouseEventHandler<HTMLButtonElement>;
}

export const MainContent = React.memo((props: Props) => {
  // 1番目のステップのメインのボタン
  const add_file_button = <UploadButton label="Add File" onActed={props.proceed_step} setFile={props.set_file_state} />
  // 2,3番目のステップのメインのボタン
  const choose_option_button = <div className={styles.button_container}><ToBackButton label="戻る" onClick={props.back_step} /><ToNextButton label="Choose Option" onClick={props.proceed_step} /></div>
  // 4番目のステップのメインのボタン
  const convert_button = <div className={styles.button_container}><ToBackButton label="戻る" onClick={props.back_step} /><ToNextButton label="Convert" onClick={props.convert_file} /></div>
  // 5番目のステップのボタン(convert待ち)
  const no_button = <div></div>
  // 6番目のステップのボタン
  const download_button = <ToNextButton label="Download" onClick={props.download_converted_file} />
  // 7番目のステップのボタン
  const restart_button = <div className={styles.button_container}><ToBackButton label="戻る" onClick={props.back_step} /><ToNextButton label="Restart" onClick={props.proceed_step} /></div>

  const main_area = (step: number) => {
    switch (step) {
      case 1:
        return <MainActionArea main_action_direction={["名簿整形したいファイルを10個まで選択してください", "shiftを押しながら選択することで複数選択できます"]} main_button_elements={add_file_button} />
      case 2:
        return <MainActionArea main_action_direction={["オプションを選択してください"]} main_button_elements={choose_option_button} />
      case 3:
        return <MainChoiceArea main_action_direction={["オプションを選択してください"]} main_button_elements={choose_option_button} on_address_separator_acted={props.on_address_separator_acted} address_separator_selected_flag={props.address_separator_selected_flag} />
      case 4:
        return <MainActionArea main_action_direction={["名簿整形を行います"]} main_button_elements={convert_button} />
      case 5:
        return <MainActionArea main_action_direction={["処理中です..."]} main_button_elements={no_button} />
      case 6:
        return <MainActionArea main_action_direction={["Converted!", "以下の文章を確認した後にダウンロードしてください"]} main_button_elements={download_button} />
      case 7:
        return <MainActionArea main_action_direction={["Downloaded!", "他のファイルも変換する"]} main_button_elements={restart_button} />
      default:
        return <h1>手順遷移時にエラーが発生しました。ブラウザを再リロードし、初めからやり直してください。</h1>
    }
  }

  return (
    <div>
      <div className={styles.main_action_container}>
        {main_area(props.step_state)}
      </div>
      <div>
        <UseGuideArea />
      </div>
    </div>
  )
})
