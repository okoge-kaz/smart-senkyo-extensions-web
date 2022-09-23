import { ReactElement } from 'react';
import styles from './style.module.scss';

interface Props{
  text: string;
}

export const MainDirection = (props: Props): ReactElement  => {
  return(
    <div id={styles.main_direction_container}>
      <p id={styles.main_direction}>{props.text}</p>
    </div>
  )
}
