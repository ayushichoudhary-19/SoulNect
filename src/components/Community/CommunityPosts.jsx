"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import PostCard from "./PostCard"
import { IconPlus, IconFilter, IconX, IconSearch } from "../icons/TablerIcons";
import { toast } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

export default function CommunityPosts() {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [availableTags, setAvailableTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [showTagFilter, setShowTagFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`)
      .then((res) => {
        setPosts(res.data)
        setAllPosts(res.data)
        setIsLoading(false)

        // Extract unique tags from all posts
        const tags = new Set()
        res.data.forEach((post) => {
          if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach((tag) => tags.add(tag))
          }
        })
        setAvailableTags(Array.from(tags))
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err)
        setIsLoading(false)
        toast.error("Failed to load posts")
      })
  }, [])

  useEffect(() => {
    let filtered = [...allPosts]

    // Apply tag filtering
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) => post.tags && post.tags.some((tag) => selectedTags.includes(tag)))
    }

    // Apply search filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) => post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query),
      )
    }

    setPosts(filtered)
  }, [selectedTags, searchQuery, allPosts])

  const openPost = (postId) => {
    navigate(`/community/${postId}`)
  }

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const clearFilters = () => {
    setSelectedTags([])
    setSearchQuery("")
  }

  const handleEditPost = (postId) => {
    navigate(`/community/new?editId=${postId}`)
  }

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}`)
        toast.success("Post deleted successfully")

        setAllPosts(allPosts.filter((post) => post._id !== postId))
        setPosts(posts.filter((post) => post._id !== postId))
      } catch (error) {
        console.error("Failed to delete post:", error)
        toast.error("Failed to delete post")
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 py-8 md:py-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Community</h2>
          <p className="text-gray-500 mt-1">Join the conversation with fellow users</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowTagFilter(!showTagFilter)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center transition-colors"
          >
            <IconFilter className="mr-1 h-4 w-4" /> Filter
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/community/new")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors flex-1 sm:flex-initial justify-center sm:justify-start"
          >
            <IconPlus className="mr-1 h-4 w-4" /> New Post
          </motion.button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IconSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-600 focus:border-purple-600 transition-all duration-200"
          />
        </div>
      </div>

      <AnimatePresence>
        {showTagFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-700">Filter by tags</h3>
              {(selectedTags.length > 0 || searchQuery) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="text-xs text-purple-700 hover:text-purple-700 transition-colors"
                >
                  Clear all filters
                </motion.button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTagSelect(tag)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </motion.button>
              ))}
              {availableTags.length === 0 && <p className="text-sm text-gray-500">No tags available</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(selectedTags.length > 0 || searchQuery) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 flex flex-wrap items-center gap-2"
        >
          <span className="text-sm text-gray-500">Filtered by:</span>
          <div className="flex flex-wrap gap-1">
            {selectedTags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
              >
                {tag}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleTagSelect(tag)}
                  className="ml-1 text-purple-700 hover:text-purple-900"
                >
                  <IconX size={12} />
                </motion.button>
              </motion.span>
            ))}
            {searchQuery && (
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
              >
                Search: {searchQuery}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchQuery("")}
                  className="ml-1 text-purple-700 hover:text-purple-900"
                >
                  <IconX size={12} />
                </motion.button>
              </motion.span>
            )}
          </div>
        </motion.div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 animate-pulse">
              <div className="flex gap-4">
                <div className="w-10 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 md:py-20 bg-gray-50 rounded-xl border border-gray-100"
        >
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {selectedTags.length > 0 || searchQuery ? "No posts match your filters" : "No posts yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {selectedTags.length > 0 || searchQuery
                ? "Try selecting different tags or modifying your search"
                : "Be the first to share your thoughts with the community."}
            </p>
            {selectedTags.length > 0 || searchQuery ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-6 py-3 transition-colors"
              >
                Clear Filters
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/community/new")}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-3 transition-colors"
              >
                Create Post
              </motion.button>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="space-y-5">
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PostCard
                  post={post}
                  upvotecount={post.upvotes || 0}
                  author={post.createdBy}
                  onClick={() => openPost(post._id)}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
