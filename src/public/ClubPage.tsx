import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Users, Calendar, MapPin, Tag, CheckCircle2, Loader2 } from "lucide-react";
import { useClub } from '../hooks/useSupabase';
import { useAuth } from "../contexts/AuthContext";
import { useState } from 'react';
import { toggleClubFollow } from '../api/clubs/toggleClubFollow';

export default function ClubPage() {
  const { clubId } = useParams<{ clubId: string }>();
  const { user } = useAuth();
  const { data: club, isLoading, isError, mutate } = useClub(clubId);
  const [followLoading, setFollowLoading] = useState(false);
  
  const handleFollowToggle = async () => {
    if (!user?.id || !clubId) return;
    
    setFollowLoading(true);
    try {
      // Determine if user is already following the club
      const isFollowing = club?.followers?.some((f: any) => f.user_id === user.id);
      
      // Call the API function
      const action = isFollowing ? 'unfollow' : 'follow';
      await toggleClubFollow(user.id, clubId, action);
      
      // Update the local data by refetching
      mutate();
    } catch (error) {
      console.error("Error following club:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (isError || !club) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-2xl text-red-500 font-bold mb-4">Failed to load club details</h2>
        <p className="text-gray-600 mb-6">The club you're looking for might not exist or there was an error loading it.</p>
        <Link 
          to="/clubs" 
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to All Clubs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4"
      >
        {/* Club Header */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              {club.logo_url ? (
                <img
                  src={club.logo_url}
                  alt={`${club.name} logo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500">
                  <p className="text-white text-3xl font-bold">{club.name.substring(0, 2).toUpperCase()}</p>
                </div>
              )}
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{club.name}</h1>
                {club.is_verified && (
                  <CheckCircle2 size={20} className="text-green-500" />
                )}
              </div>
              
              <p className="text-gray-600 mb-4 max-w-2xl">
                {club.description}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-1 text-blue-600">
                  <Users size={18} />
                  <span>{club.followers_count} Followers</span>
                </div>
                
                {user && (
                  <button
                    onClick={handleFollowToggle}
                    disabled={followLoading}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      club.followers?.some((f: any) => f.user_id === user.id)
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {followLoading ? 'Processing...' : 
                      club.followers?.some((f: any) => f.user_id === user.id) ? 'Unfollow' : 'Follow'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Core Members */}
        {club.coreMembers && club.coreMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white shadow-sm rounded-xl p-6 mb-8 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Core Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {club.coreMembers.map((member: any) => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="font-medium text-gray-700">
                      {member.users.name ? member.users.name.substring(0, 2).toUpperCase() : ''}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.users.name}</p>
                    <p className="text-sm text-blue-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Upcoming Events */}
        {club.upcomingEvents && club.upcomingEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white shadow-sm rounded-xl p-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {club.upcomingEvents.map((event: any) => (
                <Link key={event.id} to={`/events/${event.id}`} className="block">
                  <div className="border border-gray-100 hover:border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar size={14} />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <Tag size={14} />
                        <span>{event.event_type}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
