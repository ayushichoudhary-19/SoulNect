import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconArrowUp, IconMessage, IconEdit, IconTrash } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';

export default function PostPage() {
  const location = useLocation();
  const postId = location.pathname.split('/').pop();
  const userId = localStorage.getItem('userId');
//   const userName = localStorage.getItem('name');

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyMap, setReplyMap] = useState({});
  const [editMap, setEditMap] = useState({});
  const [newComment, setNewComment] = useState('');
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);

  useEffect(() => {
    if (!postId) return;

    const fetchData = async () => {
      const [postRes, commentsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${postId}`),
      ]);
      setPost(postRes.data);
      setUpvoteCount(postRes.data.upvotes || 0);
      setUpvoted(postRes.data.upvotedBy?.includes(userId));
      setComments(commentsRes.data);
    };

    fetchData();
  }, [postId, userId]);

  const handleUpvote = async () => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/upvote`, { userId });
    setUpvoted(res.data.upvoted);
    setUpvoteCount(res.data.upvoteCount);
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comments`, {
      postId,
      content: newComment,
      userId,
      name: 'Anonymous',
    });
    setComments([...comments, res.data]);
    setNewComment('');
  };

  const handleReply = async (parentId) => {
    const content = replyMap[parentId];
    if (!content.trim()) return;
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comments`, {
      postId,
      parentId,
      content,
      userId,
      name: 'Anonymous',
    });
    setComments([...comments, res.data]);
    setReplyMap({ ...replyMap, [parentId]: '' });
  };

  const handleEdit = async (commentId) => {
    const content = editMap[commentId];
    if (!content.trim()) return;
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${commentId}`, { content });
    setComments(comments.map(c => c._id === commentId ? { ...c, content } : c));
    setEditMap({ ...editMap, [commentId]: undefined });
  };

  const handleDelete = async (commentId) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${commentId}`);
    setComments(comments.filter(c => c._id !== commentId && c.parentId !== commentId));
  };

  const getInitials = (name) =>
    name?.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();

  const renderComments = (parentId = null, level = 0) => {
    return comments
      .filter(c => c.parentId === parentId)
      .map((comment) => (
        <div key={comment._id} className={`mb-4 ${level > 0 ? 'ml-6 border-l pl-4' : ''}`}>
          <div className="bg-white border p-4 rounded shadow-sm">
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="bg-gray-200 text-gray-700 rounded-full w-7 h-7 flex items-center justify-center text-xs">
                  {getInitials(comment.createdBy.name || 'U')}
                </div>
                <span>{comment.createdBy.name}</span>
              </div>
              <div className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</div>
            </div>

            {editMap[comment._id] !== undefined ? (
              <div>
                <textarea
                  value={editMap[comment._id]}
                  onChange={(e) => setEditMap({ ...editMap, [comment._id]: e.target.value })}
                  className="w-full border p-2 rounded text-sm mb-2"
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => handleEdit(comment._id)} className="text-blue-600 text-xs">Save</button>
                  <button onClick={() => setEditMap({ ...editMap, [comment._id]: undefined })} className="text-gray-600 text-xs">Cancel</button>
                </div>
              </div>
            ) : (
              <p className="text-gray-800 text-sm">{comment.content}</p>
            )}

            <div className="flex gap-4 text-xs mt-3">
              <button onClick={() => setReplyMap({ ...replyMap, [comment._id]: '' })} className="text-blue-600 flex items-center gap-1">
                <IconMessage size={14} />
                Reply
              </button>
              {comment.createdBy.userId === userId && (
                <>
                  <button onClick={() => setEditMap({ ...editMap, [comment._id]: comment.content })} className="text-gray-600 flex items-center gap-1">
                    <IconEdit size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(comment._id)} className="text-red-600 flex items-center gap-1">
                    <IconTrash size={14} /> Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {replyMap[comment._id] !== undefined && (
            <div className="mt-3 ml-6">
              <textarea
                value={replyMap[comment._id]}
                onChange={(e) => setReplyMap({ ...replyMap, [comment._id]: e.target.value })}
                placeholder="Write a reply..."
                className="w-full border p-2 rounded text-sm"
                rows={2}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => handleReply(comment._id)} className="bg-blue-600 text-white text-xs px-3 py-1 rounded">Reply</button>
                <button onClick={() => setReplyMap({ ...replyMap, [comment._id]: undefined })} className="text-xs text-gray-600">Cancel</button>
              </div>
            </div>
          )}

          {renderComments(comment._id, level + 1)}
        </div>
      ));
  };

  if (!post) {
    return <div className="text-center py-20 text-gray-500">Loading post...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Post */}
      <div className="bg-white border rounded shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <button onClick={handleUpvote} className={`text-sm ${upvoted ? 'text-blue-600' : 'text-gray-500'} flex items-center`}>
            <IconArrowUp size={18} className="mr-1" />
            {upvoteCount}
          </button>
        </div>
        <div className="text-sm text-gray-500 mb-3">
          Posted by {post.createdBy.name} • {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="text-gray-800 whitespace-pre-line">{post.content}</div>
        {post.tags?.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Comments */}
      <h2 className="text-lg font-semibold mb-2">Comments</h2>

      {comments.length === 0 && (
        <p className="text-gray-400 text-sm mb-6">No comments yet. Be the first to share your thoughts!</p>
      )}

      <div className="mb-8">
        {renderComments()}
      </div>

      <div className="bg-white border rounded shadow-sm p-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border rounded p-2 text-sm mb-3"
          placeholder="Write your comment..."
          rows={3}
        />
        <div className="flex justify-end">
          <button
            onClick={handlePostComment}
            className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}
