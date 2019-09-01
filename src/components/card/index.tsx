import React from 'react';
import style from './index.less';

interface CardProps {
  children?: React.ReactChild;
}

const Card = function(props: CardProps) {
  const { children } = props;
  return <section className={style['card-wrapper']}>{children}</section>;
};

export default Card;
