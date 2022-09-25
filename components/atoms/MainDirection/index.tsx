import { ReactElement } from 'react';
import styles from './style.module.scss';

interface Props{
  texts: string[];
}

export const MainDirection = (props: Props): ReactElement  => {
  return(
    <div id={styles.main_direction_container}>
      {props.texts.map((text, index) => 
      <p key={index} className={styles.main_direction}>{text}<br/></p>
    )}
    </div>
  )
}
