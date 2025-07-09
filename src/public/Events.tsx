import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Tag, Flame, Loader2 } from "lucide-react";
import { useEvents } from "../hooks/useSupabase";
import { Link } from "react-router-dom";

export default function Events() {
  const { data: events, isLoading, isError } = useEvents();

  return (
    <div className="min-h-screen py-20 px-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Explore <span className="text-blue-600">Events</span>
          </h1>
          <p className="mt-3 text-lg text-gray-600 min-h-[30px]">
            <span>
              Don't miss out on exciting workshops and competitions, Be part of inspiring talks, festivals, and student-led fun.</span>
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error loading events. Please try again later.</p>
          </div>
        ) : events && events.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: any, idx: number) => (
              <Link to={`/events/${event.id}`} key={event.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.6 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
                >
                  {event.banner_url ? (
                    <img
                      src={event.banner_url}
                      alt={event.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                      <p className="text-white text-xl font-bold">{event.title.substring(0, 2).toUpperCase()}</p>
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {event.time}
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <MapPin size={14} />
                        {event.location}
                      </div>

                      {event.is_live && (
                        <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                          <Flame size={14} />
                          Live Now
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-1">
                      <Tag size={14} className="text-blue-600" />
                      <span className="text-blue-600 text-xs font-medium">{event.event_type}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No upcoming events found.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
