import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import ConfirmModal from "../components/Modal";

const navlinks = [
    { href: "/", label: "Home" },
    { href: "/clubs", label: "Clubs" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
];

function Navbar() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleUserClick = () => {
        if (!user) {
            navigate("/sign-in");
        } else {
            setShowDropdown((prev) => !prev);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    async function handleConfirm() {
        setIsModalOpen(false);
        console.log("Confirmed!");
        await signOut();
        setShowDropdown(false);
        navigate("/sign-in");
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ConfirmModal
                isOpen={isModalOpen}
                title="Confirm Sign Out"
                message="Are you sure you want to sign out?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4"
            >

                <div className="flex items-center justify-between w-full">
                    {/* Left: Logo */}
                    <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
                        <Link
                            to="/"
                            className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600 hover:text-blue-700 transition-colors"
                            aria-label="Campus Connect Home"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="14" cy="14" r="13" stroke="#2563eb" strokeWidth="2" />
                                <circle cx="14" cy="14" r="6" fill="#2563eb" />
                            </svg>
                            Campus Connect
                        </Link>
                    </motion.div>

                    {/* Center: Navlinks */}
                    <ul className="flex gap-6 text-sm font-medium text-gray-600 justify-center flex-1">
                        {navlinks.map((link) => (
                            <motion.li
                                key={link.href}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to={link.href}
                                    className="hover:text-blue-600 transition-colors"
                                    aria-label={link.label}
                                >
                                    {link.label}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Right: SearchBar & User */}
                    <div className="flex items-center" style={{ minWidth: "13rem" }}>
                        <SearchBar />
                        <div
                            onClick={handleUserClick}
                            className="cursor-pointer relative"
                            ref={dropdownRef}
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md">
                                <User size={16} />
                            </motion.div>
                            {user && showDropdown && (
                                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => { setShowDropdown(false); navigate("/profile"); }}
                                    >
                                        Profile
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => { setShowDropdown(false); navigate("/dashboard"); }}
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => { setShowDropdown(false); setIsModalOpen(true); }}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.nav>
        </>
    );
}

export default Navbar;