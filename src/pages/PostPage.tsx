import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Calendar, User, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';

const GET_POST = gql`
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      date
      author {
        node {
          name
          avatar {
            url
          }
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
`;

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { slug },
    skip: !slug,
  });

  if (!slug) {
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-500">Error: {error.message}</p>;
  if (!data || !data.post) return <p className="text-center py-8">Post not found</p>;

  const post = data.post;

  const shareUrl = window.location.href;
  const shareText = `Check out this post: ${post.title}`;

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {post.featuredImage && (
        <img
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || post.title}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-8">
        <Link to="/blog" className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-300 mb-4">
          <ArrowLeft size={20} className="mr-2" />
          Back to Blog
        </Link>
        <h1 className="text-3xl font-merriweather font-bold mb-4">{post.title}</h1>
        <div className="flex items-center mb-6">
          {post.author.node.avatar && (
            <img
              src={post.author.node.avatar.url}
              alt={post.author.node.name}
              className="w-10 h-10 rounded-full mr-3"
            />
          )}
          <div>
            <p className="font-raleway text-gray-700">
              <User size={14} className="inline mr-1" />
              {post.author.node.name}
            </p>
            <p className="font-raleway text-gray-600 text-sm">
              <Calendar size={14} className="inline mr-1" />
              {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="prose max-w-none mb-8 font-raleway" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories.nodes.map((category: any) => (
            <span key={category.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-raleway">
              {category.name}
            </span>
          ))}
        </div>
        <div className="border-t pt-6">
          <h3 className="text-lg font-merriweather font-semibold mb-3">Share this post</h3>
          <div className="flex space-x-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <Facebook size={24} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              <Twitter size={24} />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostPage;