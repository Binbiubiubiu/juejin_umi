import { ArticlesType, ArticlesOrder, fetch } from '@/services/article';

const MODEL_NAMESPACE = 'welcome';

export enum WelcomeEffect {
  UPDATE_LIST,
  CLEAR_LIST,
  FETCH_ARTICLES_EFFECT,
}

export const LIST_LOADMORE = () => ({
  type: `${MODEL_NAMESPACE}/${WelcomeEffect.FETCH_ARTICLES_EFFECT}`,
  payload: {
    isRefresh: false,
  },
});

export const LIST_REFRESH = () => ({
  type: `${MODEL_NAMESPACE}/${WelcomeEffect.FETCH_ARTICLES_EFFECT}`,
  payload: {
    isRefresh: true,
  },
});

export default {
  namespace: MODEL_NAMESPACE,
  state: {
    list: [],
    hasNextPage: true,
    after: '',
  },
  reducers: {
    //@ts-ignore
    [WelcomeEffect.UPDATE_LIST](state, { payload: { data, ...a } }) {
      return {
        ...state,
        ...a,
        list: state.list.concat(data),
      };
    },
    //@ts-ignore
    [WelcomeEffect.CLEAR_LIST](state) {
      return {
        ...state,
        list: [],
        after: '',
      };
    },
  },
  effects: {
    //@ts-ignore
    *[WelcomeEffect.FETCH_ARTICLES_EFFECT]({ payload: { isRefresh } }, { call, put, select }) {
      if (isRefresh) yield put({ type: [WelcomeEffect.CLEAR_LIST] });

      const lastFetchOptions = yield select((state: any) => {
        const { pathname, query } = state.router.location;
        const sort = query.sort
          ? (query.sort as string).toUpperCase()
          : ArticlesOrder.POPULAR.toUpperCase();
        const category = pathname.split('/')[2] || -1;

        return {
          category: ArticlesType[category] || ArticlesType.recommended,
          order: sort,
          after: state[MODEL_NAMESPACE].after || '',
          tags: [],
        };
      });

      const { data } = yield call(fetch, lastFetchOptions);
      const {
        edges,
        pageInfo: { endCursor: after, hasNextPage },
      } = data.data.articleFeed.items;

      yield put({
        type: [WelcomeEffect.UPDATE_LIST],
        payload: {
          data: edges.map((item: any) => item.node),
          hasNextPage,
          after,
        },
      });
    },
  },
  subscriptions: {
    //@ts-ignore
    // setUp({ dispatch, history }) {
    //   //@ts-ignore
    //   history.listen(({ pathname, query }) => {
    //     dispatch({
    //       type: 'fetch',
    //       payload: {
    //         isRefresh: true,
    //       },
    //     });
    //   });
    // },
  },
};
