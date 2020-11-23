import React from 'react';
import './App.scss';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import NavigateMenu from './components/NavigateMenu/NavagateMenu';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Services from './components/Services';
import dataReducer from './data/reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  dataReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

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
