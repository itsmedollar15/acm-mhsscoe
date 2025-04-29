import React from "react";
import Glassmorphism from "../common/glassmorphism";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpenText } from "lucide-react";

const EventBlog = ({ blog }) => {
  return (
    <Glassmorphism className="p-6 border shadow-lg md:p-8 border-white/20 rounded-xl backdrop-blur-lg bg-white/40">
      {/* Blog Header */}
      <div className="flex items-center gap-3 pb-5 mb-6 border-b border-gray-200">
        <BookOpenText className="w-6 h-6 text-blue-600 md:w-7 md:h-7" />
        <h3 className="text-2xl font-bold text-blue-700">Event Description</h3>
      </div>

      {/* Blog Content */}
      <article className="prose prose-blue prose-lg max-w-none">
        <Markdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-800 mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-800 mb-3" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-800 mb-2" {...props} />,
            p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-4" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 mb-4" {...props} />,
            li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
            a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-700 underline" {...props} />,
            blockquote: ({node, ...props}) => (
              <blockquote className="pl-4 border-l-4 border-blue-200 italic text-gray-600" {...props} />
            ),
          }}
        >
          {blog}
        </Markdown>
      </article>
    </Glassmorphism>
  );
};

export default EventBlog;
