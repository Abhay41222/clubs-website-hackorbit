import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full flex flex-col items-center py-8 mt-16 border-t border-gray-100 bg-white/80 backdrop-blur-sm" >
      <div className="flex gap-4 text-xs text-gray-400"></div>
      <div className="mb-4 text-xs text-gray-400">&copy; 2025 Team  ByteBenders. All rights reserved.</div>
    </motion.footer >
  );
}

export default Footer;