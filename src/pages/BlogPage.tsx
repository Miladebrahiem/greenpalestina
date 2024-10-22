import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: 9 },
  });

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        after: data.posts.pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.posts.nodes = [
          ...prevResult.posts.nodes,
          ...fetchMoreResult.posts.nodes,
        ];
        return fetchMoreResult;
      },
    });
  };

  const filteredPosts = data?.posts.nodes.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-h1 font-merriweather font-bold mb-8 text-center">Our Blog</h1>
      
      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary font-raleway"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post: any) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
            {post.featuredImage && (
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-merriweather font-semibold mb-2">
                <Link to={`/post/${post.slug}`} className="hover:text-primary transition-colors duration-300">
                  {post.title}
                </Link>
              </h2>
              <div className="flex items-center text-gray-600 mb-2 font-raleway text-sm">
                <Calendar size={14} className="mr-1" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="mx-2">|</span>
                <User size={14} className="mr-1" />
                <span>{post.author.node.name}</span>
              </div>
              <div className="text-gray-600 mb-4 font-raleway line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              <div className="flex justify-between items-center">
                <Link
                  to={`/post/${post.slug}`}
                  className="text-primary hover:text-secondary transition-colors duration-300 font-raleway inline-flex items-center"
                >
                  Read more <ArrowRight className="ml-1" size={16} />
                </Link>
                <div className="flex flex-wrap gap-2">
                  {post.categories.nodes.map((category: any) => (
                    <span key={category.id} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-raleway">
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {data.posts.pageInfo.hasNextPage && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="bg-primary text-secondary py-2 px-6 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 font-raleway inline-flex items-center"
          >
            Load More <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;