import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ContactForm from '../components/ContactForm';

const GET_PAGE = gql`
  query GetPage($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      content
      date
    }
  }
`;

const PageComponent: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const currentSlug = slug || location.pathname.slice(1);

  const { loading, error, data } = useQuery(GET_PAGE, {
    variables: { slug: currentSlug },
    skip: !currentSlug,
  });

  React.useEffect(() => {
    if (!currentSlug) {
      navigate('/');
    }
  }, [currentSlug, navigate]);

  if (!currentSlug) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.page) return <p>Page not found</p>;

  const page = data.page;

  return (
    <article className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-h1 font-merriweather font-bold mb-4">{page.title}</h1>
      <div className="text-gray-600 mb-4 font-raleway">
        <span>Last updated: {new Date(page.date).toLocaleDateString()}</span>
      </div>
      {currentSlug === 'contact' ? (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 prose max-w-none font-raleway" dangerouslySetInnerHTML={{ __html: page.content }} />
          <div className="md:w-1/2">
            <ContactForm />
          </div>
        </div>
      ) : (
        <div className="prose max-w-none font-raleway" dangerouslySetInnerHTML={{ __html: page.content }} />
      )}
    </article>
  );
};

export default PageComponent;