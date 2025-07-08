import { useState } from "react";
import { motion } from "framer-motion";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            console.log("Search for Clubs and Events...", searchTerm);
            // TODO: Integrate real search
        }
    };

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setTimeout(() => {
                const searchInput = document.getElementById("search-input");
                if (searchInput) searchInput.focus();
            }, 100);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {/* Search Toggle Button */}
            <motion.button
                onClick={handleSearchToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-blue-600 transition-colors text-lg focus:outline-none cursor-pointer"
                title="Search"
            >
                🔍
            </motion.button>

            {/* Search Input Form */}
            <motion.form
                onSubmit={handleSearch}
                initial={{ width: 0, opacity: 0 }}
                animate={{
                    width: isSearchOpen ? "12rem" : "0rem",
                    opacity: isSearchOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`overflow-hidden flex items-center gap-2 bg-white border border-gray-200 rounded-md px-2 py-1 shadow-sm transition-all ${isSearchOpen ? "pl-3 pr-2" : "p-0"
                    }`}
            >
                <input
                    id="search-input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent outline-none text-sm placeholder-gray-400 text-gray-700"
                />
                <button
                    type="submit"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    Go
                </button>
            </motion.form>
        </div>
    );
}

export default SearchBar;