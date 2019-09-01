declare type Omit1<T, K> = Pick<T, Exclude<keyof T, K>>;

export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  Cmp: React.ComponentType<P>,
) => {
  type RequiredProps = Omit1<P, keyof DP>;
  type Props = Partial<DP> & RequiredProps;
  Cmp.defaultProps = defaultProps;
  return (Cmp as React.ComponentType<any>) as React.ComponentType<Props>;
};
