import { ReactElement } from 'react';
import styles from './style.module.scss';

// 用途：ヘッダーのページタイトル

interface Props{
  text: string;
}

export const HeaderTitle = (props: Props): ReactElement  => {
  return(
    <p className={styles.header_title}>{props.text}</p>
  )
}
