import styles from "./style.module.scss"

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
