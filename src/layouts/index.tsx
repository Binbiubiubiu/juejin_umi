import React from 'react';
import style from './index.less';
import Header from '../components/header';

const BasicLayout: React.FC = props => {
  return (
    <div>
      <Header></Header>
      <main className={style['main-body']}>{props.children}</main>
    </div>
  );
};

export default BasicLayout;
