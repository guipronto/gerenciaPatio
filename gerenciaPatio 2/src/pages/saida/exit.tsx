import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Exit: React.FC = () => {
  const [vehicle, setVehicle] = useState<any>({});
  const [saida, setSaida] = useState<string>('');
  const [modelo, setModelo] = useState<string>('');
  const [placa, setPlaca] = useState<string>('');
  const [data, setData] = useState<any[]>([]); // Estado para armazenar os dados do JSON

  const fetchVehicleData = async () => {
    try {
      const response = await fetch('/src/pages/saida/carros_saida.json');
      const jsonData = await response.json();
      if (jsonData && jsonData.length > 0) {
        setData(jsonData); 
        const randomIndex = Math.floor(Math.random() * jsonData.length);
        setVehicle(jsonData[randomIndex]);
      }
    } catch (error) {
      console.error('Erro ao ler arquivo JSON:', error);
      toast.error('Erro ao carregar os dados do veículo');
    }
  };

  useEffect(() => {
    fetchVehicleData();
  }, []);

  

  const handleRegistrarSaida = () => {
    
    const foundVehicle = data.find((v: any) => v.model === modelo && v.plate === placa);
    if (foundVehicle) {
      setVehicle(foundVehicle);
      
    } else {
      
      toast.error('Veículo não encontrado. Verifique o modelo e a placa inseridos.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Registrar Saída</h1>
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold">{vehicle.make} {vehicle.model}</h2>
        <p className="text-gray-500">{vehicle.plate}</p>
        <div className="mt-4">
          <label className="block mb-2">Saída:</label>
          <input 
            type="date" 
            value={saida}
            onChange={(e) => setSaida(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full sm:w-64"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Modelo do Carro:</label>
          <input 
            type="text" 
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full sm:w-64"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Placa:</label>
          <input 
            type="text" 
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full sm:w-64"
          />
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRegistrarSaida}
        >
          Registrar Saída
        </button>
      </div>

      <div>
      <h3 className="font-semibold">Informações do Veículo</h3>
        <pre className='bg-gray-100 border border-gray-300 rounded p-4 overflow-auto text-sm text-gray-800'>{JSON.stringify(vehicle, null, 2)}</pre>
      </div>

    </div>
  );
};

export default Exit;
