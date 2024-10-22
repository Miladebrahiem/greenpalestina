import React from 'react';

interface Page {
  id: number;
  title: { rendered: string };
  slug: string;
}

interface NavbarProps {
  pages: Page[];
  onSelectPage: (page: Page | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ pages, onSelectPage }) => {
  // Separate contact page from other pages
  const contactPage = pages.find(page => page.slug === 'contact');
  const otherPages = pages.filter(page => page.slug !== 'contact');

  return (
    <nav className="w-full md:w-auto">
      <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
        <li>
          <button
            onClick={() => onSelectPage(null)}
            className="text-primary hover:text-gray-700 transition-colors font-merriweather text-xl font-semibold"
          >
            Home
          </button>
        </li>
        {otherPages.map((page) => (
          <li key={page.id}>
            <button
              onClick={() => onSelectPage(page)}
              className="text-primary hover:text-gray-700 transition-colors font-merriweather text-xl font-semibold"
            >
              <span dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
            </button>
          </li>
        ))}
        {contactPage && (
          <li>
            <button
              onClick={() => onSelectPage(contactPage)}
              className="text-primary hover:text-gray-700 transition-colors font-merriweather text-xl font-semibold"
            >
              <span dangerouslySetInnerHTML={{ __html: contactPage.title.rendered }} />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;