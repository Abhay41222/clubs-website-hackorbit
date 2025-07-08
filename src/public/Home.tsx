import { motion } from "framer-motion";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import Button from "../components/Button";

function Home() {
    const h1Element = useRef(null);

    useEffect(() => {
        const typed = new Typed(h1Element.current, {
            strings: ["CLUBS", "COMMUNITY", "VIBE", "SPARK"],
            typeSpeed: 70,
            backSpeed: 45,
            backDelay: 1800,
            startDelay: 200,
            smartBackspace: false,
            showCursor: false,
            loop: true,
        });
        return () => typed.destroy();
    }, []);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white relative overflow-hidden px-4">
            {/* Soft animated background shape */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 0.16, scale: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute top-[-60px] left-1/2 -translate-x-1/2 pointer-events-none z-0"
                style={{
                    width: 480,
                    height: 220,
                    filter: "blur(48px)",
                    borderRadius: "90% 80% 70% 100%",
                    background: "linear-gradient(90deg, #3b82f6 40%, #60a5fa 100%)",
                }}
            />

            <motion.section
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-xl flex flex-col items-center text-center gap-7 pt-32 pb-40 z-10"
            >
                <span className="text-xs sm:text-sm uppercase tracking-wide text-blue-600 font-medium">
                    Discover Your
                </span>

                <div className="relative h-14 flex items-center justify-center select-none">
                    <h1
                        ref={h1Element}
                        className="text-4xl sm:text-5xl font-black text-gray-800 tracking-tight transition-all duration-200"
                    />
                    {/* Subtle underline effect */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.2, duration: 0.55, ease: "easeOut" }}
                        className="absolute left-1/2 bottom-1 w-28 h-[3px] -translate-x-1/2 rounded-full bg-blue-100"
                    />
                </div>

                <p className="text-gray-600 max-w-md text-base sm:text-lg leading-normal">
                    Browse, join, and participate in top student clubs and events on campus.
                    Connect, create, and grow with Campus Connect.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full justify-center">
                    <Button size="lg" variant="filled" onClick={() => ("/clubs")}>Browse Clubs</Button>
                    <Button size="lg" variant="outlined" onClick={() => ("/clubs")}>See Events</Button>
                </div>
            </motion.section>

            {/* Subtle section divider */}
            <div className="w-full max-w-xl border-b border-gray-100 z-10" />
        </main>
    );
}

export default Home;