import React, { useState, ReactNode } from 'react';
import clsx from 'clsx';
import NavLink from 'umi/navlink';
import withRouter from 'umi/withRouter';

import style from './index.less';
import logo from './logo.svg';
import searchIcon from './juejin-search-icon.svg';
import searchIconActive from './juejin-search-icon-focus.svg';

const Header: React.FC = function(props: any) {
  const { match, location, history } = props;

  return (
    <header className={style['header-wrapper']}>
      <div className={style['container']}>
        <a href="/">
          <img src={logo} className="logo" alt="logo" />
        </a>
        <NavList currentRoute={location.pathname} />

        <SearchInput />
        <div className={style['wrapper-space-between']}>
          <ActionBtn />
        </div>
        <UserLogin />
      </div>
    </header>
  );
};

type NavLinkItem = { title: string; url: string };
type NavListProps = {
  currentRoute: string;
};
const NavList: React.FC<NavListProps> = function(props) {
  const navLinks: NavLinkItem[] = [
    { title: '首页', url: '/' },
    { title: '沸点', url: '/popular' },
    { title: '话题', url: '/topic' },
    { title: '小册', url: '/books' },
    { title: '活动', url: '/events' },
  ];

  const { currentRoute } = props;

  return (
    <nav className={style['main-nav']}>
      <ul>
        {navLinks.map((item, i) => (
          <li className={`${style['nav-item']}`} key={item.url}>
            <NavLink
              to={item.url}
              exact={true}
              activeClassName="link-active"
              isActive={(match, location) =>
                i === 0 ? !!match || /welcome/.test(location.pathname) : !!match
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

const SearchInput: React.FC = function(props) {
  const [isFoucs, setIsFoucs] = useState(false);

  return (
    <div className={clsx(style['search-wrapper'], style['wrapper-space-between'])}>
      <div
        className={clsx(style['search-container'], { [style['search-border-active']]: isFoucs })}
      >
        <input
          onFocus={e => setIsFoucs(true)}
          onBlur={e => setIsFoucs(false)}
          className={style['search-input']}
          placeholder="搜索掘金"
          type="search"
        />
        <img
          className={style['search-icon']}
          src={isFoucs ? searchIconActive : searchIcon}
          alt="121"
        />
      </div>
    </div>
  );
};

const ActionBtn: React.FC = function(props) {
  const [isDropDownShow, setIsDropDownShow] = useState(false);

  return (
    <div className={clsx(style['action-wrapper'])}>
      <div className={style['action-container']}>
        <button onClick={e => setIsDropDownShow(!isDropDownShow)}>写文章</button>
        <button>▾</button>
      </div>
      {isDropDownShow ? (
        <ul className={style['action-dropdown-container']}>
          <li className={style['action-dropdown-item']}>
            <a href="/">
              <span>发布沸点</span>
            </a>
          </li>
          <li className={style['action-dropdown-item']}>
            <a href="/">
              <span>分享链接</span>
            </a>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

const UserLogin: React.FC = function(props) {
  return false ? (
    <>
      <a href="/" className={style['wrapper-space-between']}>
        <i className={clsx('iconfont', 'icon-tixing-tianchong', style['message-icon'])}></i>
      </a>
      <a href="/" className={style['wrapper-space-between']}>
        <img
          className={style['userActor']}
          src="https://user-gold-cdn.xitu.io/2019/3/2/1693f1ecd565a033?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
          alt="userActor"
        />
      </a>
    </>
  ) : (
    <div className={clsx(style['wrapper-space-between'], style['user-btn-group'])}>
      <a href="/">
        <span>登录</span>
      </a>
      {'  '}·{'  '}
      <a href="/">
        <span>
          <span>注册</span>
        </span>
      </a>
    </div>
  );
};

export default withRouter(Header);
