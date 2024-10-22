import React, { useState, useEffect } from 'react';
import { Book } from 'lucide-react';
import PostList from './components/PostList';
import Post from './components/Post';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';

interface PostType {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

interface PageType {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
}

function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [pages, setPages] = useState<PageType[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [selectedPage, setSelectedPage] = useState<PageType | null>(null);

  useEffect(() => {
    fetchPosts();
    fetchPages();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://app.vriendenvanpalestina.nl/wp-json/wp/v2/posts?_embed');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchPages = async () => {
    try {
      const response = await fetch('https://app.vriendenvanpalestina.nl/wp-json/wp/v2/pages');
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const renderContent = () => {
    if (selectedPage) {
      if (selectedPage.slug === 'contact') {
        return <ContactPage />;
      }
      return <Post post={selectedPage} onBack={() => setSelectedPage(null)} />;
    }
    if (selectedPost) {
      return <Post post={selectedPost} onBack={() => setSelectedPost(null)} />;
    }
    return (
      <PostList 
        posts={posts} 
        pages={pages}
        onSelectPost={setSelectedPost} 
        onSelectPage={setSelectedPage}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <header className="bg-secondary text-primary p-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Book className="mr-2" />
            <h1 className="text-3xl font-merriweather font-bold">Vrienden van Palestina</h1>
          </div>
          <Navbar pages={pages} onSelectPage={setSelectedPage} />
        </div>
      </header>
      <main className="container mx-auto p-4 flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;