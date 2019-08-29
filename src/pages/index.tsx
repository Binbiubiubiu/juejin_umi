import React from 'react';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-locale';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}></ul>
    </div>
  );
}
