import React, { useRef } from 'react';
import { IMaskInput } from 'react-imask';
import { DateTime } from 'luxon';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cadastro: React.FC = () => {
  const telefoneRef = useRef(null);
  const cpfRef = useRef(null);

  const getCurrentFormattedDate = () => {
    return DateTime.now().toFormat('yyyy-MM-dd');
  };

  
  const handleCadastroSubmit = (event: React.FormEvent) => {
    event.preventDefault();


    toast.success('Cadastro realizado com sucesso!', {
      position: "top-center",
      autoClose: 3000, // Fecha automaticamente após 3 segundos
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  };

   
  


 

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-8 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Veículos</h1>
      <form onSubmit={handleCadastroSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="placa" className="block text-gray-700 font-semibold">Placa:</label>
            <input type="text" id="placa" name="placa" className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="marca" className="block text-gray-700 font-semibold">Marca:</label>
            <input type="text" id="marca" name="marca" className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="modelo" className="block text-gray-700 font-semibold">Modelo:</label>
            <input type="text" id="modelo" name="modelo" className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="cor" className="block text-gray-700 font-semibold">Cor:</label>
            <input type="text" id="cor" name="cor" className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="telefone" className="block text-gray-700 font-semibold">Telefone Cliente:</label>
            <IMaskInput
              mask="(00) 00000-0000"
              type="text"
              id="telefone"
              name="telefone"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
              inputRef={telefoneRef}
              placeholder="(__) _____-____"
            />
          </div>
          <div>
            <label htmlFor="cpf" className="block text-gray-700 font-semibold">CPF:</label>
            <IMaskInput
              mask="000.000.000-00"
              type="text"
              id="cpf"
              name="cpf"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
              inputRef={cpfRef}
              placeholder="___.___.___-__"
            />
          </div>
          <div>
            <label htmlFor="nomeCliente" className="block text-gray-700 font-semibold">Nome do Cliente:</label>
          <input type="text" id="nomeCliente" name="nomeCliente" className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div>
           <label htmlFor="dataEntrada" className="block text-gray-700 font-semibold">Data de Entrada:</label>
            {/* Definindo o valor do campo de entrada da data usando Luxon */}
            <input type="date" id="dataEntrada" name="dataEntrada" value={getCurrentFormattedDate()} className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Cadastrar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Cadastro;
