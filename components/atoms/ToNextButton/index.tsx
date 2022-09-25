import styles from "./style.module.scss";

// 用途：ファイルアップロード等の特殊なことがない、通常の次へのボタン
// 役割：次の画面への遷移(onClick)

interface Props{
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ToNextButton = (props: Props) =>{
  return(
    <div id={styles.container}>
      <button id={styles.button} onClick={props.onClick}>{props.label}</button>
    </div>
  )
}
