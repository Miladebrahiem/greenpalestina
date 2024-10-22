import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Heart, Facebook, Twitter, Instagram } from 'lucide-react';

const GET_PAGES = gql`
  query GetPages {
    pages {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

const Footer: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PAGES);

  return (
    <footer className="bg-primary text-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-h2 font-merriweather font-semibold mb-4">Vrienden van Palestina</h3>
            <p className="font-raleway mb-4">Samen staan we sterk voor vrede en gerechtigheid in Palestina.</p>
            <Link to="/doe-mee" className="inline-flex items-center bg-secondary text-primary py-2 px-4 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 font-raleway">
              Doe Mee <Heart className="ml-2" size={16} />
            </Link>
          </div>
          <div>
            <h3 className="text-h2 font-merriweather font-semibold mb-4">Pagina's</h3>
            {loading && <p>Loading...</p>}
            {error && <p>Error loading pages</p>}
            {data && (
              <ul className="space-y-2 font-raleway">
                {data.pages.nodes.map((page: any) => (
                  <li key={page.id}>
                    <Link to={`/page/${page.slug}`} className="hover:underline">
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-h2 font-merriweather font-semibold mb-4">Contact & Social</h3>
            <p className="font-raleway mb-4">Volg ons op social media voor updates en nieuws.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition duration-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center font-raleway">
          <p>&copy; {new Date().getFullYear()} Vrienden van Palestina. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;