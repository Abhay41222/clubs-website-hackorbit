import { motion } from "framer-motion";
import { Bell, Calendar, MapPin, Clock, Heart, MessageCircle, Share2, ChevronRight } from "lucide-react";
// import useSWR from "swr";
// import { getEnv } from "../utils/getEnv";
import { announcements, events, feedPosts } from "./mock_data";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default function Dashboard() {
  // const { data: response, error, isLoading } = useSWR(
  //   `${getEnv("SERVER_URL")}/announcements`,
  //   fetcher
  // );

  

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-500",
      "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"  
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Stay updated with your campus community</p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Announcements Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Announcements</h2>
              </div>

              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{announcement.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{announcement.date}</p>
                        <p className="text-sm text-gray-700">{announcement.message}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Events Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">by {event.organizer}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Register
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                          Know More
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Feed Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Campus Feed</h2>
              </div>

              <div className="space-y-6 max-h-96 overflow-y-auto">
                {feedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="border-b border-gray-100 pb-6 last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(post.user.name)}`}>
                        {post.user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{post.user.name}</span>
                          <span className="text-gray-500 text-sm">{post.user.username}</span>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-500 text-sm">{post.timestamp}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{post.content}</p>
                        {post.image && (
                          <img
                            src={post.image}
                            alt="Post image"
                            className="w-full max-w-md rounded-lg mb-3"
                          />
                        )}
                        <div className="flex items-center gap-6 text-gray-500">
                          <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm">{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                            <Share2 className="w-5 h-5" />
                            <span className="text-sm">Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}