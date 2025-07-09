import { motion } from "framer-motion";
import { Mail, ExternalLink, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

interface EmailVerificationProps {
    email: string;
    onResendVerification?: () => Promise<void>;
}

export default function EmailVerification({ email, onResendVerification }: EmailVerificationProps) {
    const [isResending, setIsResending] = useState(false);
    const [resendStatus, setResendStatus] = useState<"idle" | "success" | "error">("idle");

    const handleResend = async () => {
        if (!onResendVerification) return;

        try {
            setIsResending(true);
            await onResendVerification();
            setResendStatus("success");
        } catch (error) {
            setResendStatus("error");
        } finally {
            setIsResending(false);
            // Reset status after 5 seconds
            setTimeout(() => setResendStatus("idle"), 5000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-md mx-auto"
        >
            <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-blue-50 p-4 rounded-full mb-6">
                    <Mail size={36} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h2>
                <p className="text-gray-600 mb-1">
                    We've sent a verification link to
                </p>
                <p className="text-blue-600 font-medium">{email}</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-start">
                    <CheckCircle size={20} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                        Check your inbox (and spam folder) and click the verification link to activate your account.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <a
                    href={"https://mail.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm"
                >
                    Open Email App
                    <ExternalLink size={18} />
                </a>

                <button
                    onClick={handleResend}
                    disabled={isResending}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white cursor-pointer"
                >
                    {isResending ? (
                        <>
                            <Clock size={18} className="animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Resend verification email"
                    )}
                </button>

                {resendStatus === "success" && (
                    <p className="text-green-600 text-sm text-center">
                        Verification email resent successfully!
                    </p>
                )}

                {resendStatus === "error" && (
                    <p className="text-red-600 text-sm text-center">
                        Failed to resend verification email. Please try again later.
                    </p>
                )}
            </div>
        </motion.div>
    );
}
