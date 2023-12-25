// 使用示例
import request from '..';

export const getDemo = () => {
  return request.get({
    url: '/home/multidata'
  });
};

export const postDemo = (data) => {
  return request.post({
    url: '/demo',
    data
  });
};
