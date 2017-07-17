import React from 'react';
import ReactDOM from 'react-dom';
import Render from './components/render';
import App from './containers/app';
import store from './store';
import { Provider } from 'react-redux';

module.exports = (req, options) => {
  global.hostCss = options.hostCss || '';
  global.containerCss = options.containerCss || '';
  const modules = req.keys().map(key => {
    const module = req(key);
    module.default.path = key;
    return module.default;
  });

  store.dispatch({
    type: 'DOCS_ADD',
    payload: modules,
  });

  document.body.style.height = '100%';
  document.body.style.margin = '0';

  const root = document.createElement('div');
  document.body.appendChild(root);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root,
  );
}
