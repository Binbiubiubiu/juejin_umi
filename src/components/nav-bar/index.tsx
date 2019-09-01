import React from 'react';
import NavLink from 'umi/navlink';

import style from './index.less';

type NavBarItem = { title: string; type: string };

interface NavBarProps {
  items: Array<NavBarItem>;
}

const Component = (props: NavBarProps) => {
  const { items } = props;
  if (!items || !items.length) {
    throw Error('items must to be array');
  }

  return (
    <nav className={style['nav-wrapper']}>
      <ul className={style['nav-container']}>
        {items.map((item, i) => (
          <li key={item.type}>
            <NavLink
              to={`/welcome/${item.type}`}
              activeClassName="link-active"
              isActive={(match, location) =>
                i === 0 ? !!match || location.pathname === '/' : !!match
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Component;
