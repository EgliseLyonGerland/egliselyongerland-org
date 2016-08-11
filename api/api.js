import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';

import config from '../src/config';
import * as actions from './actions/index';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

function executeAction(req, res, action) {
  if (action) {
    action(req)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
}

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  executeAction(req, res, actions.posts.posts);
});

app.get('/posts/:postID', (req, res) => {
  executeAction(req, res, actions.posts.post);
});

app.get('/taxonomies/category/terms', (req, res) => {
  executeAction(req, res, actions.categories.categories);
});

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  io.on('connection', (socket) => {
    socket.emit('news', { msg: '\'Hello World!\' from server' });

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      const newData = { ...data, id: messageIndex };
      messageBuffer[messageIndex % bufferSize] = newData;
      messageIndex++;
      io.emit('msg', newData);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
