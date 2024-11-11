import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useTheme } from "../../providers/ThemeProvider";
import { FaEnvelope } from "react-icons/fa";
import Input from "../../components/common/Input";
import DarkModeToggle from "../../components/common/DarkModeToggle";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);
      Swal.fire(
        "Success",
        "Password reset instructions sent to your email",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme.background} ${theme.text}`}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2
            className={`mt-6 text-center text-3xl font-extrabold ${theme.headingText}`}
          >
            Reset your password
          </h2>
          <p className={`mt-2 text-center text-sm ${theme.mutedText}`}>
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            icon={<FaEnvelope className={`h-4 w-4 ${theme.icon}`} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            theme={theme}
          />

          <button
            type="submit"
            disabled={loading}
            className={`
              group relative w-full flex justify-center py-2 px-4 
              border border-transparent text-sm font-medium rounded-md 
              text-white ${theme.primaryButton} ${theme.primaryButtonHover}
              transition-colors duration-200
              ${loading ? "opacity-75 cursor-not-allowed" : ""}
            `}
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center">
          <Link
            to="/login"
            className={`font-medium ${theme.link} ${theme.linkHover}`}
          >
            Back to login
          </Link>
        </div>
      </div>

      <DarkModeToggle isDark={isDark} onToggle={toggleTheme} theme={theme} />
    </motion.div>
  );
};

export default ForgotPassword;
