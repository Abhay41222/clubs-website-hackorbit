import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Calendar, MapPin, Tag, Users, Loader2 } from "lucide-react";
import { useEvent } from '../hooks/useSupabase';
import { useAuth } from "../contexts/AuthContext";
import { useState } from 'react';
import { toggleEventRSVP } from '../../api/events/toggleEventRSVP';

export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const { data: event, isLoading, isError, mutate } = useEvent(eventId);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  
  const handleRsvpToggle = async () => {
    if (!user?.id || !eventId) return;
    
    setRsvpLoading(true);
    try {
      // Determine if user already RSVPed
      const hasRsvped = event?.rsvps?.some((r: any) => r.user_id === user.id);
      
      // Call the API function
      const action = hasRsvped ? 'cancel' : 'rsvp';
      await toggleEventRSVP(user.id, eventId, action);
      
      // Update the local data
      mutate();
    } catch (error) {
      console.error("Error with RSVP:", error);
    } finally {
      setRsvpLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-2xl text-red-500 font-bold mb-4">Failed to load event details</h2>
        <p className="text-gray-600 mb-6">The event you're looking for might not exist or there was an error loading it.</p>
        <Link 
          to="/events" 
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to All Events
        </Link>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4"
      >
        {/* Event Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-6">
          {event.banner_url ? (
            <img
              src={event.banner_url}
              alt={`${event.title} banner`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold px-6 text-center">{event.title}</h1>
            </div>
          )}
          
          {isPastEvent && (
            <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
              Past Event
            </div>
          )}
          
          {event.is_live && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Live Now
            </div>
          )}
        </div>
        
        {/* Event Details */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-8 border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2">
                  <Calendar className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="font-medium text-gray-900">Date & Time</p>
                    <p className="text-gray-600">
                      {eventDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Tag className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="font-medium text-gray-900">Event Type</p>
                    <p className="text-gray-600">{event.event_type}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-start gap-2 mb-4">
                <Users className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="font-medium text-gray-900">Attendance</p>
                  <p className="text-gray-600">{event.rsvpCount || 0} people going</p>
                </div>
              </div>
              
              {user && !isPastEvent && (
                <button
                  onClick={handleRsvpToggle}
                  disabled={rsvpLoading}
                  className={`mt-4 w-full py-2 px-4 rounded-md text-center font-medium ${
                    event.rsvps?.some((r: any) => r.user_id === user.id)
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {rsvpLoading ? 'Processing...' : 
                    event.rsvps?.some((r: any) => r.user_id === user.id) ? 'Cancel RSVP' : 'RSVP to Event'}
                </button>
              )}
              
              {!user && (
                <Link 
                  to="/sign-in" 
                  className="mt-4 block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center font-medium"
                >
                  Sign in to RSVP
                </Link>
              )}
              
              {isPastEvent && (
                <p className="mt-4 text-center text-gray-500">
                  This event has already taken place
                </p>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">About This Event</h2>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
          
          {event.clubs && (
            <div className="border-t border-gray-100 mt-6 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Hosted By</h2>
              <Link to={`/clubs/${event.clubs.id}`} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                {event.clubs.logo_url ? (
                  <img 
                    src={event.clubs.logo_url} 
                    alt={event.clubs.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">
                      {event.clubs.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{event.clubs.name}</p>
                  {event.clubs.description && (
                    <p className="text-gray-600 text-sm line-clamp-1">{event.clubs.description}</p>
                  )}
                </div>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
