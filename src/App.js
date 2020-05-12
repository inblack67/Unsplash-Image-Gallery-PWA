import React from 'react';
import './App.css';
import Images from './components/Images';

function App() {

  document.cookie = 'SameSite=None Secure';

  return (
    <div className="App">
      <Images />
    </div>
  );
}

export default App;
