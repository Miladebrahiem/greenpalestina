import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PostProps {
  post: {
    title: { rendered: string };
    content: { rendered: string };
  };
  onBack: () => void;
}

const Post: React.FC<PostProps> = ({ post, onBack }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button onClick={onBack} className="mb-4 inline-flex items-center text-secondary hover:text-[#E4D946]">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </button>
      <h1 className="text-3xl font-merriweather font-bold mb-4 text-primary" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div className="prose max-w-none text-primary font-raleway" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
};

export default Post;