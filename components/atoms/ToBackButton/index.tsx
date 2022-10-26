import styles from "./style.module.scss";

interface Props {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ToBackButton = (props: Props) => (
  <div id={styles.container}>
    <button id={styles.button} onClick={props.onClick}>
      {props.label}
    </button>
  </div>
)
