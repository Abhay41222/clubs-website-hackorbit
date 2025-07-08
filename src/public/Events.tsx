// function Events() {
//     return (
//         <>
//             <div>Welcome to Events Page!</div>
//         </>
//     )
// }

// export default Events;

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { Calendar, Clock, MapPin, Tag, Flame } from "lucide-react";
import { mockEvents } from "../mock_data/mockEventData";
import type { Event } from "../mock_data/mockEventData";

export default function Events() {
  const events: Event[] = mockEvents();
  const headingRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(headingRef.current, {
      strings: ["Events", "Competitions", "Workshops", "Talks"],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1600,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

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
            Explore <span ref={headingRef} className="text-blue-600" />
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Stay updated on upcoming campus events and experiences.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
            >
              <img
                src={event.banner_url}
                alt={event.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-5">
                <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {event.time}
                  </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-2">
                  <MapPin size={16} />
                  {event.location}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag size={16} className="text-blue-500" />
                    {event.event_type}
                  </div>
                  {event.is_live && (
                    <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                      <Flame size={14} />
                      Live Now
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
