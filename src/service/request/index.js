import axios from 'axios';

class Request {
  constructor(config) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      (config) => {
        // 加载/令牌
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }

  request(config) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: 'GET' });
  }

  post(config) {
    return this.request({ ...config, method: 'POST' });
  }

  delete(config) {
    return this.request({ ...config, method: 'DELETE' });
  }

  patch(config) {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default Request;
