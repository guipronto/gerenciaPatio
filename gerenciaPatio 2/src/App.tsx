import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Details from './pages/details/details';
import DataListComponent from './pages/datalist/dataList';
import Saida from './pages/saida/saida';

import Layout from './components/layout/layout';  

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Details />} />
          <Route path="/datalist" element={<DataListComponent />} />
          <Route path="/saida" element={<Saida />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

