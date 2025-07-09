import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useClubs } from "../hooks/useSupabase";
// import { Link } from "react-router-dom";
import type { Club } from "../mock_data/mockClubData";

export default function Clubs() {
  const { data: clubs, isLoading, isError } = useClubs();

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
            Explore <span className="text-blue-600">Clubs</span>
          </h1>

          {/* ✨ Animated line below heading */}
          <h1
            className="text-lg text-gray-600 mt-3 min-h-[32px] font-medium"
          >
            Explore your interests beyond classrooms, Discover communities that match your passion.
          </h1>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club, idx) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={club.logo_url}
                  alt={club.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{club.name}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(club.created_at).getFullYear()} • {club.followers_count} Followers
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {club.description}
              </p>

              <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                {club.is_verified && (
                  <>
                    <CheckCircle2 size={16} />
                    Verified Club
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export type { Club };
