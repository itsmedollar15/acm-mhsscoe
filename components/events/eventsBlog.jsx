import React from "react";
import Glassmorphism from "../common/glassmorphism";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpenText } from "lucide-react";

const EventBlog = ({ blog }) => {
  return (
    <Glassmorphism className="p-6 rounded-xl border shadow-lg backdrop-blur-lg md:p-8 border-white/20 bg-white/40">
      {/* Blog Header */}
      <div className="flex gap-3 items-center pb-5 mb-6 border-b border-gray-200">
        <BookOpenText className="w-6 h-6 text-blue-600 md:w-7 md:h-7" />
        <h3 className="text-2xl font-bold text-blue-700">Event Description</h3>
      </div>

      {/* Blog Content */}
      <article className="max-w-none prose prose-blue prose-lg">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="mb-4 text-3xl font-bold text-gray-800"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="mb-3 text-2xl font-bold text-gray-800"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="mb-2 text-xl font-bold text-gray-800" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-4 leading-relaxed text-gray-700" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="mb-4 space-y-2 list-disc list-inside" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol
                className="mb-4 space-y-2 list-decimal list-inside"
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li className="text-gray-700" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a
                className="text-blue-600 underline hover:text-blue-700"
                {...props}
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="pl-4 italic text-gray-600 border-l-4 border-blue-200"
                {...props}
              />
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
