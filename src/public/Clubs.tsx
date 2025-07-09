import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import useSWR from 'swr';
import { getEnv } from "../utils/getEnv";

// Define Club type
export interface Club {
    id: string;
    name: string;
    description: string;
    logo_url: string;
    created_at: string;
    followers_count: number;
    is_verified: boolean;
}

// Fetcher function for clubs
const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch clubs data');
    }
    return response.json();
};

export default function Clubs() {
    const serverUrl = getEnv("VITE_SERVER_URL");
    const { data, error, isLoading } = useSWR<{ data: Club[], error: string | null }>(
        `${serverUrl}/api/clubs/getAllClubs`,
        fetcher
    );

    const clubs = data?.data || [];
    const isError = error || data?.error;

    // Handle loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    // Handle error state
    if (isError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6">
                <h2 className="text-2xl text-red-500 font-bold mb-4">Failed to load clubs</h2>
                <p className="text-gray-600 mb-6">There was an error loading the clubs. Please try again later.</p>
            </div>
        );
    }

    // Display clubs
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
                            <Link to={`/clubs/${club.id}`} className="block">
                                <div className="flex items-center gap-4 mb-4">
                                    {club.logo_url ? (
                                        <img
                                            src={club.logo_url}
                                            alt={club.name}
                                            className="w-12 h-12 rounded-full object-cover border"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 font-bold">
                                                {club.name.substring(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
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
                            </Link>

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