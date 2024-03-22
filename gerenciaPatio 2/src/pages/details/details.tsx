import React from 'react';
import Cadastro from './cadastro';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details: React.FC = () => {
  return (
    <div>
      <ToastContainer /> 
      <Cadastro />
    </div>
  );
};

export default Details;
