import { ReactElement } from 'react'
import { ToNextButton } from 'components/atoms/ToNextButton'
import { Header } from 'components/organisms/Hreader'
import { MainContent } from 'components/organisms/MainContent'
import styles from "./style.module.scss"

interface Props{
  onActed: React.MouseEventHandler<HTMLButtonElement>;
}

export const ChooseOptionEntrance: Function = (props: Props): ReactElement => {
  const main_bottun: ReactElement = <ToNextButton label="Choose Option" onClick={props.onActed}/> 
  return(
    <div id={styles.page_container}>
      <Header page_title="自動名簿整形ツール"/>
      <MainContent main_action_direction="オプションを選択してください" main_button_elements={main_bottun}/>
    </div>
  )
}
