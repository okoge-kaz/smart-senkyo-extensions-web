import { ReactElement } from 'react'
import { UploadButton } from 'components/atoms/UploadButton'
import { Header } from 'components/organisms/Hreader'
import { MainContent } from 'components/organisms/MainContent'
import styles from "./style.module.scss"

interface Props{
  setFile: Function;
  onActed: Function;
}

export const AddFileStep: Function = (props: Props): ReactElement => {
  const main_bottun: ReactElement = <UploadButton label="Add File" onActed={props.onActed} setFile={props.setFile}/> 
  return(
    <div id={styles.page_container}>
      <Header page_title="自動名簿整形ツール"/>
      <MainContent main_action_direction="名簿整形したいファイルを選択してください shiftを押しながらで複数選択できます" main_button_elements={main_bottun}/>
    </div>
  )
}
