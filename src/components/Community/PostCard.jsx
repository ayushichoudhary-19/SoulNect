import { IconArrowUp } from "../icons/TablerIcons";
import { formatDistanceToNow } from 'date-fns';
import { motion, } from 'framer-motion';
import { getAvatarUrl } from "../../utils/avatarMap";

export default function PostCard({ post, author, upvotecount, onClick }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      <div className="flex gap-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0 flex flex-col items-center p-2 bg-gray-50 group-hover:bg-gray-100 rounded-lg transition-colors duration-300"
        >
          <IconArrowUp className="text-gray-400 group-hover:text-purple-600 transition-colors duration-300" size={20} />
          <span className="text-sm font-medium mt-1 text-gray-700">{upvotecount}</span>
        </motion.div>

        <div className="flex-grow overflow-hidden">
          <h3 className="text-xl font-semibold text-gray-90 mb-2 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 mb-4 overflow-hidden">
            {post.content}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-white-50 flex-shrink-0 flex items-center justify-center">
                {author?.avatar ? (
                  <img
                    src={getAvatarUrl(author.avatar)}
                    alt={author?.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-medium bg-purple-100 rounded-full p-4 text-purple-500">
                    {author?.name?.charAt(0) || "A"}
                  </span>
                )}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">{author?.name || "Anonymous"}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : ""}
            </span>
            
            {post.tags && post.tags.length > 0 && (
              <>
                <span className="text-gray-400 hidden sm:inline">•</span>
                <div className="flex gap-1 overflow-hidden flex-wrap mt-1 sm:mt-0">
                  {post.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-1ab bg-purple-50 text-purple-600 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>
              </>
            )}
            
          </div>
        </div>
      </div>
    </motion.div>
  );
}
