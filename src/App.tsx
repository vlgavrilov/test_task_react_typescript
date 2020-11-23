import React from 'react';
import './App.scss';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import NavigateMenu from './components/NavigateMenu';
import Header from './components/Header';
import Footer from './components/Footer';
import Services from './components/Services';
import dataReducer from './redux/reducers';
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
      <NavigateMenu />
      <div className="children">
        <Header />
        <Services />
        <Footer />
      </div>
      {/*  There may be a route, but it is not required with one element. */}
    </Provider>
  );
}

export default App;
