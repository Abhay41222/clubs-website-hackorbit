import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram, Edit3 } from "lucide-react";
import type { User } from "../mock_data/mockUserData";
import { mockUserData } from "../mock_data/mockUserData";

export default function Profile() {
    const user: User = mockUserData()[3];

    // Generate avatar initials
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Generate avatar background color based on name
    const getAvatarColor = (name: string) => {
        const colors = [
            "bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-500",
            "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
        ];
        
        // Simple hash function to get consistent color for a name
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
            >
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                        Profile
                    </h1>
                    <p className="mt-2 text-gray-600">Manage your account information</p>
                </motion.div>

                {/* Main Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    {/* Header Section with Avatar */}
                    <div className="bg-gradient-to-br from-gray-50 to-white px-4 sm:px-8 py-8 sm:py-12 text-center border-b border-gray-100">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="relative inline-block"
                        >
                            <div className={`w-20 h-20 sm:w-24 sm:h-24 ${getAvatarColor(user.name)} rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-medium shadow-md`}>
                                {getInitials(user.name)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="mt-6"
                        >
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                {user.name}
                            </h2>
                            <p className="text-md sm:text-lg text-gray-600 mt-1 capitalize">
                                {user.role.join(', ')}
                            </p>
                            <div className="flex items-center justify-center mt-3 text-gray-600">
                                <Mail className="w-4 h-4 mr-2" />
                                <span className="text-sm break-all">{user.email}</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Information Grid */}
                    <div className="p-4 sm:p-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
                        >
                            {/* Academic Information */}
                            <div className="space-y-4 sm:space-y-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">
                                    Academic Information
                                </h3>
                                
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Enrollment Number
                                        </label>
                                        <p className="text-gray-900">{user.enrollment}</p>
                                    </div>
                                    
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Branch
                                        </label>
                                        <p className="text-gray-900">{user.branch}</p>
                                    </div>
                                    
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Year
                                        </label>
                                        <p className="text-gray-900">{user.year}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="space-y-4 sm:space-y-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">
                                    Personal Information
                                </h3>
                                
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Gender
                                        </label>
                                        <p className="text-gray-900">{user.gender}</p>
                                    </div>
                                    
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Role
                                        </label>
                                        <p className="text-gray-900 capitalize">
                                            {user.role.join(', ')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        {user.social_links && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.6 }}
                                className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100"
                            >
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Social Links
                                </h3>
                                
                                <div className="flex flex-wrap gap-4">
                                    {user.social_links.linkedin && (
                                        <motion.a
                                            href={user.social_links.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-100 hover:bg-blue-50 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                                        >
                                            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                                        </motion.a>
                                    )}
                                    
                                    {user.social_links.github && (
                                        <motion.a
                                            href={user.social_links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-100 hover:bg-gray-800 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                                        >
                                            <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white transition-colors duration-200" />
                                        </motion.a>
                                    )}
                                    
                                    {user.social_links.instagram && (
                                        <motion.a
                                            href={user.social_links.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-100 hover:bg-pink-50 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                                        >
                                            <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-pink-600 transition-colors duration-200" />
                                        </motion.a>
                                    )}
                                    
                                    {(!user.social_links.linkedin && !user.social_links.github && !user.social_links.instagram) && (
                                        <p className="text-gray-500 text-sm">No social links added</p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Floating Edit Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-gray-50 border border-gray-200 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 z-10"
                >
                    <Edit3 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </motion.button>
            </motion.div>
        </div>
    );
}