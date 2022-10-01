import styles from "./style.module.scss";

// 用途：ファイルアップロード等の特殊なことがない、通常の戻るボタン
// 役割：前の画面への遷移(onClick)

interface Props{
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ToBackButton = (props: Props) =>{
  return(
    <div id={styles.container}>
      <button id={styles.button} onClick={props.onClick}>{props.label}</button>
    </div>
  )
}
