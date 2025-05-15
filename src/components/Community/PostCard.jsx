
import { IconArrowUp } from '@tabler/icons-react'
import { formatDistanceToNow } from 'date-fns';

export default function PostCard({ post, author, upvotecount, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border-gray-100 hover:border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden group"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 flex flex-col items-center p-2 bg-gray-50 group-hover:bg-gray-100 rounded-lg">
          <IconArrowUp className="text-gray-400 group-hover:text-primary transition-colors" size={20} />
          <span className="text-sm font-medium mt-1 text-gray-700">{upvotecount}</span>
        </div>

        <div className="flex-grow overflow-hidden">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary mb-2 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 mb-4 overflow-hidden">
            {post.content}
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <img
                  src={author?.profilePic || "https://i.pravatar.cc/150?img=12"}
                  alt={author?.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">{author?.name || "Anonymous"}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : ""}
            </span>
            
            {post.tags && post.tags.length > 0 && (
              <>
                <span className="text-gray-400 ml-auto">•</span>
                <div className="flex gap-1 overflow-hidden">
                  {post.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
