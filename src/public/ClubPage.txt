import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mockClubs } from '../mock_data/mockClubData';
import type { Club } from '../mock_data/mockClubData';

export default function ClubPage() {
  const { clubId } = useParams<{ clubId: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock data fetching - replace with actual API call later
    setLoading(true);
    
    try {
      // Find club by ID from mock data
      const foundClub = mockClubs().find(club => club.id === clubId);
      
      if (foundClub) {
        setClub(foundClub);
      } else {
        setError('Club not found');
      }
    } catch (err) {
      setError('Failed to load club data');
    } finally {
      setLoading(false);
    }
  }, [clubId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-6">{error}</div>;
  }

  if (!club) {
    return <div className="text-gray-500 text-center p-6">Club not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <img 
            src={club.logo_url} 
            alt={`${club.name} logo`} 
            className="w-20 h-20 rounded-full object-cover"
            onError={(e) => {
              // Fallback for broken image links
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Club';
            }}
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{club.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-500 text-sm">
                {club.followers_count} followers
              </span>
              {club.is_verified && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="font-medium text-gray-900 mb-2">About</h2>
          <p className="text-gray-700">{club.description}</p>
        </div>
        
        <div>
          <h2 className="font-medium text-gray-900 mb-4">Upcoming Events</h2>
          {/* <div className="space-y-4">
            {club.events && club.events.length > 0 ? (
              club.events.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No upcoming events</p>
            )}
          </div> */}
        </div>
      </div>
    </div>
  ); 
}