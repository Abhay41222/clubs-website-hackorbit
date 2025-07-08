import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

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

    // Reserve space for the fully expanded searchbar (e.g. 13rem)
    return (
        <div style={{ width: "13rem" }} className="flex items-center flex-row-reverse gap-2 relative">

            {/* Absolutely position the input so it overlays, not pushes */}
            <motion.form
                onSubmit={handleSearch}
                initial={false}
                animate={{
                    width: isSearchOpen ? "11rem" : "0rem",
                    opacity: isSearchOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`overflow-hidden flex items-center gap-2 bg-white border border-gray-200 rounded-md py-1 shadow-sm transition-all ${isSearchOpen ? "pl-2 pr-2 mr-2" : "p-0"}`}
                style={{
                    pointerEvents: isSearchOpen ? "auto" : "none",
                }}
            >
                <input
                    id="search-input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Events or Clubs..."
                    className="w-full bg-transparent outline-none text-sm placeholder-gray-400 text-gray-700"
                />
                <button
                    type="submit"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    Go
                </button>
            </motion.form>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSearchToggle}
                className="cursor-pointer"
            >
                <div className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-all duration-200">
                    <Search size={16} />
                </div>
            </motion.div>
        </div>
    );
}

export default SearchBar;