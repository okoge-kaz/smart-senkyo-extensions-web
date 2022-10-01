import { ReactElement } from "react";
import styles from "./style.module.scss";

// 用途：オプション選択肢のチェックボックス部分
// 役割：onActedでフラグを立て、checkedで選択されているかを判断し表示変更

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  checked: boolean;
}

export const CheckBox: Function = (props: Props): ReactElement => {
  // todo:checkedを渡していくのは不適切なのでボタン側でチェックの状態を管理したいが以下のコメントアウトしたコードが動かないためcheckedを渡す方式にした。
  // const [checkedState, setCheckedState] = useState<boolean>(false)
  // const change = () => {
  //   setCheckedState(!checkedState)
  //   props.onActed()
  // }
  // return(
  //   <div className={styles.select_container}>
  //     <button className={checkedState ? styles.select_box_checked : styles.select_box_empty} onClick={change}/>
  //   </div>
  // )
  return (
    <div className={styles.select_container}>
      <button className={props.checked ? styles.select_box_checked : styles.select_box_empty} onClick={props.onClick} />
    </div>
  )
}
