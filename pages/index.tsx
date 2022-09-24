import { ToNextButton } from 'components/atoms/ToNextButton';
import { UploadButton } from 'components/atoms/UploadButton';
import { Header } from 'components/organisms/Hreader';
import { MainContent } from 'components/organisms/MainContent';
import type { NextPage } from 'next';
import { ReactElement, useState } from 'react';

const Home: NextPage = () => {
  // ファイル管理
  const [fileState, setFileState] = useState<File|null>(null)
  
  // ステップ管理
  const [stepState, setStepState] = useState<number>(1);
  const proceedStep = () => {
    if(stepState<3){
      setStepState(stepState+1)
    }else{
      setStepState(1)
    }
  }

  // 1番目のステップのメインのボタン
  const add_file_button: ReactElement = <UploadButton label="Add File" onActed={proceedStep} setFile={setFileState}/> 
  // 2番目のステップのメインのボタン
  const to_option_choice_button: ReactElement = <ToNextButton label="Choose Option" onClick={proceedStep}/>

  const display_content = (step: number): ReactElement => {
    switch (step){
      case 1:
        return  <MainContent main_action_direction="名簿整形したいファイルを選択してください shiftを押しながらで複数選択できます" main_button_elements={add_file_button}/>
      case 2:
        return <MainContent main_action_direction="オプションを選択してください" main_button_elements={to_option_choice_button}/>
      // case 3:
      //   return 
      default:
        return <h1>stepはそのた</h1>
    }
  }

  
  return(
    <div>
        {/* {file?.name} */}
        <Header page_title="自動名簿整形ツール"/>
        {display_content(stepState)}
        {/* <button onClick={proceedStep}>ステップをスイッチ</button> */}
    </div>
  )
}

export default Home
