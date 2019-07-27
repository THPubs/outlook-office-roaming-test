import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

import 'office-ui-fabric-react/dist/css/fabric.min.css';


initializeIcons();

loadTheme({
  palette: {
    themePrimary: '#111111',
  },
});

let isOfficeInitialized = false;

const title = 'Test App';

const render = Component => {
  // @ts-ignore
  ReactDOM.render(
    <AppContainer>
      <Component title={title} isOfficeInitialized={isOfficeInitialized}/>
    </AppContainer>,
    document.getElementById('container'),
  );
};

declare global {
  interface Window {
    Raven: any;
  }
}

/* Render application after Office initializes */
Office.initialize = () => {
  isOfficeInitialized = true;
  render(App);
};

/* Initial render showing a progress bar */
render(<div>Loading...</div>);

if ((module as any).hot) {
  (module as any).hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
