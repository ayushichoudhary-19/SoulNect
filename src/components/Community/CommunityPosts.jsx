
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';
import { IconPlus } from '@tabler/icons-react';

export default function CommunityPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`)
      .then(res => {
        setPosts(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch posts:", err);
        setIsLoading(false);
      });
  }, []);

  const openPost = (postId) => {
    navigate(`/community/${postId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Community</h2>
          <p className="text-gray-500 mt-1">Join the conversation with fellow users</p>
        </div>
        <button
          onClick={() => navigate('/community/new')}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <IconPlus className="mr-1 h-4 w-4" /> New Post
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 md:py-20 bg-gray-50 rounded-xl border border-gray-100">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">No posts yet</h3>
            <p className="text-gray-500 mb-6">Be the first to share your thoughts with the community.</p>
            <button
              onClick={() => navigate('/community/new')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <IconPlus className="mr-1 h-4 w-4" /> Create Post
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              upvotecount={post.upvotes || 0}
              author={post.createdBy}
              onClick={() => openPost(post._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
