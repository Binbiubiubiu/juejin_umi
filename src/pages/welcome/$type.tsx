import React from 'react';
// import { formatMessage } from 'umi-plugin-locale';

import styles from './index.less';
import NavBar from '@/components/nav-bar';
import WelcomeList from './components/welcome-list';
import { navList } from '@/services/article';

const Page = () => {
  return (
    <>
      <NavBar items={navList}></NavBar>
      <div className={styles['welcome_body']}>
        <WelcomeList></WelcomeList>
        <aside></aside>
      </div>
    </>
  );
};

export default Page;
