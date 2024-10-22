import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, User, ExternalLink } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
}

const VideoSection: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=YOUR_YOUTUBE_API_KEY&channelId=UCnVLxXXXXXXXXXXXXXXXXXXX&part=snippet,id&order=date&maxResults=3&type=video`
        );
        const fetchedVideos = response.data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnailUrl: item.snippet.thumbnails.medium.url,
        }));
        setVideos(fetchedVideos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos. Please try again later.');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <h2 className="text-h2 font-merriweather font-semibold mb-6">Latest Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div key={video.id} className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              <div className="relative">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                />
                <div className="absolute top-0 right-0 bg-secondary text-primary px-2 py-1 m-2 rounded-full text-sm font-semibold">
                  New
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-merriweather font-semibold mb-2 hover:text-primary transition-colors duration-300">{video.title}</h3>
                <div className="flex items-center text-gray-600 mb-2 font-raleway text-sm">
                  <Calendar size={14} className="mr-1" />
                  <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                  <span className="mx-2">|</span>
                  <User size={14} className="mr-1" />
                  <span>Webticians</span>
                </div>
                <p className="text-gray-600 mb-4 font-raleway line-clamp-3">{video.description}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition-colors duration-300 font-raleway inline-flex items-center"
                >
                  Watch video <ExternalLink className="ml-1" size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;