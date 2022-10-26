import React from 'react';
import styles from './style.module.scss';

interface Props {
  text: string;
}

export const HeaderTitle = React.memo((props: Props) => (
  <p className={styles.header_title}>
    {props.text}
  </p>
))
