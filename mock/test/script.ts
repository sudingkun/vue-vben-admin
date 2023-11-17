import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../_util';

const scriptList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 11; i++) {
    result.push({
      title: `脚本_${i + 1}`,
      icon: 'logos:vue',
      color: '#1890ff',
      active: '100',
      new: '1,799',
      download: 'bx:bx-download',
      description: '描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
      tags: ['基础指标', '数据库'],
    });
  }
  return result;
})();

const tags = ['基础指标', '网络指标', '数据库'];

export default [
  {
    url: '/basic-api/script/list',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultPageSuccess(1, 16, scriptList);
    },
  },
  {
    url: '/basic-api/script/getTags',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(tags);
    },
  },
] as MockMethod[];
