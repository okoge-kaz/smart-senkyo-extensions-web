import { AddFileStep } from 'components/templates/AddFileStep';
import { ChooseOptionEntrance } from 'components/templates/ChooseOptionEntrance';
import type { NextPage } from 'next';
import { ReactElement, useState } from 'react';

const Home: NextPage = () => {
  // ステップ管理
  const [step, setStep] = useState<number>(1);
  const proceedStep = () => {
    if(step<3){
      setStep(step+1)
    }else{
      setStep(1)
    }
  }

  const display_content = (step: number): ReactElement => {
    switch (step){
      case 1:
        return <AddFileStep setFile={setFile} onActed={proceedStep}/>
      case 2:
        return <ChooseOptionEntrance onActed={proceedStep}/>
      case 3:
        return 
      default:
        return <h1>stepはそのた</h1>
    }
  }

  // ファイル管理
  const [file, setFile] = useState<File|null>(null)
  
  return(
    <div>
        {file?.name}
        {display_content(step)}
        <button onClick={proceedStep}>ステップをスイッチ</button>
    </div>
  )
}

export default Home
