import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useQuery, gql } from '@apollo/client';

const GET_MENU_ITEMS = gql`
  query GetMenuItems {
    menuItems(where: {location: PRIMARY}) {
      nodes {
        id
        label
        url
        path
      }
    }
  }
`;

const Header: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MENU_ITEMS);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Doe mee', path: '/doe-mee' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-green text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-merriweather font-bold">
          <Home size={24} />
          <span>Vrienden van Palestina</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link to={item.path} className="hover:text-green-dark transition duration-300 font-raleway">
                  {item.label}
                </Link>
              </li>
            ))}
            {!loading && !error && data.menuItems.nodes
              .filter((item: any) => !navItems.some(navItem => navItem.label.toLowerCase() === item.label.toLowerCase()))
              .map((item: any) => (
                <li key={item.id}>
                  <Link 
                    to={item.path || item.url.replace('https://app.vriendenvanpalestina.nl', '')} 
                    className="hover:text-green-dark transition duration-300 font-raleway"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;