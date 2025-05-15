import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
        title,
        content,
        tags: tags.split(',').filter(tag => tag.trim()).map(tag => tag.trim()),
        userId,
        name,
      });

      toast.success("Post created successfully!");
      navigate('/community');
    } catch (err) {
      console.error('Failed to create post', err);
      toast.error("Failed to create your post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Create a New Post</h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Write a descriptive title"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            id="content"
            placeholder="Share your thoughts, ideas, or questions..."
            rows={8}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
          <input
            id="tags"
            type="text"
            placeholder="e.g. question, feedback, idea"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-500">Add relevant tags to help others find your post</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
          <button
            onClick={() => navigate('/community')}
            disabled={isSubmitting}
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
