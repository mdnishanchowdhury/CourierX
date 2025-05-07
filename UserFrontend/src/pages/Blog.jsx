import { useState } from 'react';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiArrowRight,
  FiSearch
} from 'react-icons/fi';
import {
  FaRegBookmark,
  FaRegCommentAlt,
  FaRegHeart,
  FaHeart
} from 'react-icons/fa';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);

  const blogPosts = [
    {
      id: 1,
      title: 'How to Package Fragile Items for Safe Shipping',
      excerpt: 'Learn the professional techniques for packing delicate items to ensure they arrive intact.',
      date: 'May 15, 2023',
      readTime: '5 min read',
      author: 'Sarah Johnson',
      likes: 42,
      comments: 8,
      image: 'https://i.ibb.co.com/zVyFyvY7/images-3.jpg'
    },
    {
      id: 2,
      title: 'The Future of Same-Day Delivery Services',
      excerpt: 'Exploring how emerging technologies are transforming last-mile delivery solutions.',
      date: 'April 28, 2023',
      readTime: '7 min read',
      author: 'Michael Chen',
      likes: 89,
      comments: 12,
      image: 'https://i.ibb.co.com/ksvz1tqs/images-4.jpg'
    },
    {
      id: 3,
      title: 'International Shipping: Customs Made Simple',
      excerpt: 'A complete guide to navigating customs regulations for hassle-free global shipping.',
      date: 'April 10, 2023',
      readTime: '10 min read',
      author: 'Emma Rodriguez',
      likes: 56,
      comments: 5,
      image: 'https://i.ibb.co.com/1YywyPWG/8579065-International-Courier-Services-Bangladesh.jpg'
    },
    {
      id: 4,
      title: 'Eco-Friendly Packaging Solutions for Businesses',
      excerpt: 'Sustainable alternatives that reduce environmental impact without compromising protection.',
      date: 'March 22, 2023',
      readTime: '6 min read',
      author: 'David Kim',
      likes: 78,
      comments: 15,
      image: 'https://i.ibb.co.com/ZpjrVT6R/images-5.jpg'
    },
    {
      id: 5,
      title: 'Optimizing Your Courier Service for Peak Seasons',
      excerpt: 'Strategies to handle increased shipping volumes during holidays and sales events.',
      date: 'March 5, 2023',
      readTime: '8 min read',
      author: 'Lisa Wong',
      likes: 64,
      comments: 9,
      image: 'https://i.ibb.co.com/9kLT7vQK/images-6.jpg'
    },
    {
      id: 6,
      title: 'Tracking Technology: What Shippers Need to Know',
      excerpt: 'Understanding modern package tracking systems and how they benefit your business.',
      date: 'February 18, 2023',
      readTime: '4 min read',
      author: 'Robert Taylor',
      likes: 37,
      comments: 3,
      image: 'https://i.ibb.co.com/VcW0vZmV/images-7.jpg'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CourierX Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tips and industry news for smarter shipping decisions
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FiUser className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
                    >
                      {likedPosts.includes(post.id) ? (
                        <FaHeart className="text-red-500 mr-1" />
                      ) : (
                        <FaRegHeart className="mr-1" />
                      )}
                      <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </button>
                    <div className="flex items-center text-gray-500">
                      <FaRegCommentAlt className="mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-400 hover:text-amber-500 transition-colors">
                      <FaRegBookmark />
                    </button>
                    <button className="flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors">
                      Read more <FiArrowRight className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl p-8 text-center text-black">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with Shipping Insights</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest delivery tips and industry trends.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none text-gray-900"
            />
            <button className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-r-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
