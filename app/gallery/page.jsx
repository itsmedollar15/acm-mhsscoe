"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

// Temporary images for demonstration
const tempImages = [
  { id: 1, category: "events", src: "https://source.unsplash.com/800x600/?tech-event", title: "Tech Summit 2023" },
  { id: 2, category: "workshops", src: "https://source.unsplash.com/800x800/?workshop", title: "Coding Workshop" },
  { id: 3, category: "team", src: "https://source.unsplash.com/600x800/?team", title: "Team Building Day" },
  { id: 4, category: "events", src: "https://source.unsplash.com/800x500/?conference", title: "Annual Conference" },
  { id: 5, category: "workshops", src: "https://source.unsplash.com/800x600/?coding", title: "Web Development Session" },
  { id: 6, category: "team", src: "https://source.unsplash.com/800x800/?meeting", title: "Team Meeting" },
  { id: 7, category: "events", src: "https://source.unsplash.com/600x800/?seminar", title: "Technical Seminar" },
  { id: 8, category: "workshops", src: "https://source.unsplash.com/800x600/?hackathon", title: "Hackathon 2023" },
];

const categories = ["all", "events", "workshops", "team"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredImages = tempImages.filter(image => {
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="container px-4 mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-blue-600 sm:text-5xl md:text-6xl relative inline-block pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-blue-200 after:rounded-full">
          Our Gallery
          </h2>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">Explore our collection of memories, events, and achievements through the years.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 justify-between items-center mb-8 md:flex-row">
          <div className="flex overflow-x-auto gap-2 pb-2 w-full md:pb-0 md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                <span className="capitalize">{category}</span>
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 pr-4 pl-10 w-full rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <Search className="absolute left-3 top-1/2 text-gray-400 -translate-y-1/2" size={18} />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]"
            >
              <img
                src={image.src}
                alt={image.title}
                className="object-cover absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 from-black/70 via-black/20 group-hover:opacity-100">
                <div className="absolute right-0 bottom-0 left-0 p-4">
                  <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                  <p className="text-sm text-gray-200 capitalize">{image.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}