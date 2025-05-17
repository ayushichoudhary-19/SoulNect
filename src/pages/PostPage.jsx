import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconArrowUp, IconMessage, IconEdit, IconTrash, IconDotsVertical, IconArrowLeft } from "../components/icons/TablerIcons";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { getAvatarUrl } from "../utils/avatarMap";

export default function PostPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split('/').pop();
  const userId = localStorage.getItem('userId');

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyMap, setReplyMap] = useState({});
  const [editMap, setEditMap] = useState({});
  const [newComment, setNewComment] = useState('');
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [editingPost, setEditingPost] = useState(false);
  const [editedPostContent, setEditedPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [postRes, commentsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${postId}`),
        ]);
        setPost(postRes.data);
        setUpvoteCount(postRes.data.upvotes || 0);
        setUpvoted(postRes.data.upvotedBy?.includes(userId));
        setComments(commentsRes.data);
      } catch (error) {
        toast.error("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postId, userId]);

  const handleUpvote = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/upvote`, { userId });
      setUpvoted(res.data.upvoted);
      setUpvoteCount(res.data.upvoteCount);
    } catch (error) {
      toast.error("Failed to upvote");
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comments`, {
        postId,
        content: newComment,
        userId,
      });
      setComments([...comments, res.data]);
      setNewComment('');
      toast.success("Comment posted");
    } catch (error) {
      toast.error("Failed to post comment");
    }
  };

  const handleReply = async (parentId) => {
    const content = replyMap[parentId];
    if (!content?.trim()) return;
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comments`, {
        postId,
        parentId,
        content,
        userId,
      });
      setComments([...comments, res.data]);
      setReplyMap({ ...replyMap, [parentId]: '' });
      toast.success("Reply posted");
    } catch (error) {
      toast.error("Failed to post reply");
    }
  };

  const handleEdit = async (commentId) => {
    const content = editMap[commentId];
    if (!content?.trim()) return;
    
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${commentId}`, { content });
      setComments(comments.map(c => c._id === commentId ? { ...c, content } : c));
      setEditMap({ ...editMap, [commentId]: undefined });
      toast.success("Comment updated");
    } catch (error) {
      toast.error("Failed to update comment");
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId && c.parentId !== commentId));
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  const handleEditPost = () => {
    setEditingPost(true);
    setEditedPostContent(post.content);
    setShowPostMenu(false);
  };

  const handleSavePostEdit = async () => {
    if (!editedPostContent.trim()) return;
    
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}`, { 
        content: editedPostContent,
        userId
      });
      
      setPost({...post, content: editedPostContent});
      setEditingPost(false);
      toast.success('Post updated successfully');
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  const handleCancelPostEdit = () => {
    setEditingPost(false);
    setEditedPostContent('');
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}`, {
          data: { userId }
        });
        toast.success('Post deleted successfully');
        navigate('/community');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  const getInitials = (name) =>
    name?.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase() || 'AN';

  const renderComments = (parentId = null, level = 0) => {
    return comments
      .filter(c => c.parentId === parentId)
      .map((comment) => (
        <motion.div 
          key={comment._id} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mb-4 ${level > 0 ? 'ml-6 border-l-2 border-purple-100 pl-4' : ''}`}
        >
          <div className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                {comment.createdBy?.avatar ? (
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                    <img
                      src={getAvatarUrl(comment.createdBy.avatar)}
                      alt={comment.createdBy?.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-purple-100 text-purple-700 rounded-full w-7 h-7 flex items-center justify-center text-xs font-medium">
                    {getInitials(comment.createdBy?.name)}
                  </div>
                )}
                <span className="font-medium">{comment.createdBy?.name || 'Anonymous'}</span>
              </div>
              <div className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</div>
            </div>

            {editMap[comment._id] !== undefined ? (
              <div>
                <textarea
                  value={editMap[comment._id]}
                  onChange={(e) => setEditMap({ ...editMap, [comment._id]: e.target.value })}
                  className="w-full border border-gray-200 p-2 rounded-lg text-sm mb-2 focus:ring-1 focus:ring-purple-600 focus:border-purple-600 focus:outline-none transition-all duration-200"
                  rows={3}
                />
                <div className="flex justify-end gap-2 mb-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(comment._id)} 
                    className="text-purple-700 text-xs font-medium"
                  >
                    Save
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditMap({ ...editMap, [comment._id]: undefined })} 
                    className="text-gray-600 text-xs"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            ) : (
              <p className="text-gray-800 text-sm">{comment.content}</p>
            )}

            <div className="flex gap-4 text-xs mt-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setReplyMap({ ...replyMap, [comment._id]: '' })} 
                className="text-gray-600 flex items-center gap-1 hover:text-purple-700 transition-colors"
              >
                <IconMessage size={14} />
                Reply
              </motion.button>
              {comment.createdBy?.userId === userId && (
                <>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditMap({ ...editMap, [comment._id]: comment.content })} 
                    className="text-gray-600 flex items-center gap-1 hover:text-gray-800 transition-colors"
                  >
                    <IconEdit size={14} /> Edit
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(comment._id)} 
                    className="text-red-600 flex items-center gap-1 hover:text-red-700 transition-colors"
                  >
                    <IconTrash size={14} /> Delete
                  </motion.button>
                </>
              )}
            </div>
          </div>

          <AnimatePresence>
            {replyMap[comment._id] !== undefined && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 ml-6"
              >
                <textarea
                  value={replyMap[comment._id]}
                  onChange={(e) => setReplyMap({ ...replyMap, [comment._id]: e.target.value })}
                  placeholder="Write a reply..."
                  className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:ring-1 focus:ring-purple-600 focus:border-purple-600 focus:outline-none transition-all duration-200"
                  rows={2}
                />
                <div className="flex justify-end gap-2 mt-2 mb-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReply(comment._id)} 
                    className="bg-purple-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Reply
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setReplyMap({ ...replyMap, [comment._id]: undefined })} 
                    className="text-xs text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {renderComments(comment._id, level + 1)}
        </motion.div>
      ));
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h2 className="text-xl text-gray-600">Post not found</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/community')}
          className="mt-4 text-purple-600 hover:text-purple-700 flex items-center gap-1 mx-auto"
        >
          <IconArrowLeft size={16} />
          Back to Community
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 py-6"
    >
      {/* Back button */}
      <motion.button
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/community')}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
      >
        <IconArrowLeft size={18} className="mr-1" />
        <span className="text-sm">Back to Community</span>
      </motion.button>
      
      {/* Post */}
      <motion.div 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 mb-6"
      >
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
          <div className="flex items-center gap-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleUpvote} 
              className={`text-sm flex flex-col items-center p-2 rounded-lg transition-colors ${upvoted ? 'text-purple-700 bg-purple-50' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <IconArrowUp size={18} />
              <span className="text-xs font-medium mt-1">{upvoteCount}</span>
            </motion.button>
            
            {post.createdBy?.userId === userId && (
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPostMenu(!showPostMenu)} 
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <IconDotsVertical size={18} className="text-gray-500" />
                </motion.button>
                
                <AnimatePresence>
                  {showPostMenu && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-lg shadow-md z-10"
                    >
                      <motion.button 
                        whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                        onClick={handleEditPost}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 rounded-t-lg"
                      >
                        Edit
                      </motion.button>
                      <motion.button 
                        whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                        onClick={handleDeletePost}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 rounded-b-lg"
                      >
                        Delete
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            {post.createdBy?.avatar? (
              <div className="w-6 h-6 rounded-full overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                <img
                  src={getAvatarUrl(post.createdBy.avatar)}
                  alt={post.createdBy?.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-purple-100 text-purple-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                {getInitials(post.createdBy?.name)}
              </div>
            )}
            <span>{post.createdBy?.name || 'Anonymous'}</span>
          </div>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        
        {editingPost ? (
          <div>
            <textarea
              value={editedPostContent}
              onChange={(e) => setEditedPostContent(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-lg text-sm mb-3 focus:ring-1 focus:ring-purple-600 focus:border-purple-600 focus:outline-none transition-all duration-200"
              rows={6}
            />
            <div className="flex justify-end gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSavePostEdit} 
                className="bg-purple-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-purple-700 transition-colors"
              >
                Save
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancelPostEdit} 
                className="text-gray-600 text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="text-gray-800 whitespace-pre-line mb-4">{post.content}</div>
        )}
        
        {post.tags?.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="bg-purple-50 text-purple-700 px-3 py-1 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Comments */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold mb-2">Comments</h2>

        {comments.length === 0 && (
          <p className="text-gray-400 text-sm mb-6">No comments yet. Be the first to share your thoughts!</p>
        )}

        <div className="mb-8">
          {renderComments()}
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Add a comment</h3>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm mb-3 focus:ring-1 focus:ring-purple-600 focus:border-purple-600 focus:outline-none transition-all duration-200"
            placeholder="Share your thoughts..."
            rows={3}
          />
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePostComment}
              className="bg-purple-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center"
            >
              <IconMessage size={16} className="mr-1" />
              Post Comment
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
