import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

interface Page {
  id: number;
  title: { rendered: string };
  slug: string;
}

interface PostListProps {
  posts: Post[];
  pages: Page[];
  onSelectPost: (post: Post) => void;
  onSelectPage: (page: Page) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, pages, onSelectPost, onSelectPage }) => {
  const contactPage = pages.find(page => page.slug === 'contact');

  return (
    <div>
      <section className="mb-12 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
          style={{backgroundImage: `url('https://images.unsplash.com/photo-1601579112759-761ccbaa8dde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')`}}
        >
          <div className="text-center text-white z-10 px-4">
            <h1 className="text-5xl font-merriweather font-bold mb-4">Stand with Palestine</h1>
            <p className="text-xl font-raleway mb-8 max-w-2xl mx-auto">Join Vrienden van Palestina in our mission to support Palestinian rights, promote peace, and raise awareness about the ongoing humanitarian crisis.</p>
            <button 
              onClick={() => contactPage && onSelectPage(contactPage)}
              className="btn text-lg font-semibold"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-merriweather font-bold mb-6 text-secondary">Explore Our Pages</h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {pages.slice(0, 5).map((page) => (
            <button
              key={page.id}
              onClick={() => onSelectPage(page)}
              className="bg-secondary text-primary p-4 rounded-lg shadow-md hover:bg-[#E4D946] transition-colors"
            >
              <h3 className="font-merriweather font-semibold text-lg mb-2" dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
              <ArrowRight className="ml-auto h-5 w-5" />
            </button>
          ))}
        </div>
      </section>
      
      <h2 className="text-3xl font-merriweather font-bold mb-6 text-secondary">Latest Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {post._embedded && post._embedded['wp:featuredmedia'] && (
              <img 
                src={post._embedded['wp:featuredmedia'][0].source_url} 
                alt={post.title.rendered}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-merriweather font-semibold mb-2 text-primary" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div className="text-gray-600 mb-4 font-raleway" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <button
                onClick={() => onSelectPost(post)}
                className="btn inline-flex items-center"
              >
                Read more <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;