// src/components/Navigation.tsx
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="bg-blue-400 py-4">
      <nav className="flex justify-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-300">cadastro</Link>
          </li>
          <li>
            <Link to="/datalist" className="text-white hover:text-gray-300">Data List</Link>
          </li>
          <li>
            <Link to="/saida" className="text-white hover:text-gray-300">saida</Link>
          </li>
        </ul>
      </nav>
    </div>
    );
};

export default Navigation;
