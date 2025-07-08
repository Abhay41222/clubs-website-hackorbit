import { motion } from "framer-motion";
import SearchBar from "../widgets/SearchBar";
import { Link } from "react-router-dom";

const navlinks = [
    { href: "/home", label: "Home" },
    { href: "/clubs", label: "Clubs" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
];

function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between"
        >
            {/* Logo */}
            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
            >
                <Link
                    to="/"
                    className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600 hover:text-blue-700 transition-colors"
                >
                    <svg
                        width="28"
                        height="28"
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

            {/* Navigation Links */}
            <ul className="flex gap-6 text-sm font-medium text-gray-600">
                {navlinks.map((link, index) => (
                    <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to={link.href}
                            className="transition-colors hover:text-blue-600"
                        >
                            {link.label}
                        </Link>
                    </motion.li>
                ))}
            </ul>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <SearchBar />
            </motion.div>
        </motion.nav>
    );
}

export default Navbar;