import React from 'react';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import NavigateMenu from './components/NavigateMenu/NavagateMenu';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Services from './components/Services';
import dataReducer from './data/reducers';

const store = createStore(
  dataReducer,
  // composeEnhancer(applyMiddleware(...middlewares)),
);

function App() {
  return (
    <Provider store={store}>
      <NavigateMenu>
        <Header />
        <Services />
        <Footer />
      </NavigateMenu>
      {/*  There may be a route, but it is not required with one element. */}
    </Provider>
  );
}

export default App;
