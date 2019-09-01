import request from '@/utils/request';

const FETCH_PAGE_SIZE = 20;

export const navList = [
  { title: '推荐', type: 'recommended' },
  { title: '后端', type: 'backend' },
  { title: '前端', type: 'frontend' },
  { title: 'Android', type: 'android' },
  { title: 'iOS', type: 'ios' },
  { title: '人工智能', type: 'ai' },
  { title: '开发工具', type: 'freebie' },
  { title: '代码人生', type: 'career' },
  { title: '阅读', type: 'article' },
];

export enum ArticlesType {
  recommended = '',
  backend = '5562b419e4b00c57d9b94ae2',
  frontend = '5562b415e4b00c57d9b94ac8',
  android = '5562b410e4b00c57d9b94a92',
  ios = '5562b405e4b00c57d9b94a41',
  ai = '57be7c18128fe1005fa902de',
  freebie = '5562b422e4b00c57d9b94b53',
  career = '5c9c7cca1b117f3c60fee548',
  article = '5562b428e4b00c57d9b94b9d',
}

export const orderItems = [
  { type: 'POPULAR', title: '热门' },
  { type: 'NEWEST', title: '最新' },
  { type: 'THREE_DAYS_HOTTEST', title: '热榜' },
];

export enum ArticlesOrder {
  POPULAR = 'POPULAR',
  NEWEST = 'NEWEST',
  THREE_DAYS_HOTTEST = 'THREE_DAYS_HOTTEST',
}

export interface ArticlesFetchOptions {
  tags?: Array<string>;
  category?: string;
  order: ArticlesOrder;
  after: string;
}
export function fetch(options: ArticlesFetchOptions) {
  return request(`https://web-api.juejin.im/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Agent': 'Juejin/Web',
    },
    body: JSON.stringify({
      operationName: '',
      query: '',
      variables: { first: FETCH_PAGE_SIZE, ...options },
      extensions: { query: { id: '653b587c5c7c8a00ddf67fc66f989d42' } },
    }),
  });
}
