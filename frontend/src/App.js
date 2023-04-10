import React from 'react';
import Registration from './Registration';
import {BrowserRouter, Routes, Switch, Route} from 'react-router-dom'
import VisitsPage from './VisitsPage';

function App() {


  return (
  
  <BrowserRouter>
  <Routes>
    <switch>
    <Route path='/' component= {<Registration />}></Route>
    <Route path='/VisitsPage' component= {<VisitsPage />}></Route>
    </switch>
  </Routes>
  </BrowserRouter>
  );
}


export default App;
