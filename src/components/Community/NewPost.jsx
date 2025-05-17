import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { IconArrowLeft, IconSend } from '../icons/TablerIcons.js';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editId = queryParams.get('editId');

  useEffect(() => {
    if (editId) {
      setIsEditing(true);
      fetchPost(editId);
    }
  }, [editId]);

  const fetchPost = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`);
      const post = response.data;
      setTitle(post.title);
      setContent(post.content);
      setTags(post.tags ? post.tags.join(', ') : '');
    } catch (error) {
      toast.error('Failed to load post for editing');
      navigate('/community');
    }
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('name');

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter content for your post");
      return;
    }

    if (!userId) {
      toast.error("You must be logged in to create a post");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${editId}`, {
          title,
          content,
          tags: tags.split(',').filter(tag => tag.trim()).map(tag => tag.trim()),
        });
        toast.success("Post updated successfully!");
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
          title,
          content,
          tags: tags.split(',').filter(tag => tag.trim()).map(tag => tag.trim()),
          userId,
          name,
        });
        toast.success("Post created successfully!");
      }
      navigate('/community');
    } catch (err) {
      toast.error("Failed to create your post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 py-8 md:py-12"
    >
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/community')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <IconArrowLeft size={18} className="mr-1" />
            <span className="text-sm">Back to Community</span>
          </motion.button>
          <h2 className="text-2xl font-bold text-white">{isEditing ? 'Edit Post' : 'Create a New Post'}</h2>
        </div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Write a descriptive title"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-200"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            id="content"
            placeholder="Share your thoughts, ideas, or questions..."
            rows={8}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-200"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
          <input
            id="tags"
            type="text"
            placeholder="e.g. question, feedback, idea"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-200"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-500">Add relevant tags to help others find your post</p>
        </motion.div>

        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-end gap-3 pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/community')}
            disabled={isSubmitting}
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </span>
            ) : (
              <span className="flex items-center">
                <IconSend size={16} className="mr-1" />
                {isEditing ? 'Update Post' : 'Publish Post'}
              </span>
            )}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
