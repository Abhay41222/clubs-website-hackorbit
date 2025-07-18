import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { signIn, signUp } from "../services/supabaseFunctions";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Clear email error when user starts typing
        if (e.target.name === "email" && emailError) {
            // logic if you check for email domain
        }
    };

    // Email validation function
    // const validateEmail = (email: string): boolean => {
    //     const allowedDomain = "@mitsgwl.ac.in";
    //     if (!email.endsWith(allowedDomain)) {
    //         setEmailError(`Only ${allowedDomain} email addresses are allowed for signup`);
    //         return false;
    //     }
    //     return true;
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate email domain for signup
        // if (!validateEmail(formData.email)) {
        //     setEmailError("Invalid email address only mits students allowed");
        //     return;
        // }

        // Validate password confirmation for signup
        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const { data, error } = isLogin
                ? await signIn(formData.email, formData.password)
                : await signUp(formData.email, formData.password);

            if (error) {
                setError(error.message);
                console.error('Auth error:', error.message);
            } else {
                // console.log('Auth success:', data);
                if (isLogin) navigate("/dashboard");
                else navigate("/confirm", { state: { email: formData.email } });
            }
        } catch (e) {
            setError(`Not able to ${isLogin ? 'login' : 'signup'}`);
            console.error(e);
        } finally {
            setError(null);
            setEmailError("");
        }
    };


    // Height estimate: sign up adds two fields ~70-90px each + spacing
    // You can fine-tune min-h-[540px] based on your actual field heights
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Connect</h1>
                    <p className="text-gray-600">
                        {isLogin ? "Welcome back! Please sign in to continue." : "Create your account to get started."}
                    </p>
                </div>

                {/* Set the min-h to the max needed (for signup) */}
                <motion.div
                    layout
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 min-h-[540px] flex flex-col justify-between"
                >
                    {/* Toggle Buttons */}
                    <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                        <button
                            onClick={() => {
                                setIsLogin(true);
                                setEmailError("");
                            }}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${isLogin
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                                } cursor-pointer`}
                            type="button"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => {
                                setIsLogin(false);
                                setEmailError("");
                            }}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${!isLogin
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                                } cursor-pointer`}
                            type="button"
                        >
                            Sign Up
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name field for signup */}
                        <motion.div
                            initial={false}
                            animate={{
                                height: !isLogin ? "auto" : 0,
                                opacity: !isLogin ? 1 : 0,
                                marginBottom: !isLogin ? 16 : 0
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            <div className="pb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your full name"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Email field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                                {/* {!isLogin && (
                                    <span className="text-xs text-gray-500 ml-2">
                                        (must end with @mitsgwl.ac.in)
                                    </span>
                                )} */}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${emailError ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder={isLogin ? "Enter your email" : "Enter your @mitsgwl.ac.in email"}
                                    required
                                />
                            </div>
                            {emailError && (
                                <p className="text-red-500 text-xs mt-1">{emailError}</p>
                            )}
                        </div>

                        {/* Password field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password field for signup */}
                        <motion.div
                            initial={false}
                            animate={{
                                height: !isLogin ? "auto" : 0,
                                opacity: !isLogin ? 1 : 0,
                                marginBottom: !isLogin ? 16 : 0
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            <div className="pb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Confirm your password"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Forgot Password for login */}
                        {isLogin && (
                            <div className="text-right">
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
                        >
                            {isLogin ? "Sign In" : "Create Account"}
                            <ArrowRight size={20} />
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">or</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default SignIn;