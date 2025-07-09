import { useLocation, useNavigate } from 'react-router-dom';
import EmailVerification from '../components/EmailVerification';
import { resendVerificationEmail } from '../services/supabaseFunctions';

export default function Confirm() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email; // Fallback if no email provided

    const handleResendVerification = async () => {
        try {
            if (!email) return Promise.reject(new Error("No email provided"));

            const { error } = await resendVerificationEmail(email);
            if (error) {
                console.error("Failed to resend verification email:", error.message);
                return Promise.reject(error);
            }
            return Promise.resolve();
        } catch (error) {
            console.error("Failed to resend verification email:", error);
            return Promise.reject(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-16">
            <div className="w-full max-w-md">
                <EmailVerification
                    email={email}
                    onResendVerification={handleResendVerification}
                />

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/sign-in')}
                        className="text-blue-600 hover:text-blue-800 underline text-sm cursor-pointer"
                    >
                        Back to Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}