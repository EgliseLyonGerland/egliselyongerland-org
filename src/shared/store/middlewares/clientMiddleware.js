import { normalize } from 'normalizr';

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, schema, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    const actionPromise = promise(client);
    actionPromise.then(
      result => {
        let data = result;

        if (typeof schema !== 'undefined') {
          data = normalize(result, schema);
        }

        return next({ ...rest, data, type: SUCCESS });
      },
      error => next({ ...rest, error, type: FAILURE }),
    );

    return actionPromise;
  };
}
