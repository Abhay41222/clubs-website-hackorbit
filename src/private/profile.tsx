import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Mail, Github, Linkedin, Users, Calendar } from "lucide-react";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState("Tech enthusiast exploring web dev, hackathons, and design systems.");

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 flex justify-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-8 border border-gray-100"
            >
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                    <img
                        src="https://i.pravatar.cc/150?img=32"
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                    />
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">Abhay Bhadoriya</h1>
                        <p className="text-blue-600 font-medium">Technical Contributor</p>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold text-gray-800">Bio</h2>
                        <button
                            onClick={handleEditToggle}
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                            <Edit3 size={16} /> {isEditing ? "Done" : "Edit"}
                        </button>
                    </div>
                    {isEditing ? (
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full border rounded-md p-3 text-sm text-gray-700"
                            rows={3}
                        />
                    ) : (
                        <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
                    )}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl py-4 shadow-sm">
                        <Users className="text-blue-500 mb-1" />
                        <span className="text-lg font-bold text-gray-900">6</span>
                        <span className="text-xs text-gray-500">Clubs Joined</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl py-4 shadow-sm">
                        <Calendar className="text-blue-500 mb-1" />
                        <span className="text-lg font-bold text-gray-900">12</span>
                        <span className="text-xs text-gray-500">Events Attended</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl py-4 shadow-sm">
                        <Mail className="text-blue-500 mb-1" />
                        <span className="text-lg font-bold text-gray-900">Email</span>
                        <span className="text-xs text-gray-500">Active</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl py-4 shadow-sm">
                        <Github className="text-blue-500 mb-1" />
                        <span className="text-lg font-bold text-gray-900">GitHub</span>
                        <span className="text-xs text-gray-500">Connected</span>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 justify-center">
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Github size={22} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Linkedin size={22} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Mail size={22} />
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
