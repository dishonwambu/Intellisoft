import React from 'react';
import Registration from './Registration';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import VisitsPage from './VisitsPage';
import HealthForm1 from './HealthForm1';
import HealthForm2 from './HealthForm2';
//import PatientListingReport from './PatientListingReport';


function App() {


  return (
  
  // <BrowserRouter>
  // <Routes>
    
  //   <Route path='/' element= {<Registration />}></Route>
  //   <Route path='/VisitsPage' element= {<VisitsPage />}></Route>
  //   <Route path='/HealthForm1' element= {<HealthForm1 />}></Route>
  //   <Route path='/HealthForm2' element= {<HealthForm2 />}></Route>
    
  // </Routes>
  // </BrowserRouter>
  <VisitsPage></VisitsPage>
  
  );
}


export default App;
