import { ReactElement } from 'react';
import styles from './style.module.scss';

// 用途：画面中央のメインの指示の文章
// 役割：表示したい文字を["abc", "foo", ...]と受け取り要素ごとに改行して表示

interface Props{
  texts: string[];
}

export const MainDirection = (props: Props): ReactElement  => {
  return(
    <div id={styles.main_direction_container}>
      {props.texts.map((text, index) =>
      <p key={index} className={styles.main_direction}>
        {text}
      </p>
    )}
    </div>
  )
}
