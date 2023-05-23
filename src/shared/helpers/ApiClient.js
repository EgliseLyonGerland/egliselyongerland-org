import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  if (path.startsWith('http')) {
    return path;
  }

  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  return `${config.apiEndpoint}${adjustedPath}`;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data } = {}) =>
        new Promise((resolve, reject) => {
          const request = superagent[method](formatUrl(path));

          if (params) {
            request.query(params);
          }

          if (__SERVER__ && req.get('cookie')) {
            request.set('cookie', req.get('cookie'));
          }

          if (data) {
            request.send(data);
          }

          request.end((err, res) => (err ? reject(res) : resolve(res)));
        });

      return this[method];
    });
  }
}
