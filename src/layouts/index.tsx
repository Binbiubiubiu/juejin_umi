import React from 'react';
import style from './index.less';
import Header from '../components/header';

const BasicLayout: React.FC = props => {
  return (
    <div className={style['layout-body']}>
      <Header />
      <main className={style['main-container']}>{props.children}</main>
    </div>
  );
};

export default BasicLayout;
