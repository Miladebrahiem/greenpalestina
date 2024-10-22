import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Search, ShoppingCart } from 'lucide-react';

const GET_POSTS_AND_PAGES = gql`
  query GetPostsAndPages {
    posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    pages {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

const HomePage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS_AND_PAGES);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-500">Error: {error.message}</p>;

  return (
    <div>
      {/* New Hero Section */}
      <section className="bg-[#003344] text-white py-12 px-4 rounded-3xl mx-4 my-8 relative overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10">
            <h1 className="text-4xl font-bold mb-4">BACK-REST CHAIR</h1>
            <p className="mb-6">
              VEDBO verber style classic, suitable for different room layout,
              can be matched with all kinds of furniture. 10 years warranty,
              please refer to the warranty manual for details.
            </p>
            <div className="flex items-center mb-8">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="User" className="w-12 h-12 rounded-full mr-4" />
              <button className="bg-[#FFD700] text-[#003344] py-2 px-6 rounded-full font-semibold hover:bg-opacity-90 transition duration-300">
                buy now
              </button>
            </div>
            <p className="text-sm">furniture</p>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Back-Rest Chair" 
              className="w-full h-auto object-cover rounded-lg"
            />
            <div className="absolute bottom-4 right-4 bg-white text-[#003344] py-2 px-4 rounded-lg">
              <span className="text-2xl font-bold">$80.00</span>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-4">
          <Search className="text-white" size={24} />
          <ShoppingCart className="text-white" size={24} />
        </div>
        <div className="absolute bottom-4 left-4 flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-merriweather font-semibold mb-8 text-center">Latest from Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.posts.nodes.map((post: any) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
                {post.featuredImage && (
                  <img
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-merriweather font-semibold mb-2">
                    <Link to={`/post/${post.slug}`} className="hover:text-primary transition-colors duration-300">
                      {post.title}
                    </Link>
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2 font-raleway text-sm">
                    <Calendar size={14} className="mr-1" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="mx-2">|</span>
                    <User size={14} className="mr-1" />
                    <span>{post.author.node.name}</span>
                  </div>
                  <div className="text-gray-600 mb-4 font-raleway line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  <Link
                    to={`/post/${post.slug}`}
                    className="text-primary hover:text-secondary transition-colors duration-300 font-raleway inline-flex items-center"
                  >
                    Read more <ArrowRight className="ml-1" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="bg-primary text-secondary py-2 px-6 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 font-raleway inline-flex items-center">
              View All Posts <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;