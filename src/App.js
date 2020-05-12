import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import Images from './components/Images';

function App() {

  document.cookie = 'SameSite=None Secure';

  useEffect(() => {
    M.AutoInit();
  });

  return (
    <div className="App">
    <div className="center">
      <Images />
    </div>
    </div>
  );
}

export default App;
