import React, { useState, useMemo } from 'react';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import * as XLSX from 'xlsx';



interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  nomeCliente: string;
  telefone: string;
  cpf: string;
  dataEntrada: string;
}



const generateRandomLetters = (): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateRandomColor = (): string => {
  const colors = ['Vermelho', 'Azul', 'Verde', 'Amarelo', 'Roxo', 'Laranja', 'Preto', 'Branco'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const generateRandomName = (): string => {
  const names = ['João', 'Maria', 'Pedro', 'Ana', 'Lucas', 'Carla', 'Mateus', 'Laura'];
  const surnames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Ferreira', 'Almeida', 'Rodrigues'];
  const randomFirstNameIndex = Math.floor(Math.random() * names.length);
  const randomLastNameIndex = Math.floor(Math.random() * surnames.length);
  return `${names[randomFirstNameIndex]} ${surnames[randomLastNameIndex]}`;
};

const generateRandomPhone = (): string => {
  const digits = Math.floor(Math.random() * 900000000) + 100000000;
  return `(${String(digits).substring(0, 2)}) 9${String(digits).substring(2, 6)}-${String(digits).substring(6, 10)}`;
};

const generateRandomCPF = (): string => {
  const digits = Math.floor(Math.random() * 90000000000) + 10000000000;
  return `${String(digits).substring(0, 3)}.${String(digits).substring(3, 6)}.${String(digits).substring(6, 9)}-${String(digits).substring(9, 11)}`;
};

const generateRandomDate = (): string => {
  const startDate = new Date(2010, 0, 1);
  const endDate = new Date();
  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return randomDate.toLocaleDateString('pt-BR');
};


// Função para fazer a chamada inicial para o Axios

const fetchData = async (page: number): Promise<Car[]> => {
  try {
    console.log('Página solicitada:', page);
    const response = await axios.get<Car[]>('https://car-data.p.rapidapi.com/cars', {
      params: { limit: '5', page: String(page) },
      headers: {
        'X-RapidAPI-Key': '9ad41b2692mshd9d460d9f8e1ec2p12ecf3jsn40707be168ad',
        'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
      }
    });
    console.log('Dados da resposta:', response.data);
    return response.data.map(item => ({
      ...item,
      color: generateRandomColor(),
      nomeCliente: generateRandomName(),
      telefone: generateRandomPhone(),
      cpf: generateRandomCPF(),
      dataEntrada: generateRandomDate()
    }));
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw new Error("Erro ao buscar dados");
  }
};



const VehicleDataList: React.FC = () => {


  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const exportToExcel = () => {
    const sheet = XLSX.utils.table_to_sheet(document.getElementById('table-to-xls'));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, 'Sheet1');
    XLSX.writeFile(wb, 'vehicle_data.xlsx');
  };

  const { data: queryData, isLoading, isFetching, refetch } = useQuery<Car[], Error>({
    queryKey: ['cars', page],
    queryFn: () => fetchData(page),
  });

  const filteredData = useMemo(() => queryData?.filter(item =>
    item.nomeCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.model.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [], [queryData, searchTerm]);


  const columns = [
    {
      accessorFn: (row: Car) => `${generateRandomLetters()} - ${row.id}`,
      id: 'id',
      header: 'Placa',
    },
    {
      accessorKey: 'make',
      id: 'make',
      header: 'Marca',
    },
    {
      accessorKey: 'model',
      id: 'model',
      header: 'Modelo',
    },
    {
      accessorKey: 'year',
      id: 'year',
      header: 'Ano',
    },
    {
      accessorKey: 'color',
      id: 'color',
      header: 'Cor',
    },
    {
      accessorKey: 'nomeCliente',
      id: 'nomeCliente',
      header: 'Nome do Cliente',
    },
    {
      accessorKey: 'telefone',
      id: 'telefone',
      header: 'Telefone',
    },
    {
      accessorKey: 'cpf',
      id: 'cpf',
      header: 'CPF',
    },
    {
      accessorKey: 'dataEntrada',
      id: 'dataEntrada',
      header: 'Data de Entrada',
    },
  ];

  const table = useReactTable({
    data: filteredData, 
    columns,
    getCoreRowModel: getCoreRowModel(),
  });




  const handlePreviousPage = () => {
    const newPage = Math.max(page - 1, 0);
    setPage(newPage);
    refetch({ page: newPage }); // 'page' é passado como uma propriedade
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    refetch({ page: newPage }); // 'page' também é passado aqui
  };

    const handleSearch = () => {
      refetch();
    };



    return (
      <div>
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Busca</h2>
          <div className="flex justify-center gap-4">
          <input
        type="text"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         placeholder="Buscar por nome do cliente ou modelo do carro..."
         className="form-input px-4 py-2 w-full border-2 border-blue-200 focus:border-blue-300 rounded-full shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:shadow-outline"
         style={{ backgroundColor: "#FFFFFF", color: "#4B5563" }} 
          />
          
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:shadow-outline"
            >
              Enviar
              </button>
            
          </div>
        </div>
        {isLoading || isFetching ? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
            <div className="text-white text-xl">Loading...</div>
          </div>
        ) : (
          <>
             <table id="table-to-xls" className="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-10 mb-10">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cell.renderValue()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
            {/* Condicionalmente renderizando a paginação */}
            {searchTerm === "" && (
              <div className="flex justify-center mt-4 mb-10 gap-5">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                  onClick={handlePreviousPage}
                  disabled={page === 0}
                >
                  Anterior
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                  onClick={handleNextPage}
                >
                  Próxima
                </button>

                <button
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    onClick={exportToExcel}
  >
    Exportar para Excel
  </button>

              </div>
            )}
          </>
        )}
      </div>
    );


   
 
};


export default VehicleDataList;