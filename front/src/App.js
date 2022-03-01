import Formulaire from './Formulaire';
import Nav from './Nav';
import Home from './Home';
import Header from './Header';
import Carte from './Carte';

import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';


function App() {
  return (
    <div>
      <Header/>
      <Nav></Nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/formulaire" element={<Formulaire />} />
        <Route path='/carte' element={<Carte/>}/>
      </Routes>
    </div>
  );
}

export default App;
