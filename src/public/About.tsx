import { motion } from "framer-motion";
import { Users, Target, Heart, Code, Mail, Github, Linkedin } from "lucide-react";

function About() {
    const teamMembers = [
        {
            name: "Harsh Rajpal",
            role: "Frontend Developer",
            bio: "A passionate developer, problem-solver and love building impactful digital experiences",
            avatar: "HR"
        },
        {
            name: "Krishna Kant",
            role: "Developer",
            bio: "Passionate about building seamless user experiences. Coffee enthusiast and midnight coder.",
            avatar: "KK"
        },
        
       {
            name: "Arpit Gupta",
            role: "coder",
            bio: "Passionate coder with experience in front end development and data structures",
            avatar: "AG"
        },
        {
            name: "Abhay Bhadoriya",
            role: "Technical Contributer",
            bio: "Exploring hackathons to learn, build, and grow while contributing creative ideas and technical support.",
            avatar: "AB"
            
        },
    ];

    const values = [
        {
            icon: <Users size={24} />,
            title: "Community First",
            description: "Every feature we build starts with a simple question: How does this help students connect better?"
        },
        {
            icon: <Target size={24} />,
            title: "Purpose-Driven",
            description: "We're not just building another app. We're solving real problems that we face as students every day."
        },
        {
            icon: <Heart size={24} />,
            title: "Built with Love",
            description: "Late nights, endless debugging, and countless iterations — all fueled by our passion for student life."
        },
        {
            icon: <Code size={24} />,
            title: "Open & Transparent",
            description: "Clean code, honest feedback, and open collaboration. We believe in building in the open."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white py-20 px-6"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        We're <span className="text-blue-600">ByteBenders</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        A student-led team on a mission to sync campus life with technology. 
                        We're building the platform we wish we had when we started college.
                    </p>
                </div>
            </motion.section>

            {/* Our Mission */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="py-16 px-6"
            >
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            College should be the best four years of your life, but finding your tribe shouldn't 
                            take four semesters. We're building Campus Connect to solve the discovery problem — 
                            making it dead simple to find clubs, events, and communities that actually match your vibe.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            No more scrolling through endless Whatsapp groups or missing out on that perfect 
                            hackathon because the flyer got buried in your email. We're creating a centralized 
                            hub where student life actually makes sense.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Our Story */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="py-16 px-6 bg-white"
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                It started with a simple frustration. As freshmen, we spent weeks trying to figure 
                                out which clubs were actually active, when events were happening, and how to get involved. 
                                The information was scattered across emails, websites, and group chats.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Fast forward to our sophomore year hackathon — we decided to build the solution we 
                                wished existed. ByteBenders was born from late-night coding sessions, way too much 
                                pizza, and a shared belief that student life deserves better infrastructure.
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-8 text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">2025</div>
                            <div className="text-gray-600 mb-4">Founded at Hackorbit Hackathon</div>
                            <div className="text-2xl font-semibold text-gray-900 mb-2">4 Students</div>
                            <div className="text-gray-600 mb-4">One Big Vision</div>
                            <div className="text-lg font-medium text-gray-900">∞ Possibilities</div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Meet the Team */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="py-16 px-6"
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet the Team</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-lg font-semibold text-blue-600">{member.avatar}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* What We Believe */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="py-16 px-6 bg-white"
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Believe</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                className="flex gap-4"
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                    {value.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Contact/Join Us */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="py-20 px-6"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        We're always looking for passionate students who want to make campus life better. 
                        Whether you code, design, or just have great ideas — let's build something amazing together.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            <Mail size={20} />
                            Get in Touch
                        </button>
                        <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <Github size={20} />
                            View Our Code
                        </button>
                    </div>
                    
                    <div className="flex justify-center gap-6">
                        <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Linkedin size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}

export default About;