import React, { useState, useEffect, MouseEvent } from 'react';
import NavLink from 'umi/navlink';
import Link from 'umi/link';
import clsx from 'clsx';
import { connect } from 'dva';
import dateUtils from '@/utils/date';
import throttle from 'lodash/throttle';
import { History } from 'history';
import withRouter from 'umi/withRouter';
import router from 'umi/router';

import styles from './index.less';
import Card from '@/components/card';
import ZanIcon from '@/assets/articles/zan.svg';
import ZanActiveIcon from '@/assets/articles/zan-active.svg';
import CommentIcon from '@/assets/articles/comment.svg';
import { orderItems } from '@/services/article';
import { LIST_LOADMORE, LIST_REFRESH } from '@/models/welcome';

const List = (props: any) => {
  const { list, history, loadMore, refresh } = props;
  useEffect(() => {
    const unlisten = history.listen(() => {
      // location is an object like window.location
      refresh();
    });
    window.onscroll = throttle(() => {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
      // console.log('滚动 ');
      if (scrollTop + windowHeight === scrollHeight) {
        //写后台加载数据的函数
        // console.log(
        //   '距顶部' + scrollTop + '可视区高度' + windowHeight + '滚动条总高度' + scrollHeight,
        // );
        loadMore();
      }
    });
    return () => {
      window.onscroll = null;
      unlisten();
    };
  }, []);

  return (
    <Card>
      <>
        <header className={styles['list-header']}>
          <nav>
            <ul className={styles['list-nav']}>
              {orderItems.map((item, i) => (
                <li className={styles['list-nav-item']} key={item.type}>
                  <NavLink
                    to={`?sort=${item.type}`}
                    activeClassName="link-active"
                    isActive={(_match, location: History.LocationState) =>
                      i === 0
                        ? !location.query.sort || location.query.sort === item.type
                        : location.query.sort === item.type
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <ul>
          {list.map((item: any) => (
            <ListItem data={item} key={item.id}></ListItem>
          ))}
        </ul>
      </>
    </Card>
  );
};

export default connect(
  ({ welcome }: any) => ({ ...welcome }),
  dispatch => {
    return {
      loadMore: () => dispatch(LIST_LOADMORE()),
      refresh: () => dispatch(LIST_REFRESH()),
    };
  },
)(withRouter(List));

const ListItem = (props: any) => {
  const [isZan, setisZan] = useState(false);

  const handleClickZan = (e: MouseEvent) => {
    setisZan(!isZan);
  };

  const handleRouterChange = (e: MouseEvent, url: string) => {
    if (((e.target as Element).nodeName as string).toLowerCase() === 'a') return;
    router.push(url);
  };

  const { data } = props;

  return (
    <li className={styles['list-item']}>
      <div
        className={styles['list-item-container']}
        onClick={e => {
          handleRouterChange(e, data.originalUrl);
        }}
      >
        <ul className={styles['top-list']}>
          <li>专栏</li>
          <li>
            <Link to={`https://juejin.im/user/${data.user.id}`}>{data.user.username}</Link>
          </li>
          <li> {dateUtils(data.createdAt).fromNow()}</li>
          <li>
            <Link to="/">{data.tags[0] ? data.tags[0].title : ''}</Link>
          </li>
        </ul>
        <div className={styles['list-item-main-row']}>
          <Link to={data.originalUrl} className={styles['title']}>
            {data.title}
          </Link>
        </div>
        <ul className={styles['button-list']}>
          <li>
            <div
              onClick={handleClickZan}
              className={clsx(styles['button-item'], { [styles['button-item-active']]: isZan })}
            >
              <img src={isZan ? ZanActiveIcon : ZanIcon} alt="zan-icon"></img>
              {data.likeCount ? <span>{data.likeCount}</span> : ''}
            </div>
          </li>
          <li>
            <a href="/" className={styles['button-item']}>
              <img src={CommentIcon} alt="comment-icon"></img>
              {data.commentsCount ? <span>{data.commentsCount}</span> : ''}
            </a>
          </li>
        </ul>

        {data.screenshot ? (
          <img src={data.screenshot} className={styles['list-item-img']} alt="list-item-img"></img>
        ) : null}
      </div>
    </li>
  );
};
