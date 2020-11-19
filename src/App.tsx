import React from 'react';
import './App.css';
import NavigateMenu from './components/NavigateMenu/NavagateMenu';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Services from './components/Services';

function App() {
  return (
    <NavigateMenu>
      <Header />
      <Services />
      <Footer />
    </NavigateMenu>
  //  There may be a route, but it is not required with one element.
  );
}

export default App;
